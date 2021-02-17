import React, { FunctionComponent, useEffect, useState } from 'react'
import classNames from 'classnames'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

import UserAvatar from '../../../../components/UserAvatar'

import { UserType } from '../../../../types/UserType.d'
import useMenu from '../../../../hooks/useMenu'
import useUser from '../../../../hooks/useUser'
import useAuth from '../../../../hooks/useAuth'

import menuItems from '../../../../constants/menu.json'
import useRouter from '../../../../hooks/useRouter'

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

  const logout = () => {
    signOut()
  }

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
        <div className="navigation-widget-close-button" onClick={handleCloseMenu}>
          <svg className="navigation-widget-close-button-icon icon-back-arrow">
            <use xlinkHref="#svg-back-arrow" />
          </svg>
        </div>

        <div className="navigation-widget-info-wrap">
          <div className="navigation-widget-info">
            <Link to={`/user/${user?.userName}`} data-title={t('navLeftMenu.goToMyProfile')}>
              <UserAvatar size="SMALL" imageName={user?.profilePicture} />
            </Link>

            <p className="navigation-widget-info-title">
              <a href={`/user/${user?.userName}`}>{user?.fullName}</a>
            </p>

            <p className="navigation-widget-info-text">Welcome Back!</p>
          </div>

          <a className="navigation-widget-info-button button small secondary" href="" onClick={logout}>
            {t('navLeftMenu.logout')}
          </a>
        </div>

        <p className="navigation-widget-section-title">Sections</p>

        <ul className="menu">
          {menuItems.map((item) => {
            if (item.path) {
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
