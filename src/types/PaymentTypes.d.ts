export type ProviderType = 'VISA' | 'MASTER_CARD' | 'DINNERS' | 'DISCOVER' | 'AMERICAN_EXPRESS' | 'JCB'

export type MonthNumbers = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12

export interface BillingAddressType {
  street: string
  city: string
  state: string
  postalCode: string
  country: string
}

export interface AddCardType {
  number: string
  expireMonth: MonthNumbers | null
  expireYear: number | null
  ccv: number | null
  holderName: string
  billingAddress: BillingAddressType
}

export interface CardType {
  id: string
  created: number
  objectType: string
  last4: string
  expMonth: string
  expYear: number
  cardholderName: string
  customerId: string
  brand: string
  type: string
  country: string
  addressCity: string
  addressLine1: string
  addressState: string
  addressCountry: string
  isDefaultCard?: boolean
}

export interface PlansType {
  id: string
  created: number
  objectType: string
  amount: number
  currency: string
  interval: string
  intervalCount: number
  name: string
  trialPeriodDays: number
}

export interface DefaultCardType {
  code: string
  defaultCardId: string
}

export interface FraudDetails {
  ipAddress?: any
  ipCountry?: any
  email?: any
  userAgent?: any
  acceptLanguage?: any
}

export interface MovementType {
  id: string
  created: number
  objectType: string
  amount: number
  amountRefunded: number
  currency: string
  description?: any
  card: CardType
  customerId: string
  captured: boolean
  refunded: boolean
  disputed: boolean
  fraudDetails: FraudDetails
}

export interface ServiceMovementType {
  hasMore: boolean
  list: MovementType[]
}

export interface SubscritionPlanOption {
  id: string
  created: number
  objectType: string
  amount: number
  currency: string
  interval: string
  intervalCount: number
  name: string
  trialPeriodDays: number
}
