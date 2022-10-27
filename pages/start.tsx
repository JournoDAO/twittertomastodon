import React                             from 'react'
import { NextPage, }                     from 'next'
import Link                              from 'next/link'
import { BsBoxArrowUpRight, }            from 'react-icons/bs'
import { IoMdInformationCircleOutline, } from 'react-icons/io'
import PageContainer                     from '../components/PageContainer'

type Props = {}

const StartPage: NextPage<Props> = () => {

  const handleInfoClick = () => {

  }

  return (
    <PageContainer>
      <h1>Moving to Mastodon</h1>
      <Link href={'/the-problem'}>
        <a className={'underline text-white mb-8'}>Why should I do this?</a>
      </Link>
      <div
        className={'w-full max-w-xl flex flex-col items-center justify-between'}
      >

        <div
          className={'mastodon-step w-full bg-violet-50 shadow-xl rounded p-8 mb-8 cursor-pointer text-slate-700'}
        >
          <div className={'flex flex-row items-center w-full mb-2'}>
            <h2 className={'text-violet-800'}>Step 1</h2>
            <button
              onClick={handleInfoClick}
            >
              <IoMdInformationCircleOutline className={'text-xl ml-3 text-stone-400'} />

            </button>
          </div>
          <p className={'text-left md:w-2/3 mb-5 text-stone-500'}>
            Create a Mastodon account on mastodon.social
            {/*<Link href={''}>*/}
            {/*  <a className={'underline'}>Read more</a>*/}
            {/*</Link>*/}
          </p>

          <div className={'w-full flex flex-row items-center mt-3 justify-end'}>
            <a
              className={'flex flex-row items-center justify-center px-3 py-2 bg-pink-500 rounded text-white w-1/2 text-center'}
              href={'https://mastodon.social'}
            >
              <span>Let&apos;s go</span>
              <BsBoxArrowUpRight className={'ml-3'} />
            </a>
          </div>

        </div>


        <div
          className={'mastodon-step w-full bg-violet-50 shadow-xl rounded p-8 mb-8 cursor-pointer text-slate-700'}
        >
          <div className={'flex flex-row items-center w-full mb-2'}>
            <h2 className={'text-violet-800'}>Step 2</h2>
            <IoMdInformationCircleOutline className={'text-xl ml-3 text-stone-400'}/>
          </div>
          <p className={'text-left md:w-2/3 mb-5 text-stone-500'}>
            Connect Twitter to Mastodon
          </p>
          <div className={'w-full flex flex-row items-center mt-3 justify-end'}>
            <a
              className={'flex flex-row items-center justify-center px-3 py-2 bg-pink-500 rounded text-white w-1/2 text-center'}
              href={'https://moa.party'}
            >
              <span>Let&apos;s go</span>
              <BsBoxArrowUpRight className={'ml-3'}/>
            </a>
          </div>
        </div>

        <div
          className={'mastodon-step w-full bg-violet-50 shadow-xl rounded p-8 mb-8 cursor-pointer text-slate-700'}
        >
          <div className={'flex flex-row items-center w-full mb-2'}>
            <h2 className={'text-violet-800'}>Step 3</h2>
            <IoMdInformationCircleOutline className={'text-xl ml-3 text-stone-400'}/>
          </div>
          <p className={'text-left md:w-2/3 mb-5 text-stone-500'}>
            Add your Mastodon username in your Twitter bio
          </p>
          <div className={'w-full flex flex-row items-center mt-3 justify-end'}>
            <a
              className={'flex flex-row items-center justify-center px-3 py-2 bg-pink-500 rounded text-white w-1/2 text-center'}
              href={'https://twitter.com/settings/profile'}
            >
              <span>Let&apos;s go</span>
              <BsBoxArrowUpRight className={'ml-3'}/>
            </a>
          </div>
        </div>
      </div>
      <div>
        <h1>That's it!</h1>
        <p>Now you can move over to Mastodon whenever you like and your Twitter followers can find you there as they move over as well.</p>
      </div>
    </PageContainer>
  )
}

export default StartPage
