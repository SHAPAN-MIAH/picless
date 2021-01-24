import React, { FunctionComponent } from 'react'
import moment from 'moment'

import Alert from '../../../components/Common/Alerts/Alerts'

import { UserProfileType, UserInterestType, UserTimeLineType } from '../../../types/UserType.d'

type AboutTabProps = {
  user: UserProfileType
}

const AboutTab: FunctionComponent<AboutTabProps> = (props) => {
  const { user } = props

  const noInterests = 'The user has not yet added interests.'
  const noTimeLineEvents = 'The user has not yet added events to the timeline.'

  return (
    <>
      <div className="grid grid-3-9 mobile-prefer-content">
        <div className="grid-column">
          <div className="widget-box">
            <p className="widget-box-title">About Me</p>

            <div className="widget-box-content">
              <p className="paragraph">{user.profileDescription}</p>

              <div className="information-line-list">
                <div className="information-line">
                  <p className="information-line-title">Name</p>

                  <p className="information-line-text">{user.fullName}</p>
                </div>

                <div className="information-line">
                  <p className="information-line-title">Joined</p>

                  <p className="information-line-text">{user.registrationDate}</p>
                </div>

                <div className="information-line">
                  <p className="information-line-title">City</p>

                  <p className="information-line-text">{user.cityName}</p>
                </div>

                <div className="information-line">
                  <p className="information-line-title">Country</p>

                  <p className="information-line-text">{user.countryName}</p>
                </div>

                <div className="information-line">
                  <p className="information-line-title">Age</p>

                  <p className="information-line-text">[ADDD] {user.birthDate}</p>
                </div>

                {user.occupation && (
                  <div className="information-line">
                    <p className="information-line-title">Occupation</p>

                    <p className="information-line-text">{user.occupation?.name}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* sdfsdfds */}

        <div className="grid-column">
          <div className="widget-box">
            <p className="widget-box-title">Interests</p>

            <div className="widget-box-content">
              <div className="information-block-list">
                {user.userInterest &&
                  user.userInterest?.length > 0 &&
                  user.userInterest?.map((interest: UserInterestType) => {
                    return (
                      <div key={interest.id} className="information-block">
                        <p className="information-block-title">{interest.name}</p>

                        <p className="information-block-text">{interest.description}</p>
                      </div>
                    )
                  })}

                {user.userInterest && user.userInterest?.length === 0 && (
                  <Alert alertType="PRIMARY" message={noInterests} style={{ width: '100%' }} />
                )}
              </div>
            </div>
          </div>

          <div className="widget-box">
            <p className="widget-box-title">Timeline</p>

            <div className="widget-box-content">
              <div className="timeline-information-list">
                {user.userTimeLine &&
                  user.userTimeLine?.length > 0 &&
                  user.userTimeLine?.map((event: UserTimeLineType) => {
                    return (
                      <div key={event.id} className="timeline-information">
                        <p className="timeline-information-title">{event.title}</p>

                        <p className="timeline-information-date">{`${event.yearSarted} - ${event.yearEnded}`}</p>

                        <p className="timeline-information-text">
                          Lead Costume Designer for the Amazzo Costumes agency. Im in charge of a ten person group,
                          overseeing all the proyects and talking to potential clients. I also handle some face to face
                          interviews for new candidates.
                        </p>
                      </div>
                    )
                  })}

                {user.userTimeLine && user.userTimeLine?.length === 0 && (
                  <Alert alertType="PRIMARY" message={noTimeLineEvents} style={{ width: '100%' }} />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default AboutTab
