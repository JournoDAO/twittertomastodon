import React, { FunctionComponent, useEffect, useState, } from 'react'
import { useRouter, }                                     from 'next/router'
import { IoMdMenu, IoMdClose, }                           from 'react-icons/io'
import Link                                               from 'next/link'

type Props = {}

const Nav: FunctionComponent<Props> = () => {

  const [ isSidenavOpen, setIsSidenavopen, ] = useState(false,)

  const router = useRouter()

  useEffect(() => {

    const handleRouteChange = () => {
      setIsSidenavopen(false,)
    }

    router.events.on('routeChangeStart', handleRouteChange,)

    return () => {
      console.log('unmounting',)
      router.events.off('routeChangeStart', handleRouteChange,)
    }
  }, [],)

  const toggleMenuOpen = () => {
    setIsSidenavopen(!isSidenavOpen,)
  }

  return (
    <nav className={'flex flex-row justify-end'}>
      <button
        className={'p-3'}
        onClick={toggleMenuOpen}
      >
        <IoMdMenu className={'text-white text-4xl'} />

      </button>
      <div
        id={'sidenav'}
        className={`fixed h-full w-64 p-5 bg-violet-50 shadow-xl ${isSidenavOpen ? '' : 'closed'}`}
      >
        <div
          className={'flex flex-row justify-end mb-4'}
        >
          <button
            onClick={toggleMenuOpen}
          >
            <IoMdClose className={'text-2xl'} />

          </button>
        </div>
        <ul className={'w-full'}>
          <li>
            <Link
              href={'/'}
            >
              <a>
                Home
              </a>
            </Link>
          </li>
          <li>
            <Link
              href={'/start'}
            >
              <a>
                Start
              </a>
            </Link>
          </li>
          <li>
            <Link
              href={'/the-problem'}
            >
              <a>
                The Problem
              </a>
            </Link>
          </li>
          <li>
            <Link
              href={'/why-mastodon'}
            >
              <a>
                Why Mastodon?
              </a>
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  )
}

export default Nav
