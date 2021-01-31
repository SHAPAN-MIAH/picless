import { library } from '@fortawesome/fontawesome-svg-core'
import {
  faCheck,
  faPlus,
  faTimes,
  faDollarSign,
  faShareAlt,
  faComments,
  faLock,
  faHeart,
  faRedo,
  faExclamationTriangle,
  faStar,
  faCreditCard,
  faSatelliteDish,
  faExpand,
  faSyncAlt,
  faStopCircle,
  faChevronCircleLeft,
  faChevronCircleRight,
  faBars,
  faMicrophone,
  faMicrophoneSlash,
  faPlayCircle,
} from '@fortawesome/free-solid-svg-icons'
import { faCcVisa, faCcMastercard, faCcAmex, faCcDinersClub, faCcJcb } from '@fortawesome/free-brands-svg-icons'

// COMMON ICONS
library.add(
  faPlus,
  faTimes,
  faCheck,
  faDollarSign,
  faShareAlt,
  faComments,
  faLock,
  faHeart,
  faRedo,
  faExclamationTriangle,
  faSatelliteDish,
  faExpand,
  faSyncAlt,
  faStopCircle,
  faChevronCircleLeft,
  faChevronCircleRight,
  faBars,
  faMicrophone,
  faMicrophoneSlash,
  faPlayCircle
)

// BRAND ICONS
library.add(faCcVisa, faCcMastercard, faCcAmex, faCcDinersClub, faCcJcb, faStar, faCreditCard)
