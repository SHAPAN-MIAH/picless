import React, { FunctionComponent } from 'react'
import { useParams } from 'react-router-dom'

import LayoutMain from '../LayoutMain/LayoutMain'
import UserHeader from './Header/UserHeader'
import SectionMenu from './SectionMenu/SectionMenu'

const UserProfile: FunctionComponent<{}> = () => {
  const { username } = useParams<{ username: string }>()

  return (
    <>
      <LayoutMain>
        <div className="content-grid">
          <UserHeader userName={username} />

          <SectionMenu />

          <div className="grid">
            <div className="grid-column">
              <div className="widget-box">
                <div className="widget-box-settings">
                  <div className="post-settings-wrap">
                    <div className="post-settings widget-box-post-settings-dropdown-trigger">
                      <svg className="post-settings-icon icon-more-dots">
                        <use xlinkHref="#svg-more-dots" />
                      </svg>
                    </div>

                    <div className="simple-dropdown widget-box-post-settings-dropdown">
                      <p className="simple-dropdown-link">Widget Settings</p>
                    </div>
                  </div>
                </div>

                <p className="widget-box-title">Interests</p>

                <div className="widget-box-content">
                  <div className="information-block-list">
                    <div className="information-block">
                      <p className="information-block-title">Favourite TV Shows</p>

                      <p className="information-block-text">
                        Breaking Good, RedDevil, People of Interest, The Running Dead, Found, American Guy, The Last
                        Windbender, Game of Wars.
                      </p>
                    </div>

                    <div className="information-block">
                      <p className="information-block-title">Favourite Music Bands / Artists</p>

                      <p className="information-block-text">
                        Iron Maid, DC/AC, Megablow, Kung Fighters, System of a Revenge, Rammstown.
                      </p>
                    </div>

                    <div className="information-block">
                      <p className="information-block-title">Favourite Movies</p>

                      <p className="information-block-text">
                        The Revengers Saga, The Scarred Wizard and the Fire Crown, Crime Squad, Metal Man, The Dark Rider,
                        Watchers, The Impossible Heist.
                      </p>
                    </div>

                    <div className="information-block">
                      <p className="information-block-title">Favourite Books</p>

                      <p className="information-block-text">
                        The Crime of the Century, Egiptian Mythology 101, The Scarred Wizard, Lord of the Wings, Amongst
                        Gods, The Oracle, A Tale of Air and Water.
                      </p>
                    </div>

                    <div className="information-block">
                      <p className="information-block-title">Favourite Games</p>

                      <p className="information-block-text">
                        The First of Us, Assassin’s Squad, Dark Assylum, NMAK16, Last Cause 4, Grand Snatch Auto.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="widget-box">
                <div className="widget-box-settings">
                  <div className="post-settings-wrap">
                    <div className="post-settings widget-box-post-settings-dropdown-trigger">
                      <svg className="post-settings-icon icon-more-dots">
                        <use xlinkHref="#svg-more-dots" />
                      </svg>
                    </div>

                    <div className="simple-dropdown widget-box-post-settings-dropdown">
                      <p className="simple-dropdown-link">Widget Settings</p>
                    </div>
                  </div>
                </div>

                <p className="widget-box-title">Jobs &amp; Education</p>

                <div className="widget-box-content">
                  <div className="timeline-information-list">
                    <div className="timeline-information">
                      <p className="timeline-information-title">Lead Costume Designer</p>

                      <p className="timeline-information-date">2015 - NOW</p>

                      <p className="timeline-information-text">
                        Lead Costume Designer for the "Amazzo Costumes" agency. I'm in charge of a ten person group,
                        overseeing all the proyects and talking to potential clients. I also handle some face to face
                        interviews for new candidates.
                      </p>
                    </div>

                    <div className="timeline-information">
                      <p className="timeline-information-title">Costume Designer</p>

                      <p className="timeline-information-date">2013 - 2015</p>

                      <p className="timeline-information-text">
                        {/* Costume Designer for the "Jenny Taylors" agency. Was in charge of working side by side with the best */}
                        designers in order to complete and perfect orders.
                      </p>
                    </div>

                    <div className="timeline-information">
                      <p className="timeline-information-title">Designer Intern</p>

                      <p className="timeline-information-date">2012 - 2013</p>

                      <p className="timeline-information-text">
                        {/* Intern for the "Jenny Taylors" agency. Was in charge of the communication with the clients and */}
                        day-to-day chores.
                      </p>
                    </div>

                    <div className="timeline-information">
                      <p className="timeline-information-title">The Antique College of Design</p>

                      <p className="timeline-information-date">2007 - 2012</p>

                      <p className="timeline-information-text">
                        Bachelor of Costume Design in the Antique College. It was a five years intensive career, plus a
                        course about Cosplays. Average: A+
                      </p>
                    </div>
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

export default UserProfile
