import Account from '../views/Account/Account'
import ProfileInfo from '../views/Account/ProfileInfo'
import UserSettings from '../views/Account/UserSettings'
import Wallet from '../views/Account/Wallet'
import AddCard from '../views/Account/Card/AddCard'
import Subscriptions from '../views/Account/Subscriptions/Subscriptions'
import Verification from '../views/Account/Verification/Verification'
import HelpSupport from '../views/HelpCenter/HelpCenter'

const MenuRoutes = [
  {
    name: 'PROFILE-INFO',
    title: 'navLeftMenu.profileInfo',
    icon: 'members',
    iconType: 'template',
    path: '/account/profile-info',
    exact: true,
    component: ProfileInfo,
    showInMenu: true,
  },
  {
    name: 'ACCOUNT-INFO',
    title: 'navLeftMenu.accountInfo',
    icon: 'private',
    iconType: 'templateWithoutColor',
    path: '/account/account-info',
    exact: true,
    component: Account,
    showInMenu: true,
  },

  {
    name: 'SETTINGS',
    title: 'navLeftMenu.settings',
    icon: 'settings',
    iconType: 'template',
    path: '/account/settings',
    exact: true,
    component: UserSettings,
    showInMenu: true,
  },
  {
    name: 'MY-SUBSCRIBERS',
    title: 'navLeftMenu.mySubscriptions',
    icon: 'group',
    iconType: 'template',
    path: '/account/my-subscriptions',
    exact: true,
    component: Subscriptions,
    showInMenu: true,
  },
  {
    name: 'CARDS/WALLET',
    title: 'navLeftMenu.cardWallet',
    icon: 'wallet',
    iconType: 'template',
    path: '/account/wallet',
    exact: true,
    component: Wallet,
    showInMenu: true,
  },
  {
    name: 'ADD-BANK',
    title: 'navLeftMenu.addBank',
    icon: 'earnings',
    iconType: 'template',
    path: '/account/verification',
    exact: true,
    component: Verification,
    showInMenu: true,
  },
  {
    name: 'HELP-SUPPORT',
    title: 'navLeftMenu.helpSupport',
    icon: 'info',
    iconType: 'template',
    path: '/support',
    exact: true,
    component: HelpSupport,
    showInMenu: true,
  },
  {
    name: 'LOGOUT',
    title: 'navLeftMenu.logout',
    icon: 'login',
    iconType: 'template',
    path: '',
    exact: true,
    component: null,
    action: 'logout',
    showInMenu: true,
  },
  {
    name: 'ADD-CARD',
    title: 'navLeftMenu.logout',
    icon: '',
    iconType: '',
    path: '/wallet/payments/add-card',
    exact: true,
    component: AddCard,
    action: 'logout',
    showInMenu: false,
  },
  // {
  //   name: 'LOGOUT',
  //   title: 'navLeftMenu.logout',
  //   icon: 'login',
  //   iconType: 'template',
  //   path: '',
  //   exact: true,
  //   component: {},
  //   action: 'logout',
  //   showInMenu: true,
  // },
  // {
  //   name: 'LOGOUT',
  //   title: 'navLeftMenu.logout',
  //   icon: 'login',
  //   iconType: 'template',
  //   path: '',
  //   exact: true,
  //   component: {},
  //   action: 'logout',
  //   showInMenu: true,
  // },
  // {
  //   name: 'LOGOUT',
  //   title: 'navLeftMenu.logout',
  //   icon: 'login',
  //   iconType: 'template',
  //   path: '',
  //   exact: true,
  //   component: {},
  //   action: 'logout',
  //   showInMenu: true,
  // },
  // {
  //   name: 'LOGOUT',
  //   title: 'navLeftMenu.logout',
  //   icon: 'login',
  //   iconType: 'template',
  //   path: '',
  //   exact: true,
  //   component: {},
  //   action: 'logout',
  //   showInMenu: true,
  // },
]

export default MenuRoutes