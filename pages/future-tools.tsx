import React, { FunctionComponent, } from 'react'
import PageContainer                 from '../components/PageContainer'

type Props = {}

const FutureToolsPage: FunctionComponent<Props> = (props,) => {

  return (
    <PageContainer>
      <h1>Tools in the Not-So-Distant Future</h1>
      <p>
        We wouldn't recommend Mastodon if it didn't allow you to easliy take your data with you to other apps.
      </p>
      <p>
        And we're keenly aware of just how close we are to some even better apps in the works that you'll
        want to check out when they're ready. (Email us at info@journodao.xyz if you have one you want us to add)
      </p>
      <p>
        Here are just a few:
      </p>
      <ul>
        <li>
          <a href={'https://twitter.com/farcaster_xyz'}>Farcaster</a><br/>
          <span className={'italic text-base'}>Invite only</span>
        </li>
        <li>
          <a href={'https://blueskyweb.xyz/'}>Bluesky</a><br/>
          <span className={'italic text-base'}>In development</span>
        </li>
        <li>
          <a href={'https://lenster.xyz/'}>Lenster</a><br/>
          <span className={'italic text-base'}>Closed beta</span>
        </li>
        <li>
          <a href={'https://orbis.club/'}>Orbis</a><br/>
          <span className={'italic text-base'}>Live! Slightly different UX than Twitter</span>
        </li>
      </ul>
    </PageContainer>
  )
}

export default FutureToolsPage
