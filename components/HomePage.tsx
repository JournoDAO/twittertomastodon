import React, { FunctionComponent, useCallback, useEffect, useState, } from 'react'
import { FaMastodon, FaTwitter, FaStop, }                              from 'react-icons/fa'
import { ImArrowRight, }                                               from 'react-icons/im'
import Modal                                                           from 'react-modal'
import Why                                                             from './Why'
import { useRouter, }                                                  from 'next/router'
import ModalContent                                                    from './ModalContent'
import Link                                                            from 'next/link'
import cookie                                                          from 'cookiejs'
import { clearTimeout, }                                               from 'timers'
import { NextPage, }                                                   from 'next'
import PageContainer                                                   from './PageContainer'

const COOKIE_KEY = 'twittermastodon-homepage'
const COOKIE_VALUE = 'has seen homepage'

type Props = {}

const HomePage: NextPage<Props> = () => {

  const [ contentKey, setContentKey, ] = useState<string | null>(null,)
  const [ donePrintingHeadline, setDonePrintingHeadline, ] = useState(false,)
  const [ shouldStopAnimation, setShouldStopAnimation, ] = useState(false,)
  const [ noAnimation, setNoAnimation, ] = useState(false,)
  const [ timeouts, setTimeouts, ] = useState<NodeJS.Timeout[]>([],)

  const router = useRouter()

  const { query, } = router

  const getNoAnimation = useCallback(() => {
    return noAnimation
  }, [ noAnimation, ],)

  const clearTimeouts = useCallback(() => {
    for ( let i = 0; i < timeouts.length; i++ ) {
      const timeout = timeouts[i]
      console.log(timeout,)
    }
  }, [ timeouts, ],)

  useEffect(() => {
    if (query.slug && query.slug.length > 0) {
      setContentKey(query.slug[0],)
    }
  }, [ query, ],)

  useEffect(() => {

    const headlineElement = document.getElementById('headline',)
    if ( !headlineElement ) {
      return
    }

    const spans = headlineElement.children

    const cookieValue = cookie.get(COOKIE_KEY,)

    if ( cookieValue === COOKIE_VALUE ) {
      setNoAnimation(true,)
      skipAnimation()
      return
    }

    // console.log(spans,)

    let delay = 0
    let previousWordLength = 0

    for ( let i = 0; i < spans.length; i++ ) {
      const spanEl = spans[i]
      const word = spanEl.innerHTML

      // console.log(`word.length: ${word.length}`,)

      const wordLengthToUse = previousWordLength === 0 ? word.length : previousWordLength

      previousWordLength = word.length

      let newDelay = 0
      const proportionalDelay = wordLengthToUse * 100

      newDelay = delay + proportionalDelay
      delay = newDelay

      if ( i === 0 ) {
        spanEl.className = spanEl.className + ' fast-fade-in'
        continue
      }

      // console.log(`newDelay: ${newDelay}`,)

      const timeout = setTimeout(() => {
        // console.log('fade in',)
        // console.log(sentence,)
        // console.log(`newDelay: ${newDelay}`,)
        spanEl.className = spanEl.className + ' fast-fade-in'

        if ((i + 1) === spans.length) {
          const timeout = setTimeout(() => {
            console.log(`[99] ${getNoAnimation()}`,)

            setDonePrintingHeadline(true,)

          }, 1000,)

          setTimeouts([
            ...timeouts,
            timeout,
          ],)
        }

      }, newDelay,)

      setTimeouts([
        ...timeouts,
        timeout,
      ],)
    }

    return () => {
      clearTimeouts()
    }

  }, [],)


  useEffect(() => {
    if (donePrintingHeadline) {

      const paragraphElement = document.getElementById('paragraph',)
      if (!paragraphElement) {
        return
      }

      const spans = paragraphElement.children

      let delay = 0

      for ( let i = 0; i < spans.length; i++ ) {
        const spanEl = spans[i]

        const sentence = spanEl.innerHTML

        let newDelay = 0
        let proportionalDelay = 900 + (sentence.length**2)

        if (proportionalDelay > 2000) {
          proportionalDelay = 2000
        }

        newDelay = delay + proportionalDelay
        delay = newDelay
        // console.log(`delay: ${delay}`,)
        // console.log(`sentence.length: ${sentence.length}`,)
        console.log(`proportionalDelay: ${proportionalDelay}`,)

        const fadeInAnimationEndHandler = () => {
          // console.log(`Animation just ended: ${spanEl.innerHTML}`,)

          spanEl.removeEventListener('animationend', fadeInAnimationEndHandler,)

          const fadeOutAnimationHandler = () => {

            const nextIndex = i + 1

            if ( nextIndex !== spans.length ) {
              spanEl.removeEventListener('animationend', fadeOutAnimationHandler,)

              const nextSpanEl = spans[i + 1]

              nextSpanEl.className = nextSpanEl.className + ' fade-in'
            } else {
              proportionalDelay = 2000
            }
          }

          spanEl.addEventListener('animationend', fadeOutAnimationHandler,)

          const timeout = setTimeout(() => {

            if ( (i + 1) !== spans.length ) {
              spanEl.className = spanEl.className.replace('fade-in', 'fade-out',)

            } else {
              // End of animation
              cookie(COOKIE_KEY, COOKIE_VALUE,)
              const buttonsEl = document.getElementById('buttons',)
              if (!buttonsEl) {
                return
              }
              buttonsEl.className = buttonsEl.className + ' fade-in'
              setNoAnimation(true,)
              cookie(COOKIE_KEY, COOKIE_VALUE,)
            }
          }, (proportionalDelay - 1000),)

          setTimeouts([
            ...timeouts,
            timeout,
          ],)
        }

        spanEl.addEventListener('animationend', fadeInAnimationEndHandler,)

      }

      spans[0].className = spans[0].className + ' fade-in'


    }

  }, [ donePrintingHeadline, ],)

  useEffect(() => {
    if (shouldStopAnimation) {
      console.log('stopping animation',)
      clearTimeouts()
      skipAnimation()
      cookie(COOKIE_KEY, COOKIE_VALUE,)
    }

  }, [ shouldStopAnimation, ],)

  const skipAnimation = () => {
    // Make everything visible
    const headlineElement = document.getElementById('headline',)
    if ( !headlineElement ) {
      return
    }

    const spans = headlineElement.children

    for ( let i = 0; i < spans.length; i++ ) {
      const spanEl = spans[i]
      spanEl.setAttribute('style', 'display: block; opacity: 1;',)
    }

    const paragraphElement = document.getElementById('paragraph',)
    if ( !paragraphElement ) {
      return
    }

    const lastSentence = paragraphElement.lastElementChild

    if ( lastSentence ) {
      lastSentence.setAttribute('style', 'display: block; opacity: 1;',)
    }

    const buttonElement = document.getElementById('buttons',)
    if ( !buttonElement ) {
      return
    }

    buttonElement.setAttribute('style', 'opacity: 1;',)
  }

  const handleStopClick = () => {
    if (!noAnimation) {
      setShouldStopAnimation(true,)
      setNoAnimation(true,)
    }

    if (noAnimation) {
      // Replay the animation here
      cookie(COOKIE_KEY, null,)
      window.location.reload()
    }
  }

  return (
    <PageContainer>
      <div className={'w-full h-full flex flex-col flex items-center pt-12'}>

        <p id={'headline'} className={'reveal flex justify-center mb-5 text-white font-display text-center text-4xl flex-wrap'}>
          <span>If</span>
          <span>You</span>
          <span>Want</span>
          <span>a</span>
          <span>Better</span>
          <span>Twitter,</span>
          <span>You&apos;ll</span>
          <span>Have</span>
          <span>to</span>
          <span>Be</span>
          <span>OK</span>
          <span>With</span>
          <span>Something</span>
          <span>Different</span>
        </p>
        <div
          id={'paragraph'}
          className={'relative w-full reveal font-sans flex flex-col justify-center items-center text-white flex-wrap text-lg'}
        >
          <span>Don&apos;t worry.</span>
          <span>You&apos;ve done this before.</span>
          <span>You did it when you went from having no email to having email.</span>
          <span>You did it when you went from AOL to Netscape.</span>
          <span>You did it when you went from MySpace to Facebook.</span>
          <span>Now it&apos;s time to for Mastodon.</span>
        </div>
        <div id={'buttons'} className={'w-full flex flex-col mt-12 opacity-0'}>
          <Link href={'/start'}>
            <a
              className={'rounded text-violet-100 text-center px-3 py-2 mt-12 w-full bg-violet-700'}
            >
              Get started
            </a>
          </Link>
          <Link href={'/the-problem'}>
            <a
              className={'rounded border-white border text-white text-center px-3 py-2 mt-12 hover:border-pink-300 hover:text-pink-300 button'}
            >
              Ummmm ... what?
            </a>
          </Link>

        </div>

        <div id={'stop-animation'} className={'absolute mb-12 bottom-0'}>
          <button
            className={'flex flex-row items-center underline text-violet-200'}
            onClick={handleStopClick}
          >
            <span className={'ml-1'}>{noAnimation ? 'Replay' : 'Stop'} animation</span>
          </button>
        </div>

      </div>



      <Modal isOpen={!!contentKey}>
        {
          contentKey && (
            <ModalContent contentKey={contentKey} />
          )
        }
      </Modal>

    </PageContainer>
  )
}

export default HomePage
