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
  const { oauth_token, oauth_verifier, } = req.query

  // console.log(`state: ${state}`)
  // console.log(`code: ${code}`)

  if ( !oauth_token || !oauth_verifier ) {
    res.status(400,).send('Bad request',)
    return
  }

  const queryTwitterAuth = new ParseServer.Query('TwitterAuth',)
  queryTwitterAuth.equalTo('oauth_token', oauth_token,)
  queryTwitterAuth.addDescending('updatedAt',)
  const twitterAuth = await queryTwitterAuth.first({ useMasterKey : true, },)

  if (!twitterAuth || !oauth_token) {
    res.status(500,).send('No Twitter auth session found',)
    return
  }

  // Obtain access token
  const client = new TwitterApi({
    appKey       : process.env.TWITTER_APP_API_KEY as string,
    appSecret    : process.env.TWITTER_APP_API_KEY_SECRET as string,
    accessToken  : oauth_token,
    accessSecret : twitterAuth.get('oauth_token_secret',),
  },)

  client.login(oauth_verifier,)
    .then(async ({ userId, screenName, accessToken, accessSecret, client, },) => {
      const localUser = new ParseServer.User()
      await localUser.linkWith('twitter', {
        authData : {
          id                : userId,
          consumer_key      : process.env.TWITTER_APP_API_KEY,
          consumer_secret   : process.env.TWITTER_APP_API_KEY_SECRET,
          auth_token        : accessToken,
          auth_token_secret : accessSecret,
        },
      },)

      const userObject = await client.currentUser()

      console.log(userObject,)

      // Delete any Twitter Auths with this userObject.id
      const queryTwitterAuthInner = new ParseServer.Query('TwitterAuth',)
      queryTwitterAuthInner.equalTo('twitterUserId', userObject.id,)
      const existingTwitterAuths = await queryTwitterAuthInner.find({ useMasterKey : true, },)

      await Promise.all(existingTwitterAuths.map(async ( existingTwitterAuth, ) => {
        if ( existingTwitterAuth.id === twitterAuth.id ) {
          await existingTwitterAuth.destroy({ useMasterKey : true, },)
        }
      },),)

      twitterAuth.set('twitterUserId', userObject.id_str,)
      twitterAuth.set('twitterUsername', userObject.name,)
      twitterAuth.set('twitterProfileImageUrl', userObject.profile_image_url_https,)
      twitterAuth.set('twitterBannerImageUrl', userObject.profile_banner_url,)
      twitterAuth.set('twitterScreenName', userObject.screen_name,)
      twitterAuth.set('user', localUser,)
      await twitterAuth.save(null, { useMasterKey : true, },)

      // console.log(userObject)

      res.redirect(`/?sessionId=${localUser.getSessionToken()}`,)


    },)

}


export default handler
