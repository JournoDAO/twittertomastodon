// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse, } from 'next'
import ParseServer, { TwitterAuth, }             from '../../utils/parseServer'
import { ParseObject, }                          from '../../types'

type Data = {
  twitterUserId?: string
  twitterUsername?: string
  twitterProfileImageUrl?: string
}

type GetTwitterAuthProps = {
  oauth_token: string
}

const getTwitterAuth = async ({ oauth_token, }: GetTwitterAuthProps,): Promise<ParseObject | undefined> => {
  const queryTwitterAuth = new ParseServer.Query('TwitterAuth',)
  queryTwitterAuth.equalTo('oauth_token', oauth_token,)
  return await queryTwitterAuth.first({ useMasterKey : true, },)
}

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<Data>,
): Promise<void> => {

  if (req.method === 'POST') {

    let body = req.body

    if (!(req.body instanceof Object)) {
      body = JSON.parse(body,)
    }

    if ( !body || !body.oauth_token || !body.oauth_token_secret || !body.oauth_callback_confirmed ) {
      res.status(500,)
      return
    } else {

      const { oauth_token, oauth_token_secret, oauth_callback_confirmed, } = body

      let twitterAuth = await getTwitterAuth({
        oauth_token,
      },)

      // res.status(200,).json({
      //   success : true,
      // },)


      if (!twitterAuth) {

        twitterAuth = await new TwitterAuth({
          status : 'created',
          oauth_token,
          oauth_token_secret,
          oauth_callback_confirmed,
        },)

        if (twitterAuth) {
          await twitterAuth.save(null, { useMasterKey : true, },)
        }


      }

      if (twitterAuth) {

        res.status(200,).json({
          twitterUserId          : twitterAuth.get('twitterUserId',),
          twitterUsername        : twitterAuth.get('twitterUsername',),
          twitterProfileImageUrl : twitterAuth.get('twitterProfileImageUrl',),

        },)

      }

      if ( !twitterAuth ) {
        res.status(404,).send('Not found',)
      }


    }

  }


}

export default handler
