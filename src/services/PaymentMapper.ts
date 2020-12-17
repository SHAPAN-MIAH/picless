import { AddCardType } from '../types/PaymentTypes.d'

const cardToServiceParameters = (card: AddCardType): FormData => {
  const bodyData = new FormData()
  bodyData.append('cardNumber', card.number)
  bodyData.append('expireMonth', card.expireMonth?.toString() || '')
  bodyData.append('expireYear', card.expireYear?.toString() || '')
  bodyData.append('cvc', card.ccv?.toString() || '')
  bodyData.append('holderName', card.holderName)
  bodyData.append('address', card.billingAddress.street)
  bodyData.append('city', card.billingAddress.city)
  bodyData.append('state', card.billingAddress.state)
  bodyData.append('zipCode', card.billingAddress.postalCode)
  bodyData.append('country', card.billingAddress.country)

  return bodyData
}

export default {
  cardToServiceParameters,
}
