import React, { FunctionComponent, } from 'react'

type Props = {}

const Why: FunctionComponent<Props> = (props,) => {

  return (
    <>
      <h1>Why Switch?</h1>
      <p>
        We use Twitter like a public utility, but it&apos;s not. A private company should not be the arbiter of free speach.
        Twitter itself doesn&apos;t even want to be in this position. Humans need a way to communicate that&apos;s independent of
        a single entity&apos;s profits and motives.
      </p>
      <p>
        It may not feel like you&apos;re being censored, but the entire UX of Twitter is nudging you towards behavior that is
        solely meant to achieve the platform&apos;s objectives. It&apos;s not helping you achieve your goals if they do not align
        with the business&apos;s goals.
      </p>
      <p>
        To think that there is 100% overlap between what you want and what Twitter wants, both now and indefinitely into
        the future ... well, good luck with that.
      </p>
      <p>
        Also, if a single individual can buy your public utility and shape it to their whims, it&apos;s not a utility. Nor is
        it a very reliable communication tool.
      </p>
      <p>
        Imagine being no more worried about Elon Musk buying Twitter as him buying Hotmail. Oh darn, I guess I&apos;ll just
        use my other email address now.
      </p>
    </>
  )
}

export default Why
