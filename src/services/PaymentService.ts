import * as ApiHelper from './ApiHelpers'
import { AddCardType } from '../types/PaymentTypes.d'

const baseUrl = `${process.env.REACT_APP_BASE_URL_API}/payments`

const getCards = async (card: AddCardType): Promise<any> => {
  const headers = await ApiHelper.requestHeaders({ type: 'formData' })

  const requestOptions: RequestInit = {
    method: 'POST',
    headers,
  }

  const url =
    `${baseUrl}/addcreditcard?number=${card.number}&expireMonth=${card.expireMonth}` +
    `&expireYear=${card.expireYear}&cvc=${card.ccv}&holderName=${card.holderName}`

  const response = await fetch(url, requestOptions)
  const body = await response.json()
  return body
}

const addCard = async (card: AddCardType): Promise<any> => {
  const headers = await ApiHelper.requestHeaders({ type: 'formData' })

  const requestOptions: RequestInit = {
    method: 'POST',
    headers,
  }

  const url =
    `${baseUrl}/addcreditcard?number=${card.number}&expireMonth=${card.expireMonth}` +
    `&expireYear=${card.expireYear}&cvc=${card.ccv}&holderName=${card.holderName}` +
    `&address=${card.billingAddress.street}&city=${card.billingAddress.city}` +
    `&state=${card.billingAddress.state}&zipCode=${card.billingAddress.postalCode}` +
    `&country=${card.billingAddress.country}`

  const response = await fetch(url, requestOptions)
  const body = await response.json()
  return body
}

export default { getCards, addCard }
