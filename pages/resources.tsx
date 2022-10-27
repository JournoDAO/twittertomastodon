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
          <a href={'https://moa.party/'}>Moa Bridge</a><br />
          <span className={'italic text-base'}>Support them on <a href={'https://opencollective.com/moa'}>OpenCollective</a></span>
        </li>
        <li>
          <a href={'https://mcgodwin.com/en/2018/08/18/twitter-mastodon/'}>Twitter to Mastodon</a>
        </li>
      </ul>
    </PageContainer>
  )
}

export default ResourcesPage
