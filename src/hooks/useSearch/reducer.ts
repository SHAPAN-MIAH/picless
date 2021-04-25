import { UserSearchType } from '../../types/UserType'

export interface SearchState {
  loading: boolean
  keyword: string
  items?: UserSearchType[]
}

export interface SearchAction {
  type: string
  payload?: any
}

export const ACTIONS = {
  LOADING: 'loading',
  CHANGE_KEYWORD: 'change_keyword',
  CHANGE_ITEMS: 'change_items',
  CLEAR: 'clear',
}

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

export default reducer
