import { Reducer, useReducer } from 'react'

interface SearchState {
  keyword: string
  items?: any
}

interface SearchAction {
  type: string
  payload?: any
}

const ACTIONS = {
  CHANGE_KEYWORD: 'change_keyword',
  CLEAR: 'clear',
}

const ACTIONS_REDUCERS = {
  [ACTIONS.CHANGE_KEYWORD]: (state: SearchState, action: SearchAction) => ({
    ...state,
    keyword: action.payload,
  }),
  [ACTIONS.CLEAR]: (state: SearchState) => ({
    ...state,
    keyword: '',
    items: [],
  }),
}

const reducer = (state: SearchState, action: SearchAction) => {
  const actionReducer = ACTIONS_REDUCERS[action.type]
  return actionReducer ? actionReducer(state, action) : state
}

const useSearch = ({ initialKeyword = '' } = {}) => {
  const [{ keyword, items }, dispatch] = useReducer<Reducer<SearchState, SearchAction>>(reducer, {
    keyword: decodeURIComponent(initialKeyword),
    items: [],
  })

  return {
    changeKeyword: (value: string) => {
      dispatch({ type: ACTIONS.CHANGE_KEYWORD, payload: value })
    },
    clear: () => {
      dispatch({ type: ACTIONS.CHANGE_KEYWORD })
    },
    keyword,
    items,
  }
}

export default useSearch
