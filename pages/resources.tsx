import React, { FunctionComponent, } from 'react'
import PageContainer                 from '../components/PageContainer'

type Props = {}

const ResourcesPage: FunctionComponent<Props> = (props,) => {

  return (
    <PageContainer>
      <h1>Resources</h1>
      <p>
        This site is built heavily on the work of others. You should check out all these fabulous tools and links.
      </p>
      <ul>
        <li>
          <a href={'https://moa.party/'}>Moa Bridge</a><br/>
          <span className={'italic text-base'}>Support them on <a
            href={'https://opencollective.com/moa'}>OpenCollective</a></span>
        </li>
        <li>
          <a href={'https://videos.trom.tf/w/g1kdMnSBQQh6DWsrtYw1Cq'}>Getting Started on Mastodon (video)</a>
        </li>
        <li>
          <a href={'https://instances.social/'}>Find a Mastodon Instance</a>
        </li>
        <li>
          <a href={'https://github.com/joyeusenoelle/GuideToMastodon'}>Guide to Mastodon</a>
        </li>
        <li>
          <a href={'https://www.youtube.com/watch?v=S57uhCQBEk0'}>Mastodon & Fediverse Explained (video)</a>
        </li>
        <li>
          <a href={'https://matthiasott.com/notes/converting-your-twitter-archive-to-markdown'}>Converting Your Twitter Archive to Markdown</a>
        </li>
        <li>
          <a href={'https://mcgodwin.com/en/2018/08/18/twitter-mastodon/'}>Twitter to Mastodon</a>
        </li>
      </ul>
    </PageContainer>
  )
}

export default ResourcesPage
