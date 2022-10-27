import React, { FunctionComponent, } from 'react'
import { NextPage, }                 from 'next'
import PageContainer                 from '../components/PageContainer'

type Props = {}

const TheProblem: NextPage<Props> = () => {

  return (
    <PageContainer>
      <h1>Why do we need to leave Twitter?</h1>
      <p>
        We use Twitter like a public utility, but it's not. A private company should not be the arbiter of free speach.
        Twitter itself doesn't even want to be in this position. Humans need a way to communicate that's independent of
        a single entity's profits and motives.
      </p>
      <p>
        It may not feel like you're being censored, but the entire UX of Twitter is nudging you towards behavior that is
        solely meant to achieve the platform's objectives. It's not helping you achieve your goals if they do not align
        with the business's goals.
      </p>
      <p>
        To think that there is 100% overlap between what you want and what Twitter wants, both now and indefinitely into
        the future ... well, good luck with that.
      </p>
      <p>
        Also, if a single individual can buy your public utility and shape it to their whims, it's not a utility. Nor is
        it a very reliable communication tool.
      </p>
      <p>
        Imagine being no more worried about Elon Musk buying Twitter as him buying Hotmail. <em>Oh darn, I guess I'll just
        use my other email address now.</em>
      </p>
    </PageContainer>
  )
}

export default TheProblem
