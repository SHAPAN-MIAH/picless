import React, { FunctionComponent } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
// import { useTranslation } from 'react-i18next'

const H4Title = styled.h4`
  margin-bottom: 20px;
`

const bulletsVerifiedUser = [
  'Post photos, videos and live stream.',
  'Set a monthly price for your subscribers to access your content.',
  'Get tipos, from your subscribers.',
  'Sell content like photo and video for your subscribers.',
  'Get access to the analysis tool to see how much you have earn.',
  'Withdraw your money, weekly or monthly',
]

const bulletsVerifiedImage = [
  `A photo of you holding up a sign with your username and  ${process.env.REACT_APP_WEBSITE_NAME?.toLocaleLowerCase()}.com written on it.`,
  'The photo must show of your face.',
  'You cannot weara mask or sunglasses in the picture.',
  'Digitally modified text or images will be rejected.',
  'Max file size is 5mb.',
  'Supported file types: jpg, gif and png.',
  'Check out some examples.',
]

const PhotosWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(2, 1fr);
  grid-column-gap: 15px;
  grid-row-gap: 15px;
`

const PhotoContainer = styled.div`
  width: 100%;
  background-color: #615dfa;
  height: 150px;
  border-radius: 12px 12px 0 0;
`

const PhotoFooter = styled.div`
  width: 100%;
  text-align: center;
  background-color: #fff;
  height: 35px;
  padding: 10px;
  border-radius: 0 0 12px 12px;
`

const Verification: FunctionComponent<{}> = () => {
  return (
    <>
      <div className="content-grid">
        <div className="section-banner">
          <img
            className="section-banner-icon"
            src={`${process.env.PUBLIC_URL}/assets/img/banner/accounthub-icon.png`}
            alt="accounthub-icon"
          />

          <p className="section-banner-title">Profile Verify</p>

          <p className="section-banner-text">Verify your profile and start posting and charge for content.</p>
        </div>
        <div className="grid grid-2-8-2">
          <div className="grid-column">
            <div className="grid grid-half">
              <div className="grid-column">
                <div className="widget-box">
                  <div className="widget-box-content">
                    <H4Title className="tab-box-item-title">What can I do as a verified user?</H4Title>

                    <ul className="bullet-item-list">
                      {bulletsVerifiedUser.map((bullet) => {
                        return (
                          <li className="bullet-item" key={bullet}>
                            <svg className="bullet-item-icon icon-check">
                              <use xlinkHref="#svg-check" />
                            </svg>

                            <p className="bullet-item-text">{bullet}</p>
                          </li>
                        )
                      })}
                    </ul>
                  </div>

                  <div className="widget-box-content">
                    <H4Title className="tab-box-item-title">Why I need to do photo verification?</H4Title>

                    <p className="bullet-item-text" style={{ fontWeight: 700 }}>
                      You will not be able to upload content until you getting approved
                    </p>
                  </div>

                  <div className="widget-box-content">
                    <H4Title className="tab-box-item-title">What is a Verification Image?</H4Title>

                    <ul className="bullet-item-list">
                      {bulletsVerifiedImage.map((bullet) => {
                        return (
                          <li className="bullet-item" key={bullet}>
                            <svg className="bullet-item-icon icon-check">
                              <use xlinkHref="#svg-check" />
                            </svg>

                            <p className="bullet-item-text">{bullet}</p>
                          </li>
                        )
                      })}
                    </ul>
                  </div>
                </div>
              </div>
              <div className="grid-column">
                <PhotosWrapper>
                  <div style={{ gridArea: '1 / 1 / 2 / 2' }}>
                    <PhotoContainer />
                    <PhotoFooter>
                      <h6>
                        <svg className="bullet-item-icon icon-cross">
                          <use xlinkHref="#svg-cross" style={{ fill: 'red' }} />
                        </svg>
                        &nbsp;&nbsp;No person
                      </h6>
                    </PhotoFooter>
                  </div>

                  <div style={{ gridArea: '1 / 2 / 2 / 3' }}>
                    <PhotoContainer />
                    <PhotoFooter>
                      <h6>
                        <svg className="bullet-item-icon icon-cross">
                          <use xlinkHref="#svg-cross" style={{ fill: 'red' }} />
                        </svg>
                        &nbsp;&nbsp;No face in photo
                      </h6>
                    </PhotoFooter>
                  </div>

                  <div style={{ gridArea: '1 / 3 / 2 / 4' }}>
                    <PhotoContainer />
                    <PhotoFooter>
                      <h6>
                        <svg className="bullet-item-icon icon-cross">
                          <use xlinkHref="#svg-cross" style={{ fill: 'red' }} />
                        </svg>
                        &nbsp;&nbsp;Illegible text
                      </h6>
                    </PhotoFooter>
                  </div>

                  <div style={{ gridArea: '2 / 1 / 3 / 2' }}>
                    <PhotoContainer />
                    <PhotoFooter>
                      <h6>
                        <svg className="bullet-item-icon icon-cross">
                          <use xlinkHref="#svg-cross" style={{ fill: 'red' }} />
                        </svg>
                        &nbsp;&nbsp;Digital text
                      </h6>
                    </PhotoFooter>
                  </div>

                  <div style={{ gridArea: '2 / 2 / 3 / 3' }}>
                    <PhotoContainer />
                    <PhotoFooter>
                      <h6>
                        <svg className="bullet-item-icon icon-check">
                          <use xlinkHref="#svg-check" style={{ fill: '#14d500' }} />
                        </svg>
                        &nbsp;&nbsp;Verified Guy
                      </h6>
                    </PhotoFooter>
                  </div>

                  <div style={{ gridArea: '2 / 3 / 3 / 4' }}>
                    <PhotoContainer />
                    <PhotoFooter>
                      <h6>
                        <svg className="bullet-item-icon icon-check">
                          <use xlinkHref="#svg-check" style={{ fill: '#14d500' }} />
                        </svg>
                        &nbsp;&nbsp;Verified Girl
                      </h6>
                    </PhotoFooter>
                  </div>
                </PhotosWrapper>

                <div className="widget-box">
                  <p className="widget-box-title">Upload your photo</p>
                  <div className="widget-box-content">
                    <Link to="/account/add-bank">View Add bank</Link>
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

export default Verification
