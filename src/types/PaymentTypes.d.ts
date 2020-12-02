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