import classNames from 'classnames'
import React, { FunctionComponent, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import Fade from 'react-reveal/Fade'

import UserAvatar from '../../../../components/UserAvatar'
import useAuth from '../../../../hooks/useAuth'
import useMenu from '../../../../hooks/useMenu'
import useRouter from '../../../../hooks/commons/useRouter'
import useUser from '../../../../hooks/useUser'
import MenuRoutes from '../../../../routes/MenuRoutes'
import { UserType } from '../../../../types/UserType'

const AvatarContainerDiv = styled.div`
  position: relative;
  left: 50%;
  margin-left: -49px;
  width: 50%;
`

const MobileMenu: FunctionComponent<{}> = () => {
  const { t } = useTranslation()

  const { showMenu, setShowMenu } = useMenu()
  const route = useRouter()
  const { signOut } = useAuth()
  const { user } = useUser()

  const handleCloseMenu = () => {
    setShowMenu(false)
  }

  return (
    <>
      <Fade duration={400} right when={showMenu}>
        <nav
          id="navigation-widget-mobile"
          className={classNames('navigation-widget navigation-widget-mobile sidebar right', showMenu ? 'visible' : 'hidden')}
          data-simplebar
          style={{ paddingBottom: '20%' }}
        >
          <div className="navigation-widget-close-button" onClick={handleCloseMenu} style={{ zIndex: 9, right: '80%' }}>
            <svg className="navigation-widget-close-button-icon icon-big-arrow">
              <use xlinkHref="#svg-small-arrow" />
            </svg>
          </div>

          <div className="">
            <div className="user-short-description" style={{ paddingTop: '24px' }} onClick={handleCloseMenu}>
              <AvatarContainerDiv>
                <Link to={`/u/${user?.userName}`} data-title={t('navLeftMenu.goToMyProfile')}>
                  <UserAvatar size="L" imageName={user?.profilePicture || ''} removeContainerStyle />
                </Link>
              </AvatarContainerDiv>

              <p className="user-short-description-title">
                <Link to={`/u/${user?.userName}`} data-title={t('navLeftMenu.goToMyProfile')}>
                  {user?.fullName}
                </Link>
              </p>

              <p className="user-short-description-text">
                <Link to={`/u/${user?.userName}`} data-title={t('navLeftMenu.goToMyProfile')}>
                  www.lupanar.com/{user?.userName}
                </Link>
              </p>
            </div>

            <div className="user-stats">
              <div className="user-stat">
                <Link to={`/u/${user?.userName}/posts`} data-title={t('navLeftMenu.goToMyPosts')} onClick={handleCloseMenu}>
                  <p className="user-stat-title">{user?.numberOfFollowers}</p>

                  <p className="user-stat-text">Post</p>
                </Link>
              </div>

              <div className="user-stat">
                <Link
                  to={`/u/${user?.userName}/photos`}
                  data-title={t('navLeftMenu.goToMyPhotos')}
                  onClick={handleCloseMenu}
                >
                  <p className="user-stat-title">{user?.numberImages}</p>

                  <p className="user-stat-text">Photos</p>
                </Link>
              </div>

              <div className="user-stat">
                <Link
                  to={`/u/${user?.userName}/videos`}
                  data-title={t('navLeftMenu.goToMyVideos')}
                  onClick={handleCloseMenu}
                >
                  <p className="user-stat-title">{user?.numberVideos}</p>

                  <p className="user-stat-text">Videos</p>
                </Link>
              </div>
            </div>
          </div>

          <ul className="menu">
            {MenuRoutes.map((item) => {
              if (item.showInMenu && item.path) {
                return (
                  <li
                    className={classNames('menu-item', route.pathname.includes(item.path) ? 'active' : '')}
                    key={item.name}
                  >
                    <Link className="menu-item-link" to={item.path} onClick={handleCloseMenu}>
                      {item.iconType === 'template' && (
                        <svg className={`menu-item-link-icon icon-${item.icon}`}>
                          <use xlinkHref={`#svg-${item.icon}`} />
                        </svg>
                      )}
                      {item.iconType === 'templateWithoutColor' && (
                        <svg className={`menu-item-link-icon icon-${item.icon}`}>
                          <use xlinkHref={`#svg-${item.icon}`} style={{ fill: '#adafca' }} />
                        </svg>
                      )}
                      {t(item.title)}
                    </Link>
                  </li>
                )
              }

              return null
            })}

            <li className="menu-item">
              <a
                href=""
                className="menu-item-link"
                data-title={t('navLeftMenu.logout')}
                onClick={() => {
                  signOut()
                }}
              >
                <svg className="menu-item-link-icon icon-login">
                  <use xlinkHref="#svg-login" style={{ fill: '#adafca' }} />
                </svg>
                {t('navLeftMenu.logout')}
              </a>
            </li>
          </ul>
        </nav>
      </Fade>

      {showMenu && (
        <div
          style={{
            width: '100%',
            height: '100%',
            position: 'fixed',
            top: '0',
            left: '0',
            zIndex: 99998,
            backgroundColor: 'rgba(21, 21, 31, .0)',
            opacity: '1',
            visibility: 'visible',
            transition: 'opacity .3s ease-in-out, visibility .3s ease-in-out',
            overflow: 'hidden',
          }}
          onClick={handleCloseMenu}
        >
          {' '}
        </div>
      )}
    </>
  )
}

export default MobileMenu
