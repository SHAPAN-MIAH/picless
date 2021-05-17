import { useDispatch } from 'react-redux'
import { UserStatusMessagesType, MessageType } from '../types/MessagesType'

import useUser from './useUser'

import { sendMessageChat } from '../redux/Chat/ChatThunks'

export interface UserStatusMessagesOptionalType {
  email: string
  userId: string
  connectionId?: string | null
}

const useChat = () => {
  const dispatch = useDispatch()

  const { userId } = useUser()

  const sendMessage = async (
    userSelected: UserStatusMessagesType | UserStatusMessagesOptionalType | null = null,
    message: string
  ) => {
    return new Promise<void>((resolve, reject) => {
      if (userSelected?.email) {
        const chatMessage: MessageType = {
          user: userSelected.email,
          connectionId: userSelected.connectionId || null,
          type: 'TEXT',
          message,
          registerDate: new Date().toISOString(),
          fromUserId: userId,
          // senderUserId: userId,
          toUserId: userSelected.userId.toString(),
          // receivedUserId: userSelected.userId.toString(),
        }

        try {
          dispatch(sendMessageChat(chatMessage))

          resolve()
        } catch (e) {
          console.log('Sending message failed.', e)
          reject(e)
        }
      }
    })
  }

  return {
    sendMessage,
  }
}

export default useChat
