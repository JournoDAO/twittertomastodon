import React, { FunctionComponent, useEffect, useState, } from 'react'
import { useRouter, }                                     from 'next/router'
import { IoMdMenu, IoMdClose, }                           from 'react-icons/io'
import Link                                               from 'next/link'
import { FaMastodon, FaTwitter, }                         from 'react-icons/fa'
import { ImArrowRight, }                                  from 'react-icons/im'

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
      router.events.off('routeChangeStart', handleRouteChange,)
    }
  }, [],)

  const toggleMenuOpen = () => {
    setIsSidenavopen(!isSidenavOpen,)
  }

  return (
    <nav className={'flex flex-row justify-end md:justify-center'}>
      <div
        id={'top-nav'}
        className={'flex flex-row items-center w-full p-5 max-w-4xl hidden invisible md:visible md:flex md:relative'}
      >
        <Link href={'/'}>
          <a>
            <div className={'flex flex-row items-center justify-center bg-white rounded-full shadow px-3 py-2 w-32 cursor-pointer mr-12'}>
              <FaTwitter style={{ color : '#1da1f2', }} className={'text-xl'}/>
              <ImArrowRight className={'text-xl mx-2 text-stone-500'}/>
              <FaMastodon style={{ color : '#5c4fe5', }} className={'text-xl'}/>
            </div>
          </a>
        </Link>
        <Link href={'/start'}>
          <a className={''}>
            Start
          </a>
        </Link>
        <Link href={'/the-problem'}>
          <a className={''}>
            The Problem
          </a>
        </Link>
        <Link
          href={'/why-mastodon'}
        >
          <a>
            Why Mastodon?
          </a>
        </Link>
        <Link
          href={'/future-tools'}
        >
          <a>
            Future Tools
          </a>
        </Link>

      </div>
      <div className={'flex flex-row w-full justify-between p-3 md:hidden'}>
        <Link href={'/'}>
          <a>

            <div
              className={'flex flex-row items-center justify-center bg-white rounded-full shadow px-3 py-2 cursor-pointer'}>
              <FaTwitter style={{ color : '#1da1f2', }} className={'text-xl'}/>
              <ImArrowRight className={'text-xl mx-2 text-stone-500'}/>
              <FaMastodon style={{ color : '#5c4fe5', }} className={'text-xl'}/>
            </div>

          </a>
        </Link>
        <button
          onClick={toggleMenuOpen}
        >
          <IoMdMenu className={'text-white text-4xl'} />

        </button>

      </div>
      <div
        id={'sidenav'}
        className={`flex flex-col fixed md:hidden h-full w-64 p-5 bg-violet-50 shadow-xl z-10 ${isSidenavOpen ? '' : 'closed'}`}
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
          <li>
            <Link
              href={'/future-tools'}
            >
              <a>
                Future Tools
              </a>
            </Link>

          </li>
          <li>
            <Link
              href={'/resources'}
            >
              <a>
                Resources
              </a>
            </Link>

          </li>
          <li>
            <Link
              href={'/about'}
            >
              <a>
                About
              </a>
            </Link>

          </li>
        </ul>
        <div className={'flex flex-row justify-center w-full mt-auto'}>
          <span className={'text-stone-500'}>&copy;<a href={'https://journodao.xyz'}>JournoDAO</a> 2022</span>
        </div>
      </div>
    </nav>
  )
}

export default Nav
