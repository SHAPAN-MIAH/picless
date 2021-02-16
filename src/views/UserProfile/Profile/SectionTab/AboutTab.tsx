import React, { FunctionComponent, useContext } from 'react'

import Alert from '../../../../components/Common/Alerts/Alerts'

import { UserInterestType, UserTimeLineType } from '../../../../types/UserType.d'
import ProviderProfileContext from '../../../../context/ProviderProfileContext'

const AboutTab: FunctionComponent<{}> = () => {
  const { provider } = useContext(ProviderProfileContext.context)

  const noInterests = 'The user has not yet added interests.'
  const noTimeLineEvents = 'The user has not yet added events to the timeline.'

  return (
    <>
      <div className="grid grid-3-9 mobile-prefer-content">
        <div className="grid-column">
          <div className="widget-box">
            <p className="widget-box-title">About Me</p>

            <div className="widget-box-content">
              <p className="paragraph">{provider.profileDescription}</p>

              <div className="information-line-list">
                <div className="information-line">
                  <p className="information-line-title">Name</p>

                  <p className="information-line-text">{provider.fullName}</p>
                </div>

                <div className="information-line">
                  <p className="information-line-title">Joined</p>

                  <p className="information-line-text">{provider.registrationDate}</p>
                </div>

                <div className="information-line">
                  <p className="information-line-title">City</p>

                  <p className="information-line-text">{provider.cityName}</p>
                </div>

                <div className="information-line">
                  <p className="information-line-title">Country</p>

                  <p className="information-line-text">{provider.countryCode}</p>
                </div>

                <div className="information-line">
                  <p className="information-line-title">Age</p>

                  <p className="information-line-text">[ADDD] {provider.birthDate}</p>
                </div>

                {provider.occupation && (
                  <div className="information-line">
                    <p className="information-line-title">Occupation</p>

                    <p className="information-line-text">{provider.occupation?.name}</p>
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
                {provider.userInterest &&
                  provider.userInterest?.length > 0 &&
                  provider.userInterest?.map((interest: UserInterestType) => {
                    return (
                      <div key={interest.id} className="information-block">
                        <p className="information-block-title">{interest.name}</p>

                        <p className="information-block-text">{interest.description}</p>
                      </div>
                    )
                  })}

                {provider.userInterest && provider.userInterest?.length === 0 && (
                  <Alert alertType="PRIMARY" message={noInterests} style={{ width: '100%' }} />
                )}
              </div>
            </div>
          </div>

          <div className="widget-box">
            <p className="widget-box-title">Timeline</p>

            <div className="widget-box-content">
              <div className="timeline-information-list">
                {provider.userTimeLine &&
                  provider.userTimeLine?.length > 0 &&
                  provider.userTimeLine?.map((event: UserTimeLineType) => {
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

                {provider.userTimeLine && provider.userTimeLine?.length === 0 && (
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
