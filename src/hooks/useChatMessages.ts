import { useContext } from 'react'
import ChatService from 'services/ChatService'
import { MessageType, OnReceiveMessageType, UserStatusMessagesType } from 'types/MessagesType'
import ChatReducerContext from '../context/ChatReducerContext'
import useChat, { UserStatusMessagesOptionalType } from './useChat'
import useUser from './useUser'

const useChatMessages = () => {
  const { state, ACTIONS, dispatch } = useContext(ChatReducerContext.context)
  const { sendMessage } = useChat()
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

  const sendMsg = async (toUser: UserStatusMessagesType, message: string) => {
    return new Promise<void>((resolve, reject) => {
      sendMessage(toUser, message).then(() => {
        insertMessage(user.id || 0, {email: toUser.email, userId: toUser.userId}, message)
        resolve()
      })
    })
  }

  const receiveMessage = async (message: OnReceiveMessageType) => {

    insertMessage(Number(message.fromUserId), {email: message.user, userId: Number(message.toUserId)}, message.message, message.registerDate)
  }

  const insertMessage = async (fromUser:number, toUser: {email: string, userId: number}, message: string, date = new Date().toJSON()) => {
    const msg: MessageType = {
      content: message || '',
      user: toUser.email,
      fromUserId: fromUser,
      registerDate: date,
      toUserId: toUser.userId,
      type: 'TEXT',
    }
    dispatch({ type: ACTIONS.INSERT_MESSAGE_TO_CURRENT_CHAT, payload: msg })
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
    receiveMessage,
    sendMessage: sendMsg,
    selectUser,
  }
}

export default useChatMessages
