import classNames from 'classnames'
import React from 'react'
import Loader from 'react-loader-spinner'

interface ButtonWithLoaderProps extends React.InputHTMLAttributes<HTMLInputElement> {
  showLoader: boolean
  children: React.ReactNode
  type: 'reset' | 'button' | 'submit'
}

export default function ButtonWithLoader(props: ButtonWithLoaderProps) {
  const { children, showLoader, className, type } = props

  return (
    // eslint-disable-next-line react/button-has-type
    <button type={type} className={classNames('button', className)}>
      {!showLoader && <span>{children}</span>}
      <Loader type="ThreeDots" color="#f5f3f9" height={40} width={40} visible={showLoader} />
    </button>
  )
}
