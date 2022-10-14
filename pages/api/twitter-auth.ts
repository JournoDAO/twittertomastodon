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
  state: string
  codeVerifier: string
  codeChallenge: string
}

const getTwitterAuth = async ({ state, codeVerifier, codeChallenge, }: GetTwitterAuthProps,): Promise<ParseObject | undefined> => {
  const queryTwitterAuth = new ParseServer.Query('TwitterAuth',)
  queryTwitterAuth.equalTo('state', state,)
  queryTwitterAuth.equalTo('codeVerifier', codeVerifier,)
  queryTwitterAuth.equalTo('codeChallenge', codeChallenge,)
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

    if ( !body || !body.state || !body.codeVerifier || !body.codeChallenge ) {
      res.status(500,)
      return
    } else {

      const { state, codeVerifier, codeChallenge, } = body

      const twitterAuth = await getTwitterAuth({
        state,
        codeVerifier,
        codeChallenge,
      },)

      res.status(200,).json({
        success : true,
      },)


      // if (!twitterAuth) {
      //
      //   twitterAuth = await new TwitterAuth({
      //     status: 'created',
      //     state: body.state,
      //     codeVerifier: body.codeVerifier,
      //     codeChallenge: body.codeChallenge,
      //   })
      //
      //   if (twitterAuth) {
      //     await twitterAuth.save(null, {useMasterKey: true})
      //   }
      //
      //
      // }
      //
      // if (twitterAuth) {
      //
      //   if ( !twitterAuth.get('twitterUserId') || !twitterAuth.get('twitterUsername') || !twitterAuth.get('twitterProfileImageUrl') ) {
      //     // Refresh from Twitter
      //   }
      //
      //   res.status(200,).json({
      //     twitterUserId: twitterAuth.get('twitterUserId'),
      //     twitterUsername: twitterAuth.get('twitterUsername'),
      //     twitterProfileImageUrl: twitterAuth.get('twitterProfileImageUrl'),
      //
      //   },)
      //
      // }

      // if ( !twitterAuth ) {
      //   res.status(404).send('Not found')
      // }


    }

  }


}

export default handler
