import React, { useEffect, FunctionComponent, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { HubConnection } from '@microsoft/signalr'

import ChatService from '../../services/ChatService'

import { addMessageChat, getFavoriteUsers, sendMessageChat, setUserSelected } from '../../redux/Chat/ChatThunks'
import { getUserListSelector, getUserSelector } from '../../redux/Chat/ChatSelectors'

import LayoutMain from '../LayoutMain/LayoutMain'
import UserStatus from './UserStatus/UserStatus'

import Conversation from './Conversation/Conversation'

import { MessageType, UserStatusMessagesType, OnReceiveMessageType } from '../../types/MessagesType.d'
import { userIdSelector } from '../../redux/User/UserSelectors'

const Messages: FunctionComponent<{}> = () => {
  const dispatch = useDispatch()

  const { userid } = useParams<{ userid: string }>()

  const [connection, setConnection] = useState<HubConnection | null>(null)

  const currentUserId: number = useSelector(userIdSelector)
  const listOfUser: UserStatusMessagesType[] = useSelector(getUserListSelector)
  const userSelected = useSelector(getUserSelector)

  const fieldRef = React.useRef<HTMLDivElement>(null)

  let lastMessage = ''

  useEffect(() => {
    dispatch(getFavoriteUsers())

    if (userid) {
      showUserChat(parseInt(userid, 10))
    } else if (userSelected) {
      showUserChat(userSelected.userId)
    } else {
      dispatch(setUserSelected(null))
    }

    ChatService.getConnectionChat().then((conn) => {
      setConnection(conn)
    })
  }, [])

  useEffect(() => {
    if (connection) {
      connection
        .start()
        .then(() => {
          connection.on('ReceiveMessage', (message: OnReceiveMessageType) => {
            onReceiveMessage(message)
          })

          connection.on('NodifyOnline', (data: any) => {
            console.log('ONLINE')
            console.log(data)
          })
        })
        .catch((e) => console.log('Connection failed: ', e))
    }
  }, [connection])

  const onReceiveMessage = (message: OnReceiveMessageType) => {
    console.log(message)

    if (lastMessage !== message.message) {
      const registerDate = message.registerDate ? message.registerDate : new Date().toISOString()

      if (userSelected) {
        const chatMessage: MessageType = {
          user: userSelected.email,
          connectionId: userSelected.connectionId,
          type: 'TEXT',
          message: message.message,
          registerDate,
          fromUserId: userSelected.userId,
          senderUserId: userSelected.userId,
          toUserId: currentUserId,
          receivedUserId: currentUserId,
        }

        dispatch(addMessageChat(chatMessage))

        lastMessage = message.message
      }
    }
  }

  const showUserChat = (userId: number) => {
    dispatch(setUserSelected(userId))
  }

  const sendMessage = async (message: string) => {
    if (userSelected?.email) {
      const chatMessage: MessageType = {
        user: userSelected.email,
        connectionId: userSelected.connectionId,
        type: 'TEXT',
        message,
        registerDate: new Date().toISOString(),
        fromUserId: currentUserId,
        senderUserId: currentUserId,
        toUserId: userSelected.userId,
        receivedUserId: userSelected.userId,
      }

      try {
        dispatch(sendMessageChat(chatMessage))
      } catch (e) {
        console.log('Sending message failed.', e)
      }
    }
  }

  // const handleFilterByUsers = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   dispatch(setUsersFilter(e.target.value))
  // }

  return (
    <>
      <LayoutMain>
        <div className="content-grid">
          <div className="grid fixed-grid">
            <div className="account-hub-content">
              <div className="section-header">
                <div className="section-header-info">
                  <p className="section-pretitle">My Profile</p>

                  <h2 className="section-title">Messages</h2>
                </div>
              </div>

              <div className="chat-widget-wrap">
                <div className="chat-widget static">
                  <div className="chat-widget-messages">
                    {listOfUser &&
                      listOfUser.map((data: UserStatusMessagesType) => {
                        const isActive = userSelected?.userId === data.userId || false

                        return <UserStatus key={data.userId} statusData={data} active={isActive} onSelected={showUserChat} />
                      })}
                  </div>

                  <form className="chat-widget-form" style={{ marginTop: '31px' }}>
                    <div className="interactive-input small">
                      <input
                        type="text"
                        id="chat-widget-search-2"
                        name="chat_widget_search_2"
                        placeholder="Search users..."
                        // onChange={handleFilterByUsers}
                      />

                      <div className="interactive-input-icon-wrap">
                        <svg className="interactive-input-icon icon-magnifying-glass">
                          <use xlinkHref="#svg-magnifying-glass" />
                        </svg>
                      </div>

                      <div className="interactive-input-action">
                        <svg className="interactive-input-action-icon icon-cross-thin">
                          <use xlinkHref="#svg-cross-thin" />
                        </svg>
                      </div>
                    </div>
                  </form>
                </div>

                <div className="chat-widget" ref={fieldRef}>
                  {!!userSelected && <Conversation key={userSelected.userId} sendMessage={sendMessage} />}

                  {!userSelected && (
                    <div className="chat-widget-header">
                      <h2>No user Selected</h2>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </LayoutMain>
    </>
  )
}

export default Messages
