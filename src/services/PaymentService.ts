import * as ApiHelper from './ApiHelpers'
import Mapper from './PaymentMapper'
import { AddCardType, CardType } from '../types/PaymentTypes.d'

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

// TODO: CHANGE TO BODY Fields
const addCard = async (card: AddCardType): Promise<any> => {
  // const headers = await ApiHelper.requestHeaders({ type: 'formData' })
  const headers = await ApiHelper.requestHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' })

  const requestOptions: RequestInit = {
    method: 'POST',
    headers,
    body: Mapper.cardToServiceParameters(card),
  }

  const url = `${baseUrl}/addcreditcard`

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

const suscribeToUser = async (planId: any, userToSuscribe: number): Promise<any> => {
  const headers = await ApiHelper.requestHeaders({ type: 'formData' })

  const requestOptions: RequestInit = {
    method: 'POST',
    headers,
  }

  const url = `${baseUrl}/createsuscription?planId=${planId}&userIdToSuscribe=${userToSuscribe}`

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

  const url = `${baseUrl}/getuserbalance`

  const response = await fetch(url, requestOptions)
  const body = await response.json()
  return body
}

export default { getCards, addCard, getSuscriptionPlans, suscribeToUser, getBalance }
