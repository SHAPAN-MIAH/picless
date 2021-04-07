import { CommonServiceResponse } from 'types/CommonTypes'

export type ProviderType = 'VISA' | 'MASTER_CARD' | 'DINNERS' | 'DISCOVER' | 'AMERICAN_EXPRESS' | 'JCB'
export type PaymentProcessorType = 'STRIPE'
export type DocumentsType = 'PASSPORT' | 'DRIVING_LICENCE' | 'OTHER'

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
  name: string
  planId: string
  paymentProcessor: PaymentProcessorType
  amount: number
  amountTaxIncluded: number
  currency: string
  intervalCount: number
  interval: string
  countryCode: string
}

export interface DefaultCardType {
  code: string
  defaultCardId: string
  securionPayCardId: string
  stripeCardId: string
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
  id: number
  amount: number
  amountTaxIncluded: number
  countryCode: string
  currency: string // TODO: CREATE TYPE WITH ALL CURRENCIES
  interval: string // TODO: FIND AND CREATE TYPE WITH ALL THE INTERVALS (Month, Year, etc...)
  intervalCount: number
  name: string
  paymentProcessor: PaymentProcessorType
  planId: string
}

export interface ServiceSubscritionPlanOption extends CommonServiceResponse {
  data: SubscritionPlanOption[]
  tax: 0.21
}

export interface AddBankType extends BillingAddressType {
  firstName: string
  lastName: string
  email: string
  phoneNumber: string
  fullAddress: string
  dateOfBirth: string
  documentType: DocumentsType
  adultContent: boolean
}
