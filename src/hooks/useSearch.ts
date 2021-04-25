import { Reducer, useReducer } from 'react'
import UserService from '../services/UserService'
import { UserSearchType } from '../types/UserType'
import reducer, { ACTIONS, SearchAction, SearchState } from './useSearch/reducer'

let controllerCancelable: AbortController

const useSearch = ({ initialKeyword = '' } = {}) => {
  const [{ loading, keyword, items }, dispatch] = useReducer<Reducer<SearchState, SearchAction>>(reducer, {
    loading: false,
    keyword: decodeURIComponent(initialKeyword),
    items: [],
  })

  return {
    changeKeyword: (value: string) => {
      try {
        if (controllerCancelable) {
          controllerCancelable.abort()
        }

        dispatch({ type: ACTIONS.LOADING })

        if (value) {
          controllerCancelable = new AbortController()
          const { signal } = controllerCancelable

          dispatch({ type: ACTIONS.CHANGE_KEYWORD, payload: value })
          UserService.searchUser(value, signal)
            .then((data: UserSearchType[]) => {
              dispatch({ type: ACTIONS.CHANGE_ITEMS, payload: data })
            })
            .catch((e) => {
              console.log(e.message)
            })
        }
      } catch (err) {
        console.log(err.message)
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
