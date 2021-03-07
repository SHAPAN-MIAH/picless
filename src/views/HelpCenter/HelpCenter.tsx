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
                      <h1>FAQ1</h1>
                    </Link>
                    <p>
                      Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical
                      Latin literature from 45 BC, making it over 2000 years old.
                    </p>
                  </div>
                </div>
                <div className="widget-box">
                  <div className="widget-box-content">
                    <Link to="/support/faq">
                      <h1>FAQ2</h1>
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
                      <h1>FAQ3</h1>
                    </Link>
                    <p>
                      Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical
                      Latin literature from 45 BC, making it over 2000 years old.
                    </p>
                  </div>
                </div>
                <div className="widget-box">
                  <div className="widget-box-content">
                    <Link to="/support/faq">
                      <h1>FAQ4</h1>
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
