import React, { FunctionComponent } from 'react'
import { Link } from 'react-router-dom'
// import { useTranslation } from 'react-i18next'

const HelpSupport: FunctionComponent<{}> = () => {
  return (
    <>
      <div className="grid">
        <div className="grid-column">
          <div className="grid grid-3-3-3-3 mobile-prefer-content">
            <div className="grid-column"> </div>
            <div className="grid-column">
              <div className="widget-box">
                <div className="widget-box-content">
                  <Link to="/support/faq">
                    <h1>FAQ</h1>
                  </Link>
                  <p>
                    Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical
                    Latin literature from 45 BC, making it over 2000 years old.
                  </p>
                </div>
              </div>
              <div className="widget-box">
                <div className="widget-box-content">
                  <h1>aasd</h1>
                </div>
              </div>
            </div>
            <div className="grid-column">
              <div className="widget-box">
                <div className="widget-box-content">
                  <h1>aasd</h1>
                </div>
              </div>
              <div className="widget-box">
                <div className="widget-box-content">
                  <h1>aasd</h1>
                </div>
              </div>
            </div>

            <div className="grid-column"> </div>
          </div>
        </div>
      </div>

      {/* <div className="content-grid">
        <div className="grid grid-4-4">
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
                    <Link to="/support/faq">FAQ</Link>
                  </form>
                </div>
              </div>
            </div>
            <div className="grid-column">
              <div className="widget-box">
                <div className="widget-box-content">
                  <form className="form">
                    <Link to="/support/faq">Contact</Link>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div> */}
    </>
  )
}

export default HelpSupport
