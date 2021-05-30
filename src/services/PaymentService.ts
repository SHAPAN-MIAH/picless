import {
  AddCardType,
  CardType,
  DefaultCardType,
  ServiceMovementType,
  ServiceSubscritionPlanOption,
} from '../types/PaymentTypes'
import * as ApiHelper from './ApiHelpers'

const baseUrl = `${process.env.REACT_APP_BASE_URL_API}/payments`

const getCards = async (signal?: AbortSignal): Promise<CardType[]> => {
  const headers = await ApiHelper.requestHeaders({ type: 'formData' })

  const requestOptions: RequestInit = {
    method: 'GET',
    headers,
    signal,
  }

  const url = `${baseUrl}/getcreditcards`

  const response = await fetch(url, requestOptions)
  const body = await response.json()
  return body
}

const addCard = async (card: AddCardType): Promise<any> => {
  const headers = await ApiHelper.requestHeaders({ 'Content-Type': 'application/json' })

  const requestOptions: RequestInit = {
    method: 'POST',
    headers,
    body: JSON.stringify(card),
  }

  const url = `${baseUrl}/addcreditcard`

  const response = await fetch(url, requestOptions)
  const body = await response.json()
  return body
}

const removeCard = async (cardId: string): Promise<any> => {
  const headers = await ApiHelper.requestHeaders({ type: 'formData' })

  const bodyData = new FormData()
  bodyData.append('cardId', cardId)

  const requestOptions: RequestInit = {
    method: 'DELETE',
    headers,
    body: bodyData,
  }

  const url = `${baseUrl}/deletecard`

  const response = await fetch(url, requestOptions)
  const body = await response.json()
  return body
}

const changeDefaultCard = async (cardId: string): Promise<any> => {
  const headers = await ApiHelper.requestHeaders({ type: 'formData' })

  const bodyData = new FormData()
  bodyData.append('cardId', cardId)

  const requestOptions: RequestInit = {
    method: 'PUT',
    headers,
    body: bodyData,
  }

  const url = `${baseUrl}/updatedefaultcard`

  const response = await fetch(url, requestOptions)
  const body = await response.json()
  return body
}

const getSuscriptionPlans = async (signal?: AbortSignal): Promise<CardType[]> => {
  const headers = await ApiHelper.requestHeaders({ type: 'formData' })

  const requestOptions: RequestInit = {
    method: 'GET',
    headers,
    signal,
  }

  const url = `${baseUrl}/getplans`

  const response = await fetch(url, requestOptions)
  const body = await response.json()
  return body
}

const suscribeToUser = async (
  planId: any,
  userIdToSuscribe: number,
  provider: string,
  token: string,
  amount: number
): Promise<any> => {
  const headers = await ApiHelper.requestHeaders({ type: 'formData' })

  const bodyData = new FormData()
  bodyData.append('planId', planId)
  bodyData.append('userIdToSuscribe', userIdToSuscribe.toString())
  bodyData.append('provider', provider)
  bodyData.append('token', token)
  bodyData.append('amount', amount.toString())

  const requestOptions: RequestInit = {
    method: 'POST',
    headers,
    body: bodyData,
  }

  const url = `${baseUrl}/createsuscription`

  const response = await fetch(url, requestOptions)
  const body = await response.json()
  return body
}

const getBalance = async (signal?: AbortSignal): Promise<any> => {
  const headers = await ApiHelper.requestHeaders({ type: 'formData' })

  const requestOptions: RequestInit = {
    method: 'GET',
    headers,
    signal,
  }

  const url = `${process.env.REACT_APP_BASE_URL_API}/users/getuserbalance`

  const response = await fetch(url, requestOptions)
  const body = await response.json()
  return body
}

const getDefaultCard = async (signal?: AbortSignal): Promise<DefaultCardType> => {
  const headers = await ApiHelper.requestHeaders({ type: 'formData' })

  const requestOptions: RequestInit = {
    method: 'GET',
    headers,
    signal,
  }

  const url = `${baseUrl}/getdefaultcard`

  const response = await fetch(url, requestOptions)
  const body = await response.json()
  return body
}

const getMovements = async (signal?: AbortSignal): Promise<ServiceMovementType> => {
  const headers = await ApiHelper.requestHeaders({ type: 'formData' })

  const requestOptions: RequestInit = {
    method: 'GET',
    headers,
    signal,
  }

  const url = `${baseUrl}/getcharges`

  const response = await fetch(url, requestOptions)
  const body = await response.json()
  return body
}

const addCreditToWallet = async (amount: number, currency: string, description: string, token: string): Promise<any> => {
  const headers = await ApiHelper.requestHeaders({ type: 'formData' })

  const bodyData = new FormData()
  bodyData.append('amount', amount.toString())
  bodyData.append('currency', currency)
  bodyData.append('description', description)
  bodyData.append('tokenId', token)

  const requestOptions: RequestInit = {
    method: 'POST',
    headers,
    body: bodyData,
  }

  const url = `${baseUrl}/addcharge`

  const response = await fetch(url, requestOptions)
  const body = await response.json()
  return body
}

const confirmPayment = async (paymentIntent: string): Promise<any> => {
  const headers = await ApiHelper.requestHeaders({ type: 'formData' })

  const bodyData = new FormData()
  bodyData.append('paymentIntent', paymentIntent)

  const requestOptions: RequestInit = {
    method: 'POST',
    headers,
    body: bodyData,
  }

  const url = `${baseUrl}/confirmpayment`

  const response = await fetch(url, requestOptions)
  const body = await response.json()
  return body
}

const getPlanOptions = async (userName: string, signal?: AbortSignal): Promise<ServiceSubscritionPlanOption> => {
  const headers = await ApiHelper.requestHeaders({ type: 'formData' })

  const requestOptions: RequestInit = {
    method: 'GET',
    headers,
    signal,
  }

  const url = `${baseUrl}/getplanoptions?userName=${userName}`

  const response = await fetch(url, requestOptions)
  const body = await response.json()
  return body
}

const cancelSubscription = async (subscriptionId: number) => {
  const headers = await ApiHelper.requestHeaders({ type: 'formData' })

  const bodyData = new FormData()
  bodyData.append('subscriptionId', subscriptionId.toString())

  const requestOptions: RequestInit = {
    method: 'DELETE',
    headers,
    body: bodyData,
  }

  const url = `${baseUrl}/cancelsubscription`

  const response = await fetch(url, requestOptions)
  const body = await response.json()
  return body
}

const unlockContent = async (postId: number) => {
  const headers = await ApiHelper.requestHeaders({ type: 'formData' })

  const bodyData = new FormData()
  bodyData.append('postId', postId.toString())

  const requestOptions: RequestInit = {
    method: 'POST',
    headers,
    body: bodyData,
  }

  const url = `${baseUrl}/unblockcontent`

  const response = await fetch(url, requestOptions)
  const body = await response.json()
  return body
}

export default {
  getCards,
  addCard,
  removeCard,
  changeDefaultCard,
  getSuscriptionPlans,
  suscribeToUser,
  cancelSubscription,
  getBalance,
  getDefaultCard,
  addCreditToWallet,
  getMovements,
  getPlanOptions,
  confirmPayment,
  unlockContent
}
