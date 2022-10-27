import React, { FunctionComponent, } from 'react'

type Props = {}

const MastodonCreate: FunctionComponent<Props> = (props,) => {

  return (
    <>
      <h1>Create a Mastodon account</h1>
      <p>Now we&apos;ll create your new Mastodon account.</p>
      <button className={'mt-5 bg-gray-200 rounded px-3 py-2'}>
        Let&apos;s do this
      </button>
    </>
  )
}

export default MastodonCreate
