import type { GetServerSideProps, NextPage, }     from 'next'
import Head                                       from 'next/head'
import { IOAuth2RequestTokenResult, TwitterApi, } from 'twitter-api-v2'
import LoginWithTwitter                           from '../components/LoginWithTwitter'

type Props = {
  twitterAuthLink: IOAuth2RequestTokenResult
}

const Home: NextPage<Props> = ({ twitterAuthLink, },) => {
  console.log(twitterAuthLink,)

  return (
    <div className={'w-full h-full'}>
      <Head>
        <title>Twitter to Mastodon</title>
        <meta name={'description'} content={'Make the switch to Mastodon without the hassle.'} />
        <link rel={'icon'} href={'/favicon.ico'} />
      </Head>

      <main className={'w-full h-full flex flex-col flex items-center justify-center'}>
        <h1>Twitter to Mastodon</h1>
        <p className={'mb-5'}>Connect your Twitter account to get started</p>
        <LoginWithTwitter twitterAuthLink={twitterAuthLink} />
      </main>

      <footer>

      </footer>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = () => {
  const client = new TwitterApi({
    clientId     : process.env.TWITTER_CLIENT_ID as string,
    clientSecret : process.env.TWITTER_CLIENT_SECRET,
  },)

  const twitterAuthLink = client.generateOAuth2AuthLink(`${process.env.HOST_DOMAIN_PUBLIC}/api/twitter-oauth`,
    { scope : [ 'tweet.read', 'users.read', 'offline.access', ], },)

  // console.log(twitterAuthLink)

  return {
    props : {
      twitterAuthLink,

    },
  }
}

export default Home
