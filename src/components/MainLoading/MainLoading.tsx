import classNames from 'classnames'
import React, { FunctionComponent } from 'react'
import logo from '../../Picless.png'

const MainLoader: FunctionComponent<{ show: boolean }> = (props) => {
  const { show } = props

  return (
    <>
      <div id="main-loader" className={classNames('page-loader', show ? '' : 'hidden')}>
        <div style={{width: '20%'}}>
          <img src={logo} alt="PICLESS"/>
        </div>

        <div className="page-loader-info">
          <p className="page-loader-info-title">{process.env.REACT_APP_WEBSITE_NAME}</p>

          <p className="page-loader-info-text">Loading...</p>
        </div>

        <div className="page-loader-indicator loader-bars">
          <div className="loader-bar" />
          <div className="loader-bar" />
          <div className="loader-bar" />
          <div className="loader-bar" />
          <div className="loader-bar" />
          <div className="loader-bar" />
          <div className="loader-bar" />
          <div className="loader-bar" />
        </div>
      </div>
    </>
  )
}

export default MainLoader
