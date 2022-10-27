import React, { FunctionComponent, } from 'react'
import Why                           from './Why'

type Props = {
  contentKey: string
}

const ModalContent: FunctionComponent<Props> = ({ contentKey, },) => {

  if (contentKey === 'why') {
    return (
      <Why />
    )
  }

  return null
}

export default ModalContent
