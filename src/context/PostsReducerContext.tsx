import React, { ReactNode, Reducer, useReducer } from 'react'
import reducer, { initialState, ACTIONS, PostsAction, PostsState } from './reducers/PostReducer'

interface PostsContextProps {
  state: PostsState
  ACTIONS: any
  dispatch: React.Dispatch<any>
}

const contextInitialState: PostsContextProps = {
  state: initialState,
  ACTIONS: {},
  dispatch: () => null,
}

const Context = React.createContext<PostsContextProps>(contextInitialState)

export const PostsContextProvider = (props: { children: ReactNode }) => {
  const { children } = props

  const [state, dispatch] = useReducer<Reducer<PostsState, PostsAction>>(reducer, initialState)
  return <Context.Provider value={{ state, ACTIONS, dispatch }}> {children} </Context.Provider>
}

PostsContextProvider.context = Context
export default PostsContextProvider
