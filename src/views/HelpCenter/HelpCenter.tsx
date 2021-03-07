import React, { FunctionComponent } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
// import { useTranslation } from 'react-i18next'

const HeaderDiv = styled.div`
  width: 100%;
  text-align: center;
  margin-bottom: 100px;
`
const BlueDash = styled.span`
  color: #23d2e2;
`

const HelpSupport: FunctionComponent<{}> = () => {
  return (
    <>
      <div className="content-grid">
        <div className="grid grid-3-6-3">
          <div className="grid-column" />
          <div className="grid-column">
            <HeaderDiv>
              <h1>
                <BlueDash>-</BlueDash> Help Center <BlueDash>-</BlueDash>
              </h1>
            </HeaderDiv>
            <div className="grid grid-half">
              <div className="grid-column">
                <div className="widget-box">
                  <div className="widget-box-content">
                    <Link to="/support/faq">
                      <svg
                        className="menu-item-link-icon icon-group"
                        style={{ width: '45px', height: '45px', fill: '#3e3f5e' }}
                      >
                        <use xlinkHref="#svg-group" />
                      </svg>
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
                    <svg
                      className="reaction-count-icon icon-private"
                      style={{ width: '45px', height: '45px', fill: '#3e3f5e' }}
                    >
                      <use xlinkHref="#svg-private" />
                    </svg>
                    <Link to="/support/faq">
                      <h1>Privacy Policy</h1>
                    </Link>
                    <p>
                      Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical
                      Latin literature from 45 BC, making it over 2000 years old.
                    </p>
                  </div>
                </div>
              </div>
              <div className="grid-column">
                <div className="widget-box">
                  <div className="widget-box-content">
                    <Link to="/support/faq">
                      <svg
                        className="reaction-count-icon icon-comment"
                        style={{ width: '45px', height: '45px', fill: '#3e3f5e' }}
                      >
                        <use xlinkHref="#svg-comment" />
                      </svg>
                      <h1>Contact</h1>
                    </Link>
                    <p>
                      Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical
                      Latin literature from 45 BC, making it over 2000 years old.
                    </p>
                  </div>
                </div>
                <div className="widget-box">
                  <div className="widget-box-content">
                    <svg
                      className="reaction-count-icon icon-info"
                      style={{ width: '45px', height: '45px', fill: '#3e3f5e' }}
                    >
                      <use xlinkHref="#svg-info" />
                    </svg>
                    <Link to="/support/faq">
                      <h1>Terms of services</h1>
                    </Link>
                    <p>
                      Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical
                      Latin literature from 45 BC, making it over 2000 years old.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default HelpSupport
