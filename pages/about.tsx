import React, { FunctionComponent, } from 'react'
import PageContainer                 from '../components/PageContainer'

type Props = {}

const AboutPage: FunctionComponent<Props> = (props,) => {

  return (
    <PageContainer>
      <h1>About</h1>
      <p>
        This site was created out of a shared urgency amongst members of JournoDAO to own our own social media
        channels and have portable communities.
      </p>
      <p>
        <a href={'https://journodao.xyz'}>JournoDAO</a> is focused on protecting democracy by combating disinformation
        through regenerative community journalism and initiatives to support journalists embracing decentralization.
      </p>
      <p>
        This site is an effort to help people adopt neutral and decentralized platforms so that one&apos;s choice of
        tools doesn&apos;t limit your freedom to communicate.
      </p>
    </PageContainer>
  )
}

export default AboutPage
