import React, { FunctionComponent } from 'react'

const Header: FunctionComponent<{}> = () => {
  return (
    <>
      <header className="header">
        <div className="header-actions">
          <div className="header-brand">
            <div className="logo">
              <svg className="icon-logo-vikinger small">
                <use xlinkHref="#svg-logo-vikinger" />
              </svg>
            </div>

            <h1 className="header-brand-text">Vikinger</h1>
          </div>
        </div>

        <div className="header-actions">
          <div className="sidemenu-trigger navigation-widget-trigger">
            <svg className="icon-grid">
              <use xlinkHref="#svg-grid" />
            </svg>
          </div>

          <div className="mobilemenu-trigger navigation-widget-mobile-trigger">
            <div className="burger-icon inverted">
              <div className="burger-icon-bar" />

              <div className="burger-icon-bar" />

              <div className="burger-icon-bar" />
            </div>
          </div>

          <nav className="navigation">
            <ul className="menu-main">
              <li className="menu-main-item">
                <a className="menu-main-item-link" href="#/">
                  Home
                </a>
              </li>

              <li className="menu-main-item">
                <a className="menu-main-item-link" href="#/">
                  Careers
                </a>
              </li>

              <li className="menu-main-item">
                <a className="menu-main-item-link" href="#/">
                  Faqs
                </a>
              </li>

              <li className="menu-main-item">
                <p className="menu-main-item-link">
                  <svg className="icon-dots">
                    <use xlinkHref="#svg-dots" />
                  </svg>
                </p>

                <ul className="menu-main">
                  <li className="menu-main-item">
                    <a className="menu-main-item-link" href="#/">
                      About Us
                    </a>
                  </li>

                  <li className="menu-main-item">
                    <a className="menu-main-item-link" href="#/">
                      Our Blog
                    </a>
                  </li>

                  <li className="menu-main-item">
                    <a className="menu-main-item-link" href="#/">
                      Contact Us
                    </a>
                  </li>

                  <li className="menu-main-item">
                    <a className="menu-main-item-link" href="#/">
                      Privacy Policy
                    </a>
                  </li>
                </ul>
              </li>
            </ul>
          </nav>
        </div>

        <div className="header-actions search-bar">
          <div className="interactive-input dark">
            <input type="text" id="search-main" name="search_main" placeholder="Search here for people or groups" />

            <div className="interactive-input-icon-wrap">
              <svg className="interactive-input-icon icon-magnifying-glass">
                <use xlinkHref="#svg-magnifying-glass" />
              </svg>
            </div>

            <div className="interactive-input-action">
              <svg className="interactive-input-action-icon icon-cross-thin">
                <use xlinkHref="#svg-cross-thin" />
              </svg>
            </div>
          </div>

          <div className="dropdown-box padding-bottom-small header-search-dropdown">
            <div className="dropdown-box-category">
              <p className="dropdown-box-category-title">Members</p>
            </div>

            <div className="dropdown-box-list small no-scroll">
              <a className="dropdown-box-list-item" href="profile-timeline.html">
                <div className="user-status notification">
                  <div className="user-status-avatar">
                    <div className="user-avatar small no-outline">
                      <div className="user-avatar-content">
                        <div className="hexagon-image-30-32" data-src="img/avatar/05.jpg" />
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

                        <p className="user-avatar-badge-text">12</p>
                      </div>
                    </div>
                  </div>

                  <p className="user-status-title">
                    <span className="bold">Neko Bebop</span>
                  </p>

                  <p className="user-status-text">1 friends in common</p>

                  <div className="user-status-icon">
                    <svg className="icon-friend">
                      <use xlinkHref="#svg-friend" />
                    </svg>
                  </div>
                </div>
              </a>

              <a className="dropdown-box-list-item" href="profile-timeline.html">
                <div className="user-status notification">
                  <div className="user-status-avatar">
                    <div className="user-avatar small no-outline">
                      <div className="user-avatar-content">
                        <div className="hexagon-image-30-32" data-src="img/avatar/15.jpg" />
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

                        <p className="user-avatar-badge-text">7</p>
                      </div>
                    </div>
                  </div>

                  <p className="user-status-title">
                    <span className="bold">Tim Rogers</span>
                  </p>

                  <p className="user-status-text">4 friends in common</p>

                  <div className="user-status-icon">
                    <svg className="icon-friend">
                      <use xlinkHref="#svg-friend" />
                    </svg>
                  </div>
                </div>
              </a>
            </div>

            <div className="dropdown-box-category">
              <p className="dropdown-box-category-title">Groups</p>
            </div>

            <div className="dropdown-box-list small no-scroll">
              <a className="dropdown-box-list-item" href="group-timeline.html">
                <div className="user-status notification">
                  <div className="user-status-avatar">
                    <div className="user-avatar small no-border">
                      <div className="user-avatar-content">
                        <div className="hexagon-image-40-44" data-src="img/avatar/24.jpg" />
                      </div>
                    </div>
                  </div>

                  <p className="user-status-title">
                    <span className="bold">Cosplayers of the World</span>
                  </p>

                  <p className="user-status-text">139 members</p>

                  <div className="user-status-icon">
                    <svg className="icon-group">
                      <use xlinkHref="#svg-group" />
                    </svg>
                  </div>
                </div>
              </a>
            </div>

            <div className="dropdown-box-category">
              <p className="dropdown-box-category-title">Marketplace</p>
            </div>

            <div className="dropdown-box-list small no-scroll">
              <a className="dropdown-box-list-item" href="marketplace-product.html">
                <div className="user-status no-padding-top">
                  <div className="user-status-avatar">
                    <figure className="picture small round liquid">
                      <img src={`${process.env.PUBLIC_URL}/assets/img/marketplace/items/07.jpg`} alt="item-07" />
                    </figure>
                  </div>

                  <p className="user-status-title">
                    <span className="bold">Mercenaries White Frame</span>
                  </p>

                  <p className="user-status-text">By Neko Bebop</p>

                  <div className="user-status-icon">
                    <svg className="icon-marketplace">
                      <use xlinkHref="#svg-marketplace" />
                    </svg>
                  </div>
                </div>
              </a>
            </div>
          </div>
        </div>

        <div className="header-actions">
          <div className="progress-stat">
            <div className="bar-progress-wrap">
              <p className="bar-progress-info">
                Next: <span className="bar-progress-text" />
              </p>
            </div>

            <div id="logged-user-level" className="progress-stat-bar" />
          </div>
        </div>

        <div className="header-actions">
          <div className="action-list dark">
            <div className="action-list-item-wrap">
              <div className="action-list-item header-dropdown-trigger">
                <svg className="action-list-item-icon icon-shopping-bag">
                  <use xlinkHref="#svg-shopping-bag" />
                </svg>
              </div>

              <div className="dropdown-box no-padding-bottom header-dropdown">
                <div className="dropdown-box-header">
                  <p className="dropdown-box-header-title">
                    Shopping Cart <span className="highlighted">3</span>
                  </p>
                </div>

                <div className="dropdown-box-list scroll-small no-hover" data-simplebar>
                  <div className="dropdown-box-list-item">
                    <div className="cart-item-preview">
                      <a className="cart-item-preview-image" href="marketplace-product.html">
                        <figure className="picture medium round liquid">
                          <img src={`${process.env.PUBLIC_URL}/assets/img/marketplace/items/01.jpg`} alt="item-01" />
                        </figure>
                      </a>

                      <p className="cart-item-preview-title">
                        <a href="marketplace-product.html">Twitch Stream UI Pack</a>
                      </p>

                      <p className="cart-item-preview-text">Regular License</p>

                      <p className="cart-item-preview-price">
                        <span className="highlighted">$</span> 12.00 x 1
                      </p>

                      <div className="cart-item-preview-action">
                        <svg className="icon-delete">
                          <use xlinkHref="#svg-delete" />
                        </svg>
                      </div>
                    </div>
                  </div>

                  <div className="dropdown-box-list-item">
                    <div className="cart-item-preview">
                      <a className="cart-item-preview-image" href="marketplace-product.html">
                        <figure className="picture medium round liquid">
                          <img src={`${process.env.PUBLIC_URL}/assets/img/marketplace/items/11.jpg`} alt="item-11" />
                        </figure>
                      </a>

                      <p className="cart-item-preview-title">
                        <a href="marketplace-product.html">Gaming Coin Badges Pack</a>
                      </p>

                      <p className="cart-item-preview-text">Regular License</p>

                      <p className="cart-item-preview-price">
                        <span className="highlighted">$</span> 6.00 x 1
                      </p>

                      <div className="cart-item-preview-action">
                        <svg className="icon-delete">
                          <use xlinkHref="#svg-delete" />
                        </svg>
                      </div>
                    </div>
                  </div>

                  <div className="dropdown-box-list-item">
                    <div className="cart-item-preview">
                      <a className="cart-item-preview-image" href="marketplace-product.html">
                        <figure className="picture medium round liquid">
                          <img src={`${process.env.PUBLIC_URL}/assets/img/marketplace/items/10.jpg`} alt="item-10" />
                        </figure>
                      </a>

                      <p className="cart-item-preview-title">
                        <a href="marketplace-product.html">Twitch Stream UI Pack</a>
                      </p>

                      <p className="cart-item-preview-text">Regular License</p>

                      <p className="cart-item-preview-price">
                        <span className="highlighted">$</span> 26.00 x 1
                      </p>

                      <div className="cart-item-preview-action">
                        <svg className="icon-delete">
                          <use xlinkHref="#svg-delete" />
                        </svg>
                      </div>
                    </div>
                  </div>

                  <div className="dropdown-box-list-item">
                    <div className="cart-item-preview">
                      <a className="cart-item-preview-image" href="marketplace-product.html">
                        <figure className="picture medium round liquid">
                          <img src={`${process.env.PUBLIC_URL}/assets/img/marketplace/items/04.jpg`} alt="item-04" />
                        </figure>
                      </a>

                      <p className="cart-item-preview-title">
                        <a href="marketplace-product.html">Generic Joystick Pack</a>
                      </p>

                      <p className="cart-item-preview-text">Regular License</p>

                      <p className="cart-item-preview-price">
                        <span className="highlighted">$</span> 16.00 x 1
                      </p>

                      <div className="cart-item-preview-action">
                        <svg className="icon-delete">
                          <use xlinkHref="#svg-delete" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="cart-preview-total">
                  <p className="cart-preview-total-title">Total:</p>

                  <p className="cart-preview-total-text">
                    <span className="highlighted">$</span> 60.00
                  </p>
                </div>

                <div className="dropdown-box-actions">
                  <div className="dropdown-box-action">
                    <a className="button secondary" href="marketplace-cart.html">
                      Shopping Cart
                    </a>
                  </div>

                  <div className="dropdown-box-action">
                    <a className="button primary" href="marketplace-checkout.html">
                      Go to Checkout
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className="action-list-item-wrap">
              <div className="action-list-item header-dropdown-trigger">
                <svg className="action-list-item-icon icon-friend">
                  <use xlinkHref="#svg-friend" />
                </svg>
              </div>

              <div className="dropdown-box header-dropdown">
                <div className="dropdown-box-header">
                  <p className="dropdown-box-header-title">Friend Requests</p>

                  <div className="dropdown-box-header-actions">
                    <p className="dropdown-box-header-action">Find Friends</p>

                    <p className="dropdown-box-header-action">Settings</p>
                  </div>
                </div>

                <div className="dropdown-box-list no-hover" data-simplebar>
                  <div className="dropdown-box-list-item">
                    <div className="user-status request">
                      <a className="user-status-avatar" href="profile-timeline.html">
                        <div className="user-avatar small no-outline">
                          <div className="user-avatar-content">
                            <div className="hexagon-image-30-32" data-src="img/avatar/16.jpg" />
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

                            <p className="user-avatar-badge-text">14</p>
                          </div>
                        </div>
                      </a>

                      <p className="user-status-title">
                        <a className="bold" href="profile-timeline.html">
                          Ginny Danvers
                        </a>
                      </p>

                      <p className="user-status-text">6 friends in common</p>

                      <div className="action-request-list">
                        <div className="action-request accept">
                          <svg className="action-request-icon icon-add-friend">
                            <use xlinkHref="#svg-add-friend" />
                          </svg>
                        </div>

                        <div className="action-request decline">
                          <svg className="action-request-icon icon-remove-friend">
                            <use xlinkHref="#svg-remove-friend" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="dropdown-box-list-item">
                    <div className="user-status request">
                      <a className="user-status-avatar" href="profile-timeline.html">
                        <div className="user-avatar small no-outline">
                          <div className="user-avatar-content">
                            <div className="hexagon-image-30-32" data-src="img/avatar/14.jpg" />
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

                            <p className="user-avatar-badge-text">3</p>
                          </div>
                        </div>
                      </a>

                      <p className="user-status-title">
                        <a className="bold" href="profile-timeline.html">
                          Paul Lang
                        </a>
                      </p>

                      <p className="user-status-text">2 friends in common</p>

                      <div className="action-request-list">
                        <div className="action-request accept">
                          <svg className="action-request-icon icon-add-friend">
                            <use xlinkHref="#svg-add-friend" />
                          </svg>
                        </div>

                        <div className="action-request decline">
                          <svg className="action-request-icon icon-remove-friend">
                            <use xlinkHref="#svg-remove-friend" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="dropdown-box-list-item">
                    <div className="user-status request">
                      <a className="user-status-avatar" href="profile-timeline.html">
                        <div className="user-avatar small no-outline">
                          <div className="user-avatar-content">
                            <div className="hexagon-image-30-32" data-src="img/avatar/11.jpg" />
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

                            <p className="user-avatar-badge-text">9</p>
                          </div>
                        </div>
                      </a>

                      <p className="user-status-title">
                        <a className="bold" href="profile-timeline.html">
                          Cassie May
                        </a>
                      </p>

                      <p className="user-status-text">4 friends in common</p>

                      <div className="action-request-list">
                        <div className="action-request accept">
                          <svg className="action-request-icon icon-add-friend">
                            <use xlinkHref="#svg-add-friend" />
                          </svg>
                        </div>

                        <div className="action-request decline">
                          <svg className="action-request-icon icon-remove-friend">
                            <use xlinkHref="#svg-remove-friend" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <a className="dropdown-box-button secondary" href="hub-profile-requests.html">
                  View all Requests
                </a>
              </div>
            </div>

            <div className="action-list-item-wrap">
              <div className="action-list-item header-dropdown-trigger">
                <svg className="action-list-item-icon icon-messages">
                  <use xlinkHref="#svg-messages" />
                </svg>
              </div>

              <div className="dropdown-box header-dropdown">
                <div className="dropdown-box-header">
                  <p className="dropdown-box-header-title">Messages</p>

                  <div className="dropdown-box-header-actions">
                    <p className="dropdown-box-header-action">Mark all as Read</p>

                    <p className="dropdown-box-header-action">Settings</p>
                  </div>
                </div>

                <div className="dropdown-box-list medium" data-simplebar>
                  <a className="dropdown-box-list-item" href="hub-profile-messages.html">
                    <div className="user-status">
                      <div className="user-status-avatar">
                        <div className="user-avatar small no-outline">
                          <div className="user-avatar-content">
                            <div className="hexagon-image-30-32" data-src="img/avatar/04.jpg" />
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

                            <p className="user-avatar-badge-text">6</p>
                          </div>
                        </div>
                      </div>

                      <p className="user-status-title">
                        <span className="bold">Bearded Wonder</span>
                      </p>

                      <p className="user-status-text">Great! Then will meet with them at the party...</p>

                      <p className="user-status-timestamp floaty">29 mins ago</p>
                    </div>
                  </a>

                  <a className="dropdown-box-list-item" href="hub-profile-messages.html">
                    <div className="user-status">
                      <div className="user-status-avatar">
                        <div className="user-avatar small no-outline">
                          <div className="user-avatar-content">
                            <div className="hexagon-image-30-32" data-src="img/avatar/05.jpg" />
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

                            <p className="user-avatar-badge-text">12</p>
                          </div>
                        </div>
                      </div>

                      <p className="user-status-title">
                        <span className="bold">Neko Bebop</span>
                      </p>

                      <p className="user-status-text">Awesome! I&apos;ll see you there!</p>

                      <p className="user-status-timestamp floaty">54 mins ago</p>
                    </div>
                  </a>

                  <a className="dropdown-box-list-item" href="hub-profile-messages.html">
                    <div className="user-status">
                      <div className="user-status-avatar">
                        <div className="user-avatar small no-outline">
                          <div className="user-avatar-content">
                            <div className="hexagon-image-30-32" data-src="img/avatar/03.jpg" />
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

                            <p className="user-avatar-badge-text">16</p>
                          </div>
                        </div>
                      </div>

                      <p className="user-status-title">
                        <span className="bold">Nick Grissom</span>
                      </p>

                      <p className="user-status-text">Can you stream that new game?</p>

                      <p className="user-status-timestamp floaty">2 hours ago</p>
                    </div>
                  </a>

                  <a className="dropdown-box-list-item" href="hub-profile-messages.html">
                    <div className="user-status">
                      <div className="user-status-avatar">
                        <div className="user-avatar small no-outline">
                          <div className="user-avatar-content">
                            <div className="hexagon-image-30-32" data-src="img/avatar/07.jpg" />
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

                            <p className="user-avatar-badge-text">26</p>
                          </div>
                        </div>
                      </div>

                      <p className="user-status-title">
                        <span className="bold">Sarah Diamond</span>
                      </p>

                      <p className="user-status-text">I&apos;m sending you the latest news of the release...</p>

                      <p className="user-status-timestamp floaty">16 hours ago</p>
                    </div>
                  </a>

                  <a className="dropdown-box-list-item" href="hub-profile-messages.html">
                    <div className="user-status">
                      <div className="user-status-avatar">
                        <div className="user-avatar small no-outline">
                          <div className="user-avatar-content">
                            <div className="hexagon-image-30-32" data-src="img/avatar/12.jpg" />
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

                            <p className="user-avatar-badge-text">10</p>
                          </div>
                        </div>
                      </div>

                      <p className="user-status-title">
                        <span className="bold">James Murdock</span>
                      </p>

                      <p className="user-status-text">Great! Then will meet with them at the party...</p>

                      <p className="user-status-timestamp floaty">7 days ago</p>
                    </div>
                  </a>

                  <a className="dropdown-box-list-item" href="hub-profile-messages.html">
                    <div className="user-status">
                      <div className="user-status-avatar">
                        <div className="user-avatar small no-outline">
                          <div className="user-avatar-content">
                            <div className="hexagon-image-30-32" data-src="img/avatar/10.jpg" />
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

                            <p className="user-avatar-badge-text">5</p>
                          </div>
                        </div>
                      </div>

                      <p className="user-status-title">
                        <span className="bold">The Green Goo</span>
                      </p>

                      <p className="user-status-text">Can you stream that new game?</p>

                      <p className="user-status-timestamp floaty">10 days ago</p>
                    </div>
                  </a>
                </div>

                <a className="dropdown-box-button primary" href="hub-profile-messages.html">
                  View all Messages
                </a>
              </div>
            </div>

            <div className="action-list-item-wrap">
              <div className="action-list-item unread header-dropdown-trigger">
                <svg className="action-list-item-icon icon-notification">
                  <use xlinkHref="#svg-notification" />
                </svg>
              </div>

              <div className="dropdown-box header-dropdown">
                <div className="dropdown-box-header">
                  <p className="dropdown-box-header-title">Notifications</p>

                  <div className="dropdown-box-header-actions">
                    <p className="dropdown-box-header-action">Mark all as Read</p>

                    <p className="dropdown-box-header-action">Settings</p>
                  </div>
                </div>

                <div className="dropdown-box-list" data-simplebar>
                  <div className="dropdown-box-list-item unread">
                    <div className="user-status notification">
                      <a className="user-status-avatar" href="profile-timeline.html">
                        <div className="user-avatar small no-outline">
                          <div className="user-avatar-content">
                            <div className="hexagon-image-30-32" data-src="img/avatar/03.jpg" />
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

                            <p className="user-avatar-badge-text">16</p>
                          </div>
                        </div>
                      </a>

                      <p className="user-status-title">
                        <a className="bold" href="profile-timeline.html">
                          Nick Grissom
                        </a>{' '}
                        posted a comment on your{' '}
                        <a className="highlighted" href="profile-timeline.html">
                          status update
                        </a>
                      </p>

                      <p className="user-status-timestamp">2 minutes ago</p>

                      <div className="user-status-icon">
                        <svg className="icon-comment">
                          <use xlinkHref="#svg-comment" />
                        </svg>
                      </div>
                    </div>
                  </div>

                  <div className="dropdown-box-list-item">
                    <div className="user-status notification">
                      <a className="user-status-avatar" href="profile-timeline.html">
                        <div className="user-avatar small no-outline">
                          <div className="user-avatar-content">
                            <div className="hexagon-image-30-32" data-src="img/avatar/07.jpg" />
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

                            <p className="user-avatar-badge-text">26</p>
                          </div>
                        </div>
                      </a>

                      <p className="user-status-title">
                        <a className="bold" href="profile-timeline.html">
                          Sarah Diamond
                        </a>
                        left a like{' '}
                        <img
                          className="reaction"
                          src={`${process.env.PUBLIC_URL}/assets/img/reaction/like.png`}
                          alt="reaction-like"
                        />
                        reaction on your{' '}
                        <a className="highlighted" href="profile-timeline.html">
                          status update
                        </a>
                      </p>

                      <p className="user-status-timestamp">17 minutes ago</p>

                      <div className="user-status-icon">
                        <svg className="icon-thumbs-up">
                          <use xlinkHref="#svg-thumbs-up" />
                        </svg>
                      </div>
                    </div>
                  </div>

                  <div className="dropdown-box-list-item">
                    <div className="user-status notification">
                      <a className="user-status-avatar" href="profile-timeline.html">
                        <div className="user-avatar small no-outline">
                          <div className="user-avatar-content">
                            <div className="hexagon-image-30-32" data-src="img/avatar/02.jpg" />
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

                            <p className="user-avatar-badge-text">13</p>
                          </div>
                        </div>
                      </a>

                      <p className="user-status-title">
                        <a className="bold" href="profile-timeline.html">
                          Destroy Dex
                        </a>{' '}
                        posted a comment on your{' '}
                        <a className="highlighted" href="profile-photos.html">
                          photo
                        </a>
                      </p>

                      <p className="user-status-timestamp">31 minutes ago</p>

                      <div className="user-status-icon">
                        <svg className="icon-comment">
                          <use xlinkHref="#svg-comment" />
                        </svg>
                      </div>
                    </div>
                  </div>

                  <div className="dropdown-box-list-item">
                    <div className="user-status notification">
                      <a className="user-status-avatar" href="profile-timeline.html">
                        <div className="user-avatar small no-outline">
                          <div className="user-avatar-content">
                            <div className="hexagon-image-30-32" data-src="img/avatar/10.jpg" />
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

                            <p className="user-avatar-badge-text">5</p>
                          </div>
                        </div>
                      </a>

                      <p className="user-status-title">
                        <a className="bold" href="profile-timeline.html">
                          The Green Goo
                        </a>{' '}
                        left a love{' '}
                        <img
                          className="reaction"
                          src={`${process.env.PUBLIC_URL}/assets/img/reaction/love.png`}
                          alt="reaction-love"
                        />{' '}
                        reaction on your{' '}
                        <a className="highlighted" href="profile-timeline.html">
                          status update
                        </a>
                      </p>

                      <p className="user-status-timestamp">2 hours ago</p>

                      <div className="user-status-icon">
                        <svg className="icon-thumbs-up">
                          <use xlinkHref="#svg-thumbs-up" />
                        </svg>
                      </div>
                    </div>
                  </div>

                  <div className="dropdown-box-list-item">
                    <div className="user-status notification">
                      <a className="user-status-avatar" href="profile-timeline.html">
                        <div className="user-avatar small no-outline">
                          <div className="user-avatar-content">
                            <div className="hexagon-image-30-32" data-src="img/avatar/05.jpg" />
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

                            <p className="user-avatar-badge-text">12</p>
                          </div>
                        </div>
                      </a>

                      <p className="user-status-title">
                        <a className="bold" href="profile-timeline.html">
                          Neko Bebop
                        </a>{' '}
                        posted a comment on your{' '}
                        <a className="highlighted" href="profile-timeline.html">
                          status update
                        </a>
                      </p>

                      <p className="user-status-timestamp">3 hours ago</p>

                      <div className="user-status-icon">
                        <svg className="icon-comment">
                          <use xlinkHref="#svg-comment" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>

                <a className="dropdown-box-button secondary" href="hub-profile-notifications.html">
                  View all Notifications
                </a>
              </div>
            </div>
          </div>

          <div className="action-item-wrap">
            <div className="action-item dark header-settings-dropdown-trigger">
              <svg className="action-item-icon icon-settings">
                <use xlinkHref="#svg-settings" />
              </svg>
            </div>

            <div className="dropdown-navigation header-settings-dropdown">
              <div className="dropdown-navigation-header">
                <div className="user-status">
                  <a className="user-status-avatar" href="profile-timeline.html">
                    <div className="user-avatar small no-outline">
                      <div className="user-avatar-content">
                        <div className="hexagon-image-30-32" data-src="img/avatar/01.jpg" />
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
                    </div>
                  </a>

                  <p className="user-status-title">
                    <span className="bold">Hi Marina!</span>
                  </p>

                  <p className="user-status-text small">
                    <a href="profile-timeline.html">@marinavalentine</a>
                  </p>
                </div>
              </div>

              <p className="dropdown-navigation-category">My Profile</p>

              <a className="dropdown-navigation-link" href="hub-profile-info.html">
                Profile Info
              </a>

              <a className="dropdown-navigation-link" href="hub-profile-social.html">
                Social &amp; Stream
              </a>

              <a className="dropdown-navigation-link" href="hub-profile-notifications.html">
                Notifications
              </a>

              <a className="dropdown-navigation-link" href="hub-profile-messages.html">
                Messages
              </a>

              <a className="dropdown-navigation-link" href="hub-profile-requests.html">
                Friend Requests
              </a>

              <p className="dropdown-navigation-category">Account</p>

              <a className="dropdown-navigation-link" href="hub-account-info.html">
                Account Info
              </a>

              <a className="dropdown-navigation-link" href="hub-account-password.html">
                Change Password
              </a>

              <a className="dropdown-navigation-link" href="hub-account-settings.html">
                General Settings
              </a>

              <p className="dropdown-navigation-category">Groups</p>

              <a className="dropdown-navigation-link" href="hub-group-management.html">
                Manage Groups
              </a>

              <a className="dropdown-navigation-link" href="hub-group-invitations.html">
                Invitations
              </a>

              <p className="dropdown-navigation-category">My Store</p>

              <a className="dropdown-navigation-link" href="hub-store-account.html">
                My Account <span className="highlighted">$250,32</span>
              </a>

              <a className="dropdown-navigation-link" href="hub-store-statement.html">
                Sales Statement
              </a>

              <a className="dropdown-navigation-link" href="hub-store-items.html">
                Manage Items
              </a>

              <a className="dropdown-navigation-link" href="hub-store-downloads.html">
                Downloads
              </a>

              <p className="dropdown-navigation-button button small secondary">Logout</p>
            </div>
          </div>
        </div>
      </header>
    </>
  )
}

export default Header
