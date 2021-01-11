import { Reducer, useReducer } from 'react'

import UserService from '../services/UserService'

import { UserSearchType } from '../types/UserType.d'

interface SearchState {
  loading: boolean
  keyword: string
  items?: UserSearchType[]
}

interface SearchAction {
  type: string
  payload?: any
}

const ACTIONS = {
  LOADING: 'loading',
  CHANGE_KEYWORD: 'change_keyword',
  CHANGE_ITEMS: 'change_items',
  CLEAR: 'clear',
}

let controllerCancelable: AbortController

const ACTIONS_REDUCERS = {
  [ACTIONS.LOADING]: (state: SearchState) => ({
    ...state,
    loading: true,
  }),
  [ACTIONS.CHANGE_KEYWORD]: (state: SearchState, action: SearchAction) => ({
    ...state,
    keyword: action.payload,
  }),
  [ACTIONS.CHANGE_ITEMS]: (state: SearchState, action: SearchAction) => ({
    ...state,
    loading: false,
    items: action.payload,
  }),

  [ACTIONS.CLEAR]: (state: SearchState) => ({
    ...state,
    keyword: '',
    loading: false,
    items: [],
  }),
}

const reducer = (state: SearchState, action: SearchAction) => {
  const actionReducer = ACTIONS_REDUCERS[action.type]
  return actionReducer ? actionReducer(state, action) : state
}

const useSearch = ({ initialKeyword = '' } = {}) => {
  const [{ loading, keyword, items }, dispatch] = useReducer<Reducer<SearchState, SearchAction>>(reducer, {
    loading: false,
    keyword: decodeURIComponent(initialKeyword),
    items: [],
  })

  return {
    changeKeyword: (value: string) => {
      if (controllerCancelable) {
        controllerCancelable.abort()
      }

      dispatch({ type: ACTIONS.LOADING })

      if (value) {
        controllerCancelable = new AbortController()
        const { signal } = controllerCancelable

        dispatch({ type: ACTIONS.CHANGE_KEYWORD, payload: value })
        UserService.searchUser(value, signal).then((data: UserSearchType[]) => {
          dispatch({ type: ACTIONS.CHANGE_ITEMS, payload: data })
        })
      }
    },
    clear: () => {
      dispatch({ type: ACTIONS.CLEAR })
    },
    loading,
    keyword,
    items,
  }
}

export default useSearch
