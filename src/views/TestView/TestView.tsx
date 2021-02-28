import React, { FunctionComponent } from 'react'
import toast from 'react-hot-toast'

import UserService from 'services/UserService'

const TestView: FunctionComponent<{}> = () => {
  const handleSimpleToast = () => {
    toast('test')
  }

  const handleSuccessToast = () => {
    toast.success('Successfully created!')
  }

  const handleErrorToast = () => {
    toast.error('This is an error!')
  }

  const handleLoadingToast = () => {
    toast.loading('Waiting...')
  }

  const handlePromiseToast = () => {
    const myPromise = UserService.getUserProfile()
    toast.promise(myPromise, {
      loading: 'Loading',
      success: 'Got the data',
      error: 'Error when fetching',
    })
  }

  // const handleSimpleToast = () => {
  //   toast('test')
  // }
  return (
    <>
      <div className="grid grid-3-6-3 mobile-prefer-content">
        <div className="grid-column">{'  '}</div>
        <div className="grid-column">
          <button type="button" onClick={handleSimpleToast}>
            Simple Toast
          </button>

          <button type="button" onClick={handleSuccessToast}>
            Success Toast
          </button>

          <button type="button" onClick={handleErrorToast}>
            Error Toast
          </button>

          <button type="button" onClick={handleLoadingToast}>
            Loading Toast
          </button>

          <button type="button" onClick={handlePromiseToast}>
            Promise Toast
          </button>
        </div>
        <div className="grid-column">{'  '}</div>
      </div>
    </>
  )
}

export default TestView
