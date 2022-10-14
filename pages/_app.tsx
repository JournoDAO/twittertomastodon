import '../styles/globals.css'
import type { AppProps, } from 'next/app'
import AppLayout          from '../components/AppLayout'

const TwitterToMastodonApp = ({ Component, pageProps, }: AppProps,) => {
  return (
    <AppLayout>
      <Component {...pageProps} />
    </AppLayout>
  )
}

export default TwitterToMastodonApp
