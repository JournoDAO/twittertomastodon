import React, { FunctionComponent, HTMLAttributes, } from 'react'

type Props = HTMLAttributes<HTMLButtonElement> & {}

const Button: FunctionComponent<Props> = ({ children, ...props },) => {

  return (
    <button
      className={'bg-sky-400 text-white px-3 py-2 rounded'}
      {...props}
    >
      {children}
    </button>
  )
}

export default Button
