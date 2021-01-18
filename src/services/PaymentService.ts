import * as ApiHelper from './ApiHelpers'
import { AddCardType, CardType, DefaultCardType, ServiceMovementType } from '../types/PaymentTypes.d'

const baseUrl = `${process.env.REACT_APP_BASE_URL_API}/payments`

const getCards = async (): Promise<CardType[]> => {
  const headers = await ApiHelper.requestHeaders({ type: 'formData' })

  const requestOptions: RequestInit = {
    method: 'GET',
    headers,
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

const getSuscriptionPlans = async (): Promise<CardType[]> => {
  const headers = await ApiHelper.requestHeaders({ type: 'formData' })

  const requestOptions: RequestInit = {
    method: 'GET',
    headers,
  }

  const url = `${baseUrl}/getplans`

  const response = await fetch(url, requestOptions)
  const body = await response.json()
  return body
}

const suscribeToUser = async (planId: any, userIdToSuscribe: number): Promise<any> => {
  const headers = await ApiHelper.requestHeaders({ type: 'formData' })

  const bodyData = new FormData()
  bodyData.append('planId', planId)
  bodyData.append('userIdToSuscribe', userIdToSuscribe.toString())

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

const getBalance = async (): Promise<any> => {
  const headers = await ApiHelper.requestHeaders({ type: 'formData' })

  const requestOptions: RequestInit = {
    method: 'GET',
    headers,
  }

  const url = `${process.env.REACT_APP_BASE_URL_API}/users/getuserbalance`

  const response = await fetch(url, requestOptions)
  const body = await response.json()
  return body
}

const getDefaultCard = async (): Promise<DefaultCardType> => {
  const headers = await ApiHelper.requestHeaders({ type: 'formData' })

  const requestOptions: RequestInit = {
    method: 'GET',
    headers,
  }

  const url = `${baseUrl}/getdefaultcard`

  const response = await fetch(url, requestOptions)
  const body = await response.json()
  return body
}

const getMovements = async (): Promise<ServiceMovementType> => {
  const headers = await ApiHelper.requestHeaders({ type: 'formData' })

  const requestOptions: RequestInit = {
    method: 'GET',
    headers,
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

export default {
  getCards,
  addCard,
  removeCard,
  changeDefaultCard,
  getSuscriptionPlans,
  suscribeToUser,
  getBalance,
  getDefaultCard,
  addCreditToWallet,
  getMovements,
}
