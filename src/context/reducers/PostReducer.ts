import { PostType } from '../../types/PostType.d'

export interface PostsState {
  loading: boolean
  nextPage: number
  pages: number
  posts: PostType[]
}

export interface PostsAction {
  type: string
  payload?: any
}

export const initialState: PostsState = {
  loading: false,
  nextPage: 0,
  pages: 0,
  posts: [],
}

export const ACTIONS = {
  LOADING: 'loading',
  CHANGE_PAGE: 'change_page', // TODO: REVIEW IF IT's NECESSARY
  SET_TOTAL_PAGES: 'set_total_pages',
  GET_POSTS: 'get_posts',
  DELETE_POSTS: 'delete_posts',
  CHANGE_REACTIONS: 'change_reactions',
  CLEAR: 'clear',
}

const ACTIONS_REDUCERS = {
  [ACTIONS.LOADING]: (state: PostsState) => ({
    ...state,
    loading: true,
  }),
  [ACTIONS.CHANGE_PAGE]: (state: PostsState) => ({
    ...state,
    nextPage: state.nextPage + 1,
  }),
  [ACTIONS.SET_TOTAL_PAGES]: (state: PostsState, action: PostsAction) => ({
    ...state,
    pages: action.payload as number,
  }),
  [ACTIONS.GET_POSTS]: (state: PostsState, action: PostsAction) => ({
    ...state,
    loading: false,
    posts: [...(state.posts || []), ...(action.payload as PostType[])],
  }),
  [ACTIONS.DELETE_POSTS]: (state: PostsState, action: PostsAction) => ({
    ...state,
    loading: false,
    posts: state.posts?.filter((post) => post.id !== (action.payload as number)),
  }),
  // [ACTIONS.CHANGE_REACTIONS]: (state: PostsState, action: PostsAction) => {
  //   const post = action.payload as PostType

  //   return {
  //     ...state,
  //     loading: false,
  //     posts: state.posts?.map((p) => {
  //       if (p.id === post.id) return post
  //       return p
  //     }),
  //   }
  // },
  [ACTIONS.CLEAR]: (state: PostsState) => ({
    ...state,
  }),
}

const reducer = (state: PostsState, action: PostsAction) => {
  const actionReducer = ACTIONS_REDUCERS[action.type]
  return actionReducer ? actionReducer(state, action) : state
}

export default reducer
