import React, { FunctionComponent, HTMLAttributes, } from 'react'

const PageContainer: FunctionComponent<HTMLAttributes<HTMLDivElement>> = ({ children, },) => {

  return (
    <div className={'flex flex-col w-full pb-36 max-w-xl'}>
      {children}
    </div>
  )
}

export default PageContainer
