import React, { FunctionComponent, useEffect, useState } from 'react'
import classNames from 'classnames'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

import useMenu from '../../../../hooks/useMenu'

import UserAvatar from '../../../../components/UserAvatar'
import { UserType } from '../../../../types/UserType.d'
import useUser from '../../../../hooks/useUser'
import useAuth from '../../../../hooks/useAuth'

import menuItems from '../../../../constants/menu.json'
import useRouter from '../../../../hooks/useRouter'

const BrowserMenu: FunctionComponent<{}> = () => {
  const { t } = useTranslation()

  const { getUser } = useUser()
  const { signOut } = useAuth()
  const route = useRouter()

  const { showMenu } = useMenu()

  const [imageCover, setImageCover] = useState()
  const [imageProfile, setImageProfile] = useState()
  const [user, setUser] = useState<UserType>()

  useEffect(() => {
    getUser().then((userData) => {
      setUser(userData)

      setImageCover(process.env.REACT_APP_BUCKET_IMAGES + userData.coverPicture)
      setImageProfile(userData.profilePicture)
    })
  }, [getUser])

  return (
    <>
      {/* SMALL MENU */}
      <nav
        id="navigation-widget-small"
        className={classNames(
          'navigation-widget navigation-widget-desktop closed sidebar left',
          showMenu ? 'hidden' : 'delayed'
        )}
      >
        <Link to={`/user/${user?.userName}`} data-title={t('navLeftMenu.goToMyProfile')}>
          <UserAvatar size="SMALL" imageName={imageProfile || ''} />
        </Link>
        <ul className="menu small">
          {menuItems.map((item) => {
            if (item.path) {
              return (
                <li className={classNames('menu-item', route.pathname.includes(item.path) ? 'active' : '')} key={item.name}>
                  <Link className="menu-item-link text-tooltip-tfr" to={item.path} data-title={t(item.title)}>
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
                  </Link>
                </li>
              )
            }
          })}

          <li className="menu-item">
            <a
              href=""
              className="menu-item-link text-tooltip-tfr"
              style={{ color: '#adafca' }}
              data-title={t('navLeftMenu.logout')}
              onClick={() => {
                signOut()
              }}
            >
              <svg className="menu-item-link-icon icon-login">
                <use xlinkHref="#svg-login" style={{ fill: '#adafca' }} />
              </svg>
            </a>
          </li>
        </ul>
      </nav>

      <nav
        id="navigation-widget"
        className={classNames('navigation-widget navigation-widget-desktop sidebar left', showMenu ? 'delayed' : 'hidden')}
        data-simplebar
      >
        <div
          className="navigation-widget-cover"
          style={{ background: `url(${imageCover}) center center / cover no-repeat` }}
        >
          <img src={imageCover} alt="cover-01" style={{ display: 'none' }} />
        </div>
        <div className="user-short-description">
          <UserAvatar size="MEDIUM" imageName={imageProfile || ''} />

          <p className="user-short-description-title">
            <Link to={`/user/${user?.userName}`} data-title={t('navLeftMenu.goToMyProfile')}>
              {user?.fullName}
            </Link>
          </p>

          <p className="user-short-description-text">
            <Link to={`/user/${user?.userName}`} data-title={t('navLeftMenu.goToMyProfile')}>
              www.lupanar.com/{user?.userName}
            </Link>
          </p>
        </div>
        <ul className="menu">
          {menuItems.map((item) => {
            if (item.path) {
              return (
                <li className={classNames('menu-item', route.pathname.includes(item.path) ? 'active' : '')} key={item.name}>
                  <Link className="menu-item-link" to={item.path}>
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

          <li className="menu-item">
            <a
              href=""
              className="menu-item-link"
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
    </>
  )
}

export default BrowserMenu
