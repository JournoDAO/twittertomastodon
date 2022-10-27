import React, { FunctionComponent, HTMLAttributes, useEffect, useState, } from 'react'
import Head                                                               from 'next/head'
import { useRouter, }                                                     from 'next/router'
import LoginWithTwitter                                                   from './LoginWithTwitter'
import Nav                                                                from './Nav'


type Props = HTMLAttributes<HTMLDivElement> & {}

const AppLayout: FunctionComponent<Props> = ({ children, },) => {

  const [ isRouting, setIsRouting, ] = useState(false,)

  const router = useRouter()

  // On mount
  useEffect(() => {

    const handleRoutingStart = ( url, { shallow, }, ) => {
      setIsRouting(true,)
    }

    const handleRoutingComplete = ( url, { shallow, }, ) => {
      document.body.scrollTo(0, 0,)
      setIsRouting(false,)
    }

    router.events.on('routeChangeStart', handleRoutingStart,)
    router.events.on('routeChangeComplete', handleRoutingComplete,)

    return () => {

      router.events.off('routeChangeStart', handleRoutingStart,)
      router.events.off('routeChangeComplete', handleRoutingComplete,)

    }
  }, [],)

  return (
    <>
      <Head>
        <title>Twitter to Mastodon</title>
        <meta name={'description'} content={'Make the switch to Mastodon without the hassle.'}/>
        <link rel={'icon'} href={'/favicon.ico'}/>
      </Head>

      <Nav />

      <main className={'w-full flex flex-col flex items-center py-8 px-5'}>
        {children}
      </main>

      <footer className={'flex flex-row justify-center'}>
        <div
          className={'w-full flex flex-row justify-between items-center p-5 max-w-4xl hidden md:block'}
        >
          <span>&copy;<a href={'https://journodao.xyz'}>JournoDAO</a> 2022</span>
        </div>
      </footer>

    </>
  )
}

export default AppLayout
