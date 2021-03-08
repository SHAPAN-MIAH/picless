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
  margin-left: 20px;
  margin-right: 20px;
`

const IconSvg = styled.svg`
  width: 40px;
  height: 40px;
  fill: #3e3f5e;
  margin-bottom: 10px;
`
const WhiteBoxContainer = styled.div`
  min-height: 240px;
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
                <WhiteBoxContainer className="widget-box">
                  <div className="widget-box-content">
                    <Link to="/support/faq">
                      <IconSvg className="menu-item-link-icon icon-group">
                        <use xlinkHref="#svg-group" />
                      </IconSvg>
                      <h3>FAQ</h3>
                    </Link>
                    <p>
                      Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical
                      Latin literature from 45 BC, making it over 2000 years old.
                    </p>
                  </div>
                </WhiteBoxContainer>
                <WhiteBoxContainer className="widget-box">
                  <div className="widget-box-content">
                    <IconSvg className="reaction-count-icon icon-private">
                      <use xlinkHref="#svg-private" />
                    </IconSvg>
                    <Link to="/support/privacy">
                      <h3>Privacy Policy</h3>
                    </Link>
                    <p>
                      Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical
                      Latin literature from 45 BC, making it over 2000 years old.
                    </p>
                  </div>
                </WhiteBoxContainer>
              </div>
              <div className="grid-column">
                <WhiteBoxContainer className="widget-box">
                  <div className="widget-box-content">
                    <Link to="/support/contact">
                      <IconSvg className="reaction-count-icon icon-comment">
                        <use xlinkHref="#svg-comment" />
                      </IconSvg>
                      <h3>Contact</h3>
                    </Link>
                    <p>
                      Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical
                      Latin literature from 45 BC, making it over 2000 years old.
                    </p>
                  </div>
                </WhiteBoxContainer>
                <WhiteBoxContainer className="widget-box">
                  <div className="widget-box-content">
                    <IconSvg className="reaction-count-icon icon-info">
                      <use xlinkHref="#svg-info" />
                    </IconSvg>
                    <Link to="/support/terms-conditions">
                      <h3>Terms of services</h3>
                    </Link>
                    <p>
                      Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical
                      Latin literature from 45 BC, making it over 2000 years old.
                    </p>
                  </div>
                </WhiteBoxContainer>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default HelpSupport
