import React, { FunctionComponent, } from 'react'
import PageContainer                 from '../components/PageContainer'

type Props = {}

const YouCanDoIt: FunctionComponent<Props> = ( props,) => {

  return (
    <PageContainer>
      <h1>You Got This</h1>
      <p>
        You did it when you went from having no email to having email. You did it when you went from AOL to Netscape.
        You did it when you went from email to Facebook.
      </p>
      <p>
        It's time time to make another change. From Twitter, a closed, private, ad-driven network to a platform that's
        open, permissionless, and customizable to be what you want it to be.
      </p>
      <p>
        This new platform will save us. It will free us from worrying about who Twitter decides to kick off or who
        maliciously buys the company. It's open source, it's been around a long time, and its users are very happy.
      </p>
    </PageContainer>
  )
}

export default YouCanDoIt
