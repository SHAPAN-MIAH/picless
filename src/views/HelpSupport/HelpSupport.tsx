import React, { FunctionComponent } from 'react'
// import { useTranslation } from 'react-i18next'

import LayoutMain from '../LayoutMain/LayoutMain'

const HelpSupport: FunctionComponent<{}> = () => {
  return (
    <>
      <LayoutMain>
        <div className="content-grid">
          <div className="grid grid-2-8-2">
            <div className="account-hub-content">
              <div className="section-header">
                <div className="section-header-info">
                  <h2 className="section-title">Help Support</h2>
                </div>
              </div>
              <div className="grid-column">
                <div className="widget-box">
                  <div className="widget-box-content">
                    <form className="form">
                      <h1> Under Construction</h1>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </LayoutMain>
    </>
  )
}

export default HelpSupport
