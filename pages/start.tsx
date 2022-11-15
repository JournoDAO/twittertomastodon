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
          className={'mastodon-step w-full bg-violet-50 shadow-xl rounded p-8 mb-8 text-slate-700'}
        >
          <div className={'flex flex-row items-center w-full mb-2'}>
            <h2 className={'text-violet-800'}>Step 1</h2>
            <button
              onClick={handleInfoClick}
            >
              {/*<IoMdInformationCircleOutline className={'text-xl ml-3 text-stone-400'} />*/}

            </button>
          </div>
          <p className={'text-left md:w-2/3 mb-5 text-stone-500'}>
            Create a Mastodon account on any of these servers:
            {/*<Link href={''}>*/}
            {/*  <a className={'underline'}>Read more</a>*/}
            {/*</Link>*/}
          </p>

          <div className={'w-full flex flex-row items-center mt-3'}>
            <a
              className={'flex flex-row items-center justify-center text-center'}
              href={'https://mastodon.cloud'}
              target={'_blank'}
              rel={'noreferrer'}
            >
              <span className={'text-slate-700'}>mastodon.cloud</span>
              {/*<BsBoxArrowUpRight className={'ml-3 text-slate-700'} />*/}
            </a>
          </div>
          <div className={'w-full flex flex-row items-center mt-3'}>
            <a
              className={'flex flex-row items-center justify-center text-center'}
              href={'https://universeodon.com'}
              target={'_blank'}
              rel={'noreferrer'}
            >
              <span className={'text-slate-700'}>universeodon.com</span>
              {/*<BsBoxArrowUpRight className={'ml-3 text-slate-700'}/>*/}
            </a>
          </div>
          <div className={'w-full flex flex-row items-center mt-3'}>
            <a
              className={'flex flex-row items-center justify-center text-center'}
              href={'https://mstdn.party'}
              target={'_blank'}
              rel={'noreferrer'}
            >
              <span className={'text-slate-700'}>mstdn.party</span>
              {/*<BsBoxArrowUpRight className={'ml-3 text-slate-700'}/>*/}
            </a>
          </div>

        </div>


        <div
          className={'mastodon-step w-full bg-violet-50 shadow-xl rounded p-8 mb-8 text-slate-700'}
        >
          <div className={'flex flex-row items-center w-full mb-2'}>
            <h2 className={'text-violet-800'}>Step 2</h2>
            <span className={'ml-3 text-stone-400'}>(Optional)</span>
            {/*<IoMdInformationCircleOutline className={'text-xl ml-3 text-stone-400'}/>*/}
          </div>
          <p className={'text-left md:w-2/3 mb-5 text-stone-500'}>
            Setup crossposting from<br /> Twitter &lsaquo;&rsaquo; Mastodon
          </p>
          <div className={'w-full flex flex-row items-center mt-3'}>
            <a
              className={'flex flex-row items-center justify-center text-center'}
              href={'https://moa.party'}
              target={'_blank'}
              rel={'noreferrer'}
            >
              <span className={'text-slate-700'}>moa.party</span>
              {/*<BsBoxArrowUpRight className={'ml-3 text-slate-700'}/>*/}
            </a>
          </div>
        </div>

        <div
          className={'mastodon-step w-full bg-violet-50 shadow-xl rounded p-8 mb-8 text-slate-700'}
        >
          <div className={'flex flex-row items-center w-full mb-2'}>
            <h2 className={'text-violet-800'}>Step 3</h2>
            {/*<IoMdInformationCircleOutline className={'text-xl ml-3 text-stone-400'}/>*/}
          </div>
          <p className={'text-left md:w-2/3 mb-5 text-stone-500'}>
            Add your Mastodon username in your Twitter bio
          </p>
          <div className={'w-full flex flex-row items-center mt-3'}>
            <a
              className={'flex flex-row items-center justify-center text-center'}
              href={'https://twitter.com/settings/profile'}
              target={'_blank'}
              rel={'noreferrer'}
            >
              <span className={'text-slate-700'}>twitter.com/settings/profile</span>
              {/*<BsBoxArrowUpRight className={'ml-3 text-slate-700'}/>*/}
            </a>
          </div>
        </div>
        <div
          className={'mastodon-step w-full bg-violet-50 shadow-xl rounded p-8 mb-8 text-slate-700'}
        >
          <div className={'flex flex-row items-center w-full mb-2'}>
            <h2 className={'text-violet-800'}>Step 4</h2>
            {/*<IoMdInformationCircleOutline className={'text-xl ml-3 text-stone-400'}/>*/}
          </div>
          <p className={'text-left md:w-2/3 mb-5 text-stone-500'}>
            Find your people with Debirdify
          </p>
          <div className={'w-full flex flex-row items-center mt-3'}>
            <a
              className={'flex flex-row items-center justify-center text-center'}
              href={'https://pruvisto.org/debirdify/'}
              target={'_blank'}
              rel={'noreferrer'}
            >
              <span className={'text-slate-700'}>pruvisto.org/debirdify</span>
              {/*<BsBoxArrowUpRight className={'ml-3 text-slate-700'}/>*/}
            </a>
          </div>
        </div>
      </div>
      <div>
        <h1>That&apos;s it!</h1>
        <p>Now you can move over to Mastodon whenever you like and your Twitter followers can find you there as they move over as well.</p>
      </div>
    </PageContainer>
  )
}

export default StartPage
