import moment from 'moment'
import React, { useContext, useEffect } from 'react'
import Alert from '../../Common/Alerts/Alerts'
import ProviderProfileContext from '../../../context/ProviderProfileContext'
import { UserInterestType, UserTimeLineType } from '../../../types/UserType'
import { GetCountryName } from '../../../utils/Functions'


const noInterests = 'The user has not yet added interests.'
const noTimeLineEvents = 'The user has not yet added events to the timeline.'


const About: React.FunctionComponent<{}> = () => {
    const { provider } = useContext(ProviderProfileContext.context)

    const age = moment().diff(provider.birthDate, 'years', false)
    const countryName = GetCountryName(provider.countryCode || '')


    return (
        <div style={{ paddingTop: "15vh", width: '70%', margin: 'auto', }}>
            {/* <h1>this is the about page</h1> */}
            <div className="grid grid-3-9 mobile-prefer-content">
                <div className="grid-column">
                    <div className="widget-box">
                        <p className="widget-box-title">About Me</p>

                        <div className="widget-box-content">
                            <p className="paragraph">{provider.profileDescription}</p>

                            <div className="information-line-list">
                                {provider.fullName && (
                                    <div className="information-line">
                                        <p className="information-line-title">Name</p>

                                        <p className="information-line-text">{provider.fullName}</p>
                                    </div>
                                )}

                                <div className="information-line">
                                    <p className="information-line-title">Joined</p>

                                    <p className="information-line-text">{moment(provider.registrationDate).format('YYYY-MM')}</p>
                                </div>

                                {provider.cityName && (
                                    <div className="information-line">
                                        <p className="information-line-title">City</p>

                                        <p className="information-line-text">{provider.cityName}</p>
                                    </div>
                                )}

                                {provider.countryCode && (
                                    <div className="information-line">
                                        <p className="information-line-title">Country</p>

                                        <p className="information-line-text">{countryName}</p>
                                    </div>
                                )}

                                {age > 1 && (
                                    <div className="information-line">
                                        <p className="information-line-title">Age</p>

                                        <p className="information-line-text">{age}</p>
                                    </div>
                                )}

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

                                                <p className="timeline-information-text">{event.description}</p>
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
        </div>
    );
};

export default About;