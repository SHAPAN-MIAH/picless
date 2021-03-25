import classNames from 'classnames'
import React, { FunctionComponent, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import UserAvatar from '../../../../components/UserAvatar'
import useAuth from '../../../../hooks/useAuth'
import useMenu from '../../../../hooks/useMenu'
import useRouter from '../../../../hooks/useRouter'
import useUser from '../../../../hooks/useUser'
import MenuRoutes from '../../../../routes/MenuRoutes'
import { UserType } from '../../../../types/UserType.d'

const AvatarContainerDiv = styled.div`
  position: relative;
  left: 50%;
  margin-left: -49px;
`

const MobileMenu: FunctionComponent<{}> = () => {
  const { t } = useTranslation()

  const { showMenu, setShowMenu } = useMenu()
  const route = useRouter()
  const { signOut } = useAuth()
  const { getUser } = useUser()

  const [user, setUser] = useState<UserType>()

  useEffect(() => {
    getUser().then((userData: UserType) => {
      setUser(userData)
    })
  }, [user, showMenu])

  const handleCloseMenu = () => {
    setShowMenu(false)
    console.log('sdfdsfdsfds')
  }

  return (
    <>
      <nav
        id="navigation-widget-mobile"
        className={classNames('navigation-widget navigation-widget-mobile sidebar left', showMenu ? 'visible' : 'hidden')}
        data-simplebar
      >
        <div className="navigation-widget-close-button" onClick={handleCloseMenu} style={{ zIndex: 999 }}>
          <svg className="navigation-widget-close-button-icon icon-back-arrow">
            <use xlinkHref="#svg-back-arrow" />
          </svg>
        </div>

        <div className="">
          <div className="user-short-description" style={{ paddingTop: '24px' }}>
            <AvatarContainerDiv>
              <UserAvatar size="L" imageName={user?.profilePicture || ''} removeContainerStyle />
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
              <p className="user-stat-title">{user?.numberOfFollowers}</p>

              <p className="user-stat-text">Followers</p>
            </div>

            <div className="user-stat">
              <p className="user-stat-title">{user?.numberImages}</p>

              <p className="user-stat-text">Photos</p>
            </div>

            <div className="user-stat">
              <p className="user-stat-title">{user?.numberVideos}</p>

              <p className="user-stat-text">Videos</p>
            </div>
          </div>
        </div>

        <ul className="menu">
          {MenuRoutes.map((item) => {
            if (item.showInMenu && item.path) {
              return (
                <li className={classNames('menu-item', route.pathname.includes(item.path) ? 'active' : '')} key={item.name}>
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
        </ul>
      </nav>

      {showMenu && (
        <div
          style={{
            width: '100%',
            height: '100%',
            position: 'fixed',
            top: '0',
            left: '0',
            zIndex: 99998,
            backgroundColor: 'rgba(21, 21, 31, .96)',
            opacity: '1',
            visibility: 'visible',
            transition: 'opacity .3s ease-in-out, visibility .3s ease-in-out',
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
