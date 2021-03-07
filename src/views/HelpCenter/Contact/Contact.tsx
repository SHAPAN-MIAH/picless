import React, { FunctionComponent, useEffect } from 'react'
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

const HeaderH3 = styled.h3`
  margin-bottom: 10px;
`

const WhiteBoxContainer = styled.div`
  min-height: 240px;
`

const MailTo = styled.p`
  margin-top: 30px;
`

const Contact: FunctionComponent<{}> = () => {
  useEffect(() => {
    window.tpl.load(['sidebar'])
  }, [])

  return (
    <>
      <div className="content-grid landscape">
        <div className="grid grid-3-6-3">
          <div className="grid-column" />
          <div className="grid-column">
            <HeaderDiv>
              <h1>
                <BlueDash>-</BlueDash> Contact <BlueDash>-</BlueDash>
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
                      <HeaderH3>Doubts and issues</HeaderH3>
                    </Link>
                    <p>Write us, if you have any questions</p>
                    <MailTo>
                      <a href="mailto:contact@picless.com">contact@picless.com</a>
                    </MailTo>
                  </div>
                </WhiteBoxContainer>
              </div>
              <div className="grid-column">
                <WhiteBoxContainer className="widget-box">
                  <div className="widget-box-content">
                    <Link to="/support/faq">
                      <IconSvg className="reaction-count-icon icon-comment">
                        <use xlinkHref="#svg-comment" />
                      </IconSvg>
                      <HeaderH3>Feedback</HeaderH3>
                    </Link>
                    <p>What do you think? let us know</p>
                    <MailTo>
                      <a href="mailto:feedback@picless.com">feedback@picless.com</a>
                    </MailTo>
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

export default Contact
