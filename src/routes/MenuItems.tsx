import React from 'react'

import LayoutUnauthorize from '../views/LayoutUnauthorize/LayoutUnauthorize'
import Account from '../views/Account/Account'
import ProfileInfo from '../views/Account/ProfileInfo'
import AccountDevices from '../views/Account/AccountDevices/AccountDevices'
import ChangePassword from '../views/Account/ChangePassword/ChangePassword'
import UserProfile from '../views/UserProfile/UserProfile'
import Messages from '../views/Messages/Messages'
import UserSettings from '../views/Account/UserSettings'
import Home from '../views/Home/Home'
import Wallet from '../views/Account/Wallet'
import Movements from '../views/Account/Movements'
import AddCard from '../views/Account/Card/AddCard'
import Subscriptions from '../views/Account/Subscriptions/Subscriptions'
import TestView from '../views/TestView/TestView'
import Verification from '../views/Account/Verification/Verification'
import HelpSupport from '../views/HelpSupport/HelpSupport'
import PaymentCallback from '../views/Payments/PaymentCallback'

const routes = [
  {
    name: 'PROFILE-INFO',
    title: 'navLeftMenu.profileInfo',
    icon: 'members',
    iconType: 'template',
    path: '/account/profile-info',
    exact: true,
    main: <ProfileInfo />,
  },
  {
    name: 'ACCOUNT-INFO',
    title: 'navLeftMenu.accountInfo',
    icon: 'private',
    iconType: 'templateWithoutColor',
    path: '/account/account-info',
    exact: true,
    main: <Account />,
  },

  {
    name: 'SETTINGS',
    title: 'navLeftMenu.settings',
    icon: 'settings',
    iconType: 'template',
    path: '/account/settings',
    exact: true,
    main: <UserSettings />,
  },
  {
    name: 'MY-SUBSCRIBERS',
    title: 'navLeftMenu.mySubscriptions',
    icon: 'group',
    iconType: 'template',
    path: '/account/my-subscriptions',
    exact: true,
    main: <Subscriptions />,
  },
  {
    name: 'CARDS/WALLET',
    title: 'navLeftMenu.cardWallet',
    icon: 'wallet',
    iconType: 'template',
    path: '/account/wallet',
    exact: true,
    main: <Wallet />,
  },
  {
    name: 'ADD-BANK',
    title: 'navLeftMenu.addBank',
    icon: 'earnings',
    iconType: 'template',
    path: '/account/verification',
    exact: true,
    main: <Verification />,
  },
  {
    name: 'HELP-SUPPORT',
    title: 'navLeftMenu.helpSupport',
    icon: 'info',
    iconType: 'template',
    path: '/support',
    exact: true,
    main: <HelpSupport />,
  },
  {
    name: 'LOGOUT',
    title: 'navLeftMenu.logout',
    icon: 'login',
    iconType: 'template',
    path: '',
    exact: true,
    main: () => <h1>Error</h1>,
    action: 'logout',
  },
]

export default routes
