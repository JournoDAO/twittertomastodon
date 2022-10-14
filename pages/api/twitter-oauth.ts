// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse, } from 'next'
import Cors                                      from 'cors'
import { TwitterApi, }                           from 'twitter-api-v2'
import ParseServer                               from '../../utils/parseServer'

type Data = {
  name: string
}

const cors = Cors({
  methods : [ 'POST', 'GET', 'HEAD', ],
},)

const runCorsMiddleware = (req: NextApiRequest, res: NextApiResponse, fn: Function,) => {
  return new Promise(( resolve, reject, ) => {
    fn(req, res, ( result: any, ) => {
      if ( result instanceof Error ) {
        return reject(result,)
      }

      return resolve(result,)
    },)
  },)
}

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<Data>,
): Promise<void> => {

  console.log(`req.method: ${req.method}`,)


  await runCorsMiddleware(req, res, cors,)

  // console.log(req.body)

  // Extract state and code from query string
  const { state, code, } = req.query

  // console.log(`state: ${state}`)
  // console.log(`code: ${code}`)

  if ( !code || !state ) {
    res.status(400,).send('Bad request',)
    return
  }

  const queryTwitterAuth = new ParseServer.Query('TwitterAuth',)
  queryTwitterAuth.equalTo('state', state,)
  queryTwitterAuth.addDescending('updatedAt',)
  const twitterAuth = await queryTwitterAuth.first({ useMasterKey : true, },)

  if (!twitterAuth || !code) {
    res.status(500,).send('No Twitter auth session found',)
    return
  }
  twitterAuth.get('codeVerifier',)

  // Obtain access token
  const client = new TwitterApi({
    clientId     : process.env.TWITTER_CLIENT_ID as string,
    clientSecret : process.env.TWITTER_CLIENT_SECRET as string,
  },)

  client.loginWithOAuth2({
    code,
    codeVerifier : twitterAuth.get('codeVerifier',),
    redirectUri  : `${process.env.HOST_DOMAIN_PUBLIC}/api/twitter-oauth`,
  },)
    .then(async ( { client: loggedClient, accessToken, refreshToken, expiresIn, }, ) => {

      const { data: userObject, } = await loggedClient.v2.me({ 'user.fields' : 'profile_image_url', },)

      console.log(userObject,)

      // Delete any Twitter Auths with this userObject.id
      const queryTwitterAuthInner = new ParseServer.Query('TwitterAuth',)
      queryTwitterAuthInner.equalTo('twitterUserId', userObject.id,)
      const existingTwitterAuths = await queryTwitterAuthInner.find({ useMasterKey : true, },)

      await Promise.all(existingTwitterAuths.map(async (existingTwitterAuth,) => {
        if (existingTwitterAuth.id === twitterAuth.id) {
          await existingTwitterAuth.destroy({ useMasterKey : true, },)
        }
      },),)

      const expiresAtInt = (new Date()).getTime() + expiresIn
      const expiresAt = new Date(expiresAtInt,)

      twitterAuth.set('accessToken', accessToken,)
      twitterAuth.set('refreshToken', refreshToken,)
      twitterAuth.set('expiresAt', expiresAt,)
      twitterAuth.set('twitterUserId', userObject.id,)
      twitterAuth.set('twitterUsername', userObject.username,)
      twitterAuth.set('twitterProfileImageUrl', userObject.profile_image_url,)
      await twitterAuth.save(null, { useMasterKey : true, },)

      // console.log(userObject)

      res.redirect(`${process.env.HOST_DOMAIN}/claim`,)
    },)
    .catch((err,) =>{
      console.log(err,)
      res.status(403,).send('Invalid verifier or access tokens!',)
    },)

  // res.status(200)

}


export default handler
