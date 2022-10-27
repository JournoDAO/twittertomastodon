import React, { FunctionComponent, HTMLAttributes, useEffect, } from 'react'
import Head                                                     from 'next/head'
import { useRouter, }                                           from 'next/router'
import Nav                                                      from './Nav'


type Props = HTMLAttributes<HTMLDivElement> & {}

const AppLayout: FunctionComponent<Props> = ({ children, },) => {


  const router = useRouter()

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
        {
          router &&
          router.pathname !== '/' && (
            <div
              className={'w-full flex flex-row justify-between items-center p-5 max-w-4xl hidden md:block'}
            >
              <span>&copy;<a href={'https://journodao.xyz'}>JournoDAO</a> 2022</span>
            </div>

          )
        }
      </footer>

    </>
  )
}

export default AppLayout
