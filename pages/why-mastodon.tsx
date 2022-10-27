import React, { FunctionComponent, } from 'react'
import { NextPage, }                 from 'next'
import PageContainer                 from '../components/PageContainer'

type Props = {}

const WhyMastodon: NextPage<Props> = () => {

  return (
    <PageContainer>
      <h1>Why Mastodon?</h1>
      <p>
        There have been many products over the years that attempted to replace Twitter and lure away its users. Mastodon
        by far has been the most successful in grabbing mainstream attention. Here's a quick rundown of other reasons
        it's a good choice.
      </p>
      <ul className={'card-list'}>
        <li>
          <p>
            <strong>Feature parity and familiar UX.</strong> To someone to be open to changing platforms, you need to be able to assure
            them that they can still do all the stuff they want to do on the new one.
          </p>
        </li>
        <li>
          <p>
            <strong>The right to exit.</strong> The problem with Twitter now is that we can't leave it. Twitter can do whatever they want
            to the platform and we have to stay there because that's where our friends are. Like with email, with
            Mastodon we can change providers with minimal friction and that ensures most providers will act according to
            their users' interests.
          </p>
        </li>
        <li>
          <p>
            <strong>Open source and credibly neutral.</strong> A necessity for the right to exit, user controll, trust, and neutrality.
            If you don't like something with the platform – fork it, change it, and publish it.
          </p>
        </li>
        <li>
          <p>
            <strong>Community.</strong> The hardest part about building software is getting people to use it. Mastodon has done the hard
            work of sticking around and gradually growing since 2016. It's a huge moat that will be very difficult for
            any new Twitter clone or competitor to cross. Even if a new product were able to gain attention quickly,
            they would not have the Lindy effect that Mastodon has.
          </p>
        </li>
      </ul>
      <p>
        And the biggest reason of all:
      </p>
      <span className={'font-display text-xl text-white mb-5'}>We have to choose something, and it has to be the same thing.</span>
      <p>
        If we all fracture to different platforms, each one will never give us the network effects we now enjoy on
        Twitter.
      </p>
      <p>
        Mastodon can accomodate everyone. Hell, even Trump used it as the software behind&nbsp;
        <a href={'https://github.com/justjosias/truth-social'} target={'_blank'} rel={'noreferrer'}>
          Truth Social
        </a>
        . Whatever your
        political leanings or preferences, Mastodon can be your thing.
      </p>
      <p>
        We're all just agreeing to use email here, we're not saying anything about the content of emails we will write,
        or what people should write.
      </p>
    </PageContainer>
  )
}

export default WhyMastodon
