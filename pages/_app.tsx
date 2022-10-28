import '../styles/globals.css'
import type { AppProps, } from 'next/app'
import AppLayout          from '../components/AppLayout'

import { init, }      from '@socialgouv/matomo-next'
import { useEffect, } from 'react'


const MATOMO_URL = process.env.NEXT_PUBLIC_MATOMO_URL
const MATOMO_SITE_ID = process.env.NEXT_PUBLIC_MATOMO_SITE_ID

const TwitterToMastodonApp = ({ Component, pageProps, }: AppProps,) => {

  useEffect(() => {
    init({ url : MATOMO_URL as string, siteId : MATOMO_SITE_ID as string, },)
  }, [],)

  return (
    <AppLayout>
      <Component {...pageProps} />
    </AppLayout>
  )
}

export default TwitterToMastodonApp
