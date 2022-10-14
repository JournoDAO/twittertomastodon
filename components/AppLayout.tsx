import React, { FunctionComponent, HTMLAttributes, useEffect, useState, } from 'react'
import Head                                                               from 'next/head'
import { useRouter, }                                                     from 'next/router'


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
        <title>JournoDAO App</title>
        <meta name={'description'} content={'Give $JOURNO to a journalist you love.'}/>
        <link rel={'icon'} href={'/favicon.ico'}/>
      </Head>

      <main className={'h-full w-full'}>

        <div className={'h-full w-full overflow-scroll pb-36'}>
          {children}
        </div>
      </main>

      <footer className={'flex flex-row items-center justify-between container mx-auto h-32 px-16'}>
        <div>
          <span className={'text-orange-400 font-serif text-sm'}>© 2022 JournoDAO</span>
        </div>
        <div>
          <a href={'https://twitter.com/JournoDAO'} target={'_blank'}
            className={'text-orange-400 font-serif text-sm hover:underline'} rel={'noreferrer'}>Twitter</a>
        </div>
      </footer>

    </>
  )
}

export default AppLayout
