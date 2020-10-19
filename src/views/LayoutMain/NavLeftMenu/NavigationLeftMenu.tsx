import React, { FunctionComponent } from 'react'

const NavigationLeftMenu: FunctionComponent<{}> = () => {
  return (
    <>
      {/* SMALL MENU */}
      <nav id="navigation-widget-small" className="navigation-widget navigation-widget-desktop closed sidebar left delayed">
        <a className="user-avatar small no-outline online" href="profile-timeline.html">
          <div className="user-avatar-content">
            <div className="hexagon-image-30-32" data-src={`${process.env.PUBLIC_URL}/assets/img/avatar/01.jpg`} />
          </div>

          <div className="user-avatar-progress">
            <div className="hexagon-progress-40-44" />
          </div>

          <div className="user-avatar-progress-border">
            <div className="hexagon-border-40-44" />
          </div>

          <div className="user-avatar-badge">
            <div className="user-avatar-badge-border">
              <div className="hexagon-22-24" />
            </div>

            <div className="user-avatar-badge-content">
              <div className="hexagon-dark-16-18" />
            </div>

            <p className="user-avatar-badge-text">24</p>
          </div>
        </a>

        <ul className="menu small">
          <li className="menu-item">
            <a className="menu-item-link text-tooltip-tfr" href="newsfeed.html" data-title="Newsfeed">
              <svg className="menu-item-link-icon icon-newsfeed">
                <use xlinkHref="#svg-newsfeed" />
              </svg>
            </a>
          </li>

          <li className="menu-item">
            <a className="menu-item-link text-tooltip-tfr" href="overview.html" data-title="Overview">
              <svg className="menu-item-link-icon icon-overview">
                <use xlinkHref="#svg-overview" />
              </svg>
            </a>
          </li>

          <li className="menu-item">
            <a className="menu-item-link text-tooltip-tfr" href="groups.html" data-title="Groups">
              <svg className="menu-item-link-icon icon-group">
                <use xlinkHref="#svg-group" />
              </svg>
            </a>
          </li>

          <li className="menu-item">
            <a className="menu-item-link text-tooltip-tfr" href="members.html" data-title="Members">
              <svg className="menu-item-link-icon icon-members">
                <use xlinkHref="#svg-members" />
              </svg>
            </a>
          </li>

          <li className="menu-item">
            <a className="menu-item-link text-tooltip-tfr" href="badges.html" data-title="Badges">
              <svg className="menu-item-link-icon icon-badges">
                <use xlinkHref="#svg-badges" />
              </svg>
            </a>
          </li>

          <li className="menu-item">
            <a className="menu-item-link text-tooltip-tfr" href="quests.html" data-title="Quests">
              <svg className="menu-item-link-icon icon-quests">
                <use xlinkHref="#svg-quests" />
              </svg>
            </a>
          </li>

          <li className="menu-item">
            <a className="menu-item-link text-tooltip-tfr" href="streams.html" data-title="Streams">
              <svg className="menu-item-link-icon icon-streams">
                <use xlinkHref="#svg-streams" />
              </svg>
            </a>
          </li>

          <li className="menu-item">
            <a className="menu-item-link text-tooltip-tfr" href="events.html" data-title="Events">
              <svg className="menu-item-link-icon icon-events">
                <use xlinkHref="#svg-events" />
              </svg>
            </a>
          </li>

          <li className="menu-item">
            <a className="menu-item-link text-tooltip-tfr" href="forums.html" data-title="Forums">
              <svg className="menu-item-link-icon icon-forums">
                <use xlinkHref="#svg-forums" />
              </svg>
            </a>
          </li>

          <li className="menu-item">
            <a className="menu-item-link text-tooltip-tfr" href="marketplace.html" data-title="Marketplace">
              <svg className="menu-item-link-icon icon-marketplace">
                <use xlinkHref="#svg-marketplace" />
              </svg>
            </a>
          </li>
        </ul>
      </nav>

      <nav id="navigation-widget" className="navigation-widget navigation-widget-desktop sidebar left hidden" data-simplebar>
        <figure className="navigation-widget-cover liquid">
          <img src={`${process.env.PUBLIC_URL}/assets/img/cover/01.jpg`} alt="cover-01" />
        </figure>

        <div className="user-short-description">
          <a className="user-short-description-avatar user-avatar medium" href="profile-timeline.html">
            <div className="user-avatar-border">
              <div className="hexagon-120-132" />
            </div>

            <div className="user-avatar-content">
              <div className="hexagon-image-82-90" data-src={`${process.env.PUBLIC_URL}/assets/img/avatar/01.jpg`} />
            </div>

            <div className="user-avatar-progress">
              <div className="hexagon-progress-100-110" />
            </div>

            <div className="user-avatar-progress-border">
              <div className="hexagon-border-100-110" />
            </div>

            <div className="user-avatar-badge">
              <div className="user-avatar-badge-border">
                <div className="hexagon-32-36" />
              </div>

              <div className="user-avatar-badge-content">
                <div className="hexagon-dark-26-28" />
              </div>

              <p className="user-avatar-badge-text">24</p>
            </div>
          </a>

          <p className="user-short-description-title">
            <a href="profile-timeline.html">Marina Valentine</a>
          </p>

          <p className="user-short-description-text">
            <a href="#/">www.gamehuntress.com</a>
          </p>
        </div>

        <div className="badge-list small">
          <div className="badge-item">
            <img src={`${process.env.PUBLIC_URL}/assets/img/badge/gold-s.png`} alt="badge-gold-s" />
          </div>

          <div className="badge-item">
            <img src={`${process.env.PUBLIC_URL}/assets/img/badge/age-s.png`} alt="badge-age-s" />
          </div>

          <div className="badge-item">
            <img src={`${process.env.PUBLIC_URL}/assets/img/badge/caffeinated-s.png`} alt="badge-caffeinated-s" />
          </div>

          <div className="badge-item">
            <img src={`${process.env.PUBLIC_URL}/assets/img/badge/warrior-s.png`} alt="badge-warrior-s" />
          </div>

          <a className="badge-item" href="profile-badges.html">
            <img src={`${process.env.PUBLIC_URL}/assets/img/badge/blank-s.png`} alt="badge-blank-s" />

            <p className="badge-item-text">+9</p>
          </a>
        </div>

        <div className="user-stats">
          <div className="user-stat">
            <p className="user-stat-title">930</p>

            <p className="user-stat-text">posts</p>
          </div>

          <div className="user-stat">
            <p className="user-stat-title">82</p>

            <p className="user-stat-text">friends</p>
          </div>

          <div className="user-stat">
            <p className="user-stat-title">5.7k</p>

            <p className="user-stat-text">visits</p>
          </div>
        </div>

        <ul className="menu">
          <li className="menu-item">
            <a className="menu-item-link" href="newsfeed.html">
              <svg className="menu-item-link-icon icon-newsfeed">
                <use xlinkHref="#svg-newsfeed" />
              </svg>
              Newsfeed
            </a>
          </li>

          <li className="menu-item">
            <a className="menu-item-link" href="overview.html">
              <svg className="menu-item-link-icon icon-overview">
                <use xlinkHref="#svg-overview" />
              </svg>
              Overview
            </a>
          </li>

          <li className="menu-item">
            <a className="menu-item-link" href="groups.html">
              <svg className="menu-item-link-icon icon-group">
                <use xlinkHref="#svg-group" />
              </svg>
              Groups
            </a>
          </li>

          <li className="menu-item">
            <a className="menu-item-link" href="members.html">
              <svg className="menu-item-link-icon icon-members">
                <use xlinkHref="#svg-members" />
              </svg>
              Members
            </a>
          </li>

          <li className="menu-item">
            <a className="menu-item-link" href="badges.html">
              <svg className="menu-item-link-icon icon-badges">
                <use xlinkHref="#svg-badges" />
              </svg>
              Badges
            </a>
          </li>

          <li className="menu-item">
            <a className="menu-item-link" href="quests.html">
              <svg className="menu-item-link-icon icon-quests">
                <use xlinkHref="#svg-quests" />
              </svg>
              Quests
            </a>
          </li>

          <li className="menu-item">
            <a className="menu-item-link" href="streams.html">
              <svg className="menu-item-link-icon icon-streams">
                <use xlinkHref="#svg-streams" />
              </svg>
              Streams
            </a>
          </li>

          <li className="menu-item">
            <a className="menu-item-link" href="events.html">
              <svg className="menu-item-link-icon icon-events">
                <use xlinkHref="#svg-events" />
              </svg>
              Events
            </a>
          </li>

          <li className="menu-item">
            <a className="menu-item-link" href="forums.html">
              <svg className="menu-item-link-icon icon-forums">
                <use xlinkHref="#svg-forums" />
              </svg>
              Forums
            </a>
          </li>

          <li className="menu-item">
            <a className="menu-item-link" href="marketplace.html">
              <svg className="menu-item-link-icon icon-marketplace">
                <use xlinkHref="#svg-marketplace" />
              </svg>
              Marketplace
            </a>
          </li>
        </ul>
      </nav>

      {/* MOBILE MENU */}

      <nav
        id="navigation-widget-mobile"
        className="navigation-widget navigation-widget-mobile sidebar left hidden"
        data-simplebar
      >
        <div className="navigation-widget-close-button">
          <svg className="navigation-widget-close-button-icon icon-back-arrow">
            <use xlinkHref="#svg-back-arrow" />
          </svg>
        </div>

        <div className="navigation-widget-info-wrap">
          <div className="navigation-widget-info">
            <a className="user-avatar small no-outline" href="profile-timeline.html">
              <div className="user-avatar-content">
                <div className="hexagon-image-30-32" data-src={`${process.env.PUBLIC_URL}/assets/img/avatar/01.jpg`} />
              </div>

              <div className="user-avatar-progress">
                <div className="hexagon-progress-40-44" />
              </div>

              <div className="user-avatar-progress-border">
                <div className="hexagon-border-40-44" />
              </div>

              <div className="user-avatar-badge">
                <div className="user-avatar-badge-border">
                  <div className="hexagon-22-24" />
                </div>

                <div className="user-avatar-badge-content">
                  <div className="hexagon-dark-16-18" />
                </div>

                <p className="user-avatar-badge-text">24</p>
              </div>
            </a>

            <p className="navigation-widget-info-title">
              <a href="profile-timeline.html">Marina Valentine</a>
            </p>

            <p className="navigation-widget-info-text">Welcome Back!</p>
          </div>

          <p className="navigation-widget-info-button button small secondary">Logout</p>
        </div>

        <p className="navigation-widget-section-title">Sections</p>

        <ul className="menu">
          <li className="menu-item">
            <a className="menu-item-link" href="newsfeed.html">
              <svg className="menu-item-link-icon icon-newsfeed">
                <use xlinkHref="#svg-newsfeed" />
              </svg>
              Newsfeed
            </a>
          </li>

          <li className="menu-item">
            <a className="menu-item-link" href="overview.html">
              <svg className="menu-item-link-icon icon-overview">
                <use xlinkHref="#svg-overview" />
              </svg>
              Overview
            </a>
          </li>

          <li className="menu-item">
            <a className="menu-item-link" href="groups.html">
              <svg className="menu-item-link-icon icon-group">
                <use xlinkHref="#svg-group" />
              </svg>
              Groups
            </a>
          </li>

          <li className="menu-item">
            <a className="menu-item-link" href="members.html">
              <svg className="menu-item-link-icon icon-members">
                <use xlinkHref="#svg-members" />
              </svg>
              Members
            </a>
          </li>

          <li className="menu-item">
            <a className="menu-item-link" href="badges.html">
              <svg className="menu-item-link-icon icon-badges">
                <use xlinkHref="#svg-badges" />
              </svg>
              Badges
            </a>
          </li>

          <li className="menu-item">
            <a className="menu-item-link" href="quests.html">
              <svg className="menu-item-link-icon icon-quests">
                <use xlinkHref="#svg-quests" />
              </svg>
              Quests
            </a>
          </li>

          <li className="menu-item">
            <a className="menu-item-link" href="streams.html">
              <svg className="menu-item-link-icon icon-streams">
                <use xlinkHref="#svg-streams" />
              </svg>
              Streams
            </a>
          </li>

          <li className="menu-item">
            <a className="menu-item-link" href="events.html">
              <svg className="menu-item-link-icon icon-events">
                <use xlinkHref="#svg-events" />
              </svg>
              Events
            </a>
          </li>

          <li className="menu-item">
            <a className="menu-item-link" href="forums.html">
              <svg className="menu-item-link-icon icon-forums">
                <use xlinkHref="#svg-forums" />
              </svg>
              Forums
            </a>
          </li>

          <li className="menu-item">
            <a className="menu-item-link" href="marketplace.html">
              <svg className="menu-item-link-icon icon-marketplace">
                <use xlinkHref="#svg-marketplace" />
              </svg>
              Marketplace
            </a>
          </li>
        </ul>

        <p className="navigation-widget-section-title">My Profile</p>

        <a className="navigation-widget-section-link" href="hub-profile-info.html">
          Profile Info
        </a>

        <a className="navigation-widget-section-link" href="hub-profile-social.html">
          Social &amp; Stream
        </a>

        <a className="navigation-widget-section-link" href="hub-profile-notifications.html">
          Notifications
        </a>

        <a className="navigation-widget-section-link" href="hub-profile-messages.html">
          Messages
        </a>

        <a className="navigation-widget-section-link" href="hub-profile-requests.html">
          Friend Requests
        </a>

        <p className="navigation-widget-section-title">Account</p>

        <a className="navigation-widget-section-link" href="hub-account-info.html">
          Account Info
        </a>

        <a className="navigation-widget-section-link" href="hub-account-password.html">
          Change Password
        </a>

        <a className="navigation-widget-section-link" href="hub-account-settings.html">
          General Settings
        </a>

        <p className="navigation-widget-section-title">Groups</p>

        <a className="navigation-widget-section-link" href="hub-group-management.html">
          Manage Groups
        </a>

        <a className="navigation-widget-section-link" href="hub-group-invitations.html">
          Invitations
        </a>

        <p className="navigation-widget-section-title">My Store</p>

        <a className="navigation-widget-section-link" href="hub-store-account.html">
          My Account <span className="highlighted">$250,32</span>
        </a>

        <a className="navigation-widget-section-link" href="hub-store-statement.html">
          Sales Statement
        </a>

        <a className="navigation-widget-section-link" href="hub-store-items.html">
          Manage Items
        </a>

        <a className="navigation-widget-section-link" href="hub-store-downloads.html">
          Downloads
        </a>

        <p className="navigation-widget-section-title">Main Links</p>

        <a className="navigation-widget-section-link" href="#/">
          Home
        </a>

        <a className="navigation-widget-section-link" href="#/">
          Careers
        </a>

        <a className="navigation-widget-section-link" href="#/">
          Faqs
        </a>

        <a className="navigation-widget-section-link" href="#/">
          About Us
        </a>

        <a className="navigation-widget-section-link" href="#/">
          Our Blog
        </a>

        <a className="navigation-widget-section-link" href="#/">
          Contact Us
        </a>

        <a className="navigation-widget-section-link" href="#/">
          Privacy Policy
        </a>
      </nav>
    </>
  )
}

export default NavigationLeftMenu
