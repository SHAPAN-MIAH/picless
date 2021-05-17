import React, { ReactNode, Reducer, useReducer } from 'react'
import reducer, { initialState, ACTIONS, ChatAction, ChatState } from './reducers/ChatReducer'

interface ChatContextProps {
  state: ChatState
  ACTIONS: any
  dispatch: React.Dispatch<any>
}

const contextInitialState: ChatContextProps = {
  state: initialState,
  ACTIONS: {},
  dispatch: () => null,
}

const Context = React.createContext<ChatContextProps>(contextInitialState)

export const ChatContextProvider = (props: { children: ReactNode }) => {
  const { children } = props

  const [state, dispatch] = useReducer<Reducer<ChatState, ChatAction>>(reducer, initialState)
  return <Context.Provider value={{ state, ACTIONS, dispatch }}> {children} </Context.Provider>
}

ChatContextProvider.context = Context
export default ChatContextProvider
