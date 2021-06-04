import { useContext } from 'react'
import ChatService from 'services/ChatService'
import { MessageType, OnReceiveMessageType, UserStatusMessagesType } from 'types/MessagesType'
import ChatReducerContext from '../context/ChatReducerContext'
// import useChat, { UserStatusMessagesOptionalType } from './useChat'
import useUser from './useUser'
export interface UserStatusMessagesOptionalType {
  email: string
  userId: string
  connectionId?: string | null
}

const useChatMessages = () => {
  const { state, ACTIONS, dispatch } = useContext(ChatReducerContext.context)
  const { user } = useUser()


  const getUserList = async () => {
    dispatch({ type: ACTIONS.LOADING_USERS })
    return new Promise<void>((resolve, reject) => {

      ChatService.getFavoriteUsers()
        .then((data: UserStatusMessagesType[]) => {
          dispatch({ type: ACTIONS.SET_USERS, payload: data })

          resolve()
        })
        .catch((err) => {
          console.error(err)

          reject(err)
        })
    })
  }

  const getMessageHistory = async (userId: number) => {
    return new Promise<void>((resolve, reject) => {
      dispatch({ type: ACTIONS.LOADING_MESSAGES })

      ChatService.getChatHistoryByUser(userId)
        .then((data: MessageType[]) => {
          dispatch({ type: ACTIONS.SET_CURRENT_CHAT, payload: data })

          resolve()
        })
        .catch((err) => {
          console.error(err)

          reject(err)
        })
    })
  }

  const selectUser = (userId: number) => {
    dispatch({ type: ACTIONS.SELECT_USER, payload: userId })
    getMessageHistory(userId)
  }

  const sendMsg = async (toUser: UserStatusMessagesType | UserStatusMessagesOptionalType, message: string) => {
    return new Promise<void>((resolve, reject) => {

      const msg: MessageType = {
        content: message,
        message,
        user: toUser.email,
        fromUserId: user.id,
        registerDate: new Date().toJSON(),
        toUserId: toUser.userId,
        type: 'TEXT',
      }

      ChatService.sendMessage(msg).then(() => {
        insertMessage(msg)
        resolve()
      })
    })
  }

  const receiveMessage = async (message: OnReceiveMessageType) => {
    const msg: MessageType = {
      content: message.message,
      user: message.user,
      fromUserId: Number(message.fromUserId),
      registerDate: message.registerDate || new Date().toJSON(),
      toUserId: Number(message.toUserId),
      type: 'TEXT',
    }

    insertMessage(msg)
  }

  const setLastMessage = async(msg: OnReceiveMessageType) => {

    const message =  {userId: Number(msg.fromUserId), message: msg.message, dateMessage: new Date().toJSON()}
    console.log(message)

    dispatch({ type: ACTIONS.SET_LAST_MESSAGE_AND_SET_UNREAD, payload: message })
  }

  const insertMessage = async (msg: MessageType) => {
    dispatch({ type: ACTIONS.INSERT_MESSAGE_TO_CURRENT_CHAT, payload: msg })
  }

  const changeUserStatus = (userId: number, status: 'ONLINE' | 'OFFLINE') => {
    dispatch({ type: ACTIONS.CHANGE_USER_STATUS, payload: { userId, status }}) 
  }

  const notifyConnected = () => {
    ChatService.notifyConnected(user.id || -1)
  }
  
  const notifyDisconnected = () => {
    ChatService.notifyDisconnected(user.id || -1)
  }

  const findSelectedUser = (user: UserStatusMessagesType) => user.selected
  const userSelected = state.users.find(findSelectedUser)

  return {
    loadingUsers: state.loadingUsers,
    loadingMessages: state.loadingMessages,
    users: state.users,
    userSelected,
    currentConversation: state.currentChat,
    getUserList,
    getMessageHistory,
    setLastMessage,
    receiveMessage,
    notifyConnected,
    notifyDisconnected,
    changeUserStatus,
    sendMessage: sendMsg,
    selectUser,
  }
}

export default useChatMessages
