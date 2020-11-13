import React, { useEffect, FunctionComponent } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { getFavoriteUsers, setUserSelected, setUsersFilter } from '../../redux/Chat/ChatThunks'
import { loadingSelector, getUserListSelector, getUserSelector } from '../../redux/Chat/ChatSelectors'

import LayoutMain from '../LayoutMain/LayoutMain'
import UserStatus from './UserStatus/UserStatus'

import Conversation from './Converation/Conversation'

import { UserStatusMessagesType } from '../../types/ChatType.d'

const Messages: FunctionComponent<{}> = () => {
  const dispatch = useDispatch()

  const loading: boolean = useSelector(loadingSelector)
  const listOfUser: UserStatusMessagesType[] = useSelector(getUserListSelector)
  const userSelected = useSelector(getUserSelector)

  // const fieldRef = React.useRef<HTMLDivElement>(null)

  // const showMessages = () => {
  //   const { current } = fieldRef
  //   if (current) {
  //     current.scrollIntoView()
  //   }
  // }

  useEffect(() => {
    dispatch(getFavoriteUsers())

    return function unMount() {
      dispatch(setUserSelected(null))
      dispatch(setUsersFilter(''))
    }
  }, [])

  const showUserChat = (userId: number) => {
    dispatch(setUserSelected(userId))
  }

  const handleFilterByUsers = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setUsersFilter(e.target.value))
  }

  return (
    <>
      <LayoutMain>
        <div className="content-grid">
          <div className="grid ">
            <div className="account-hub-content">
              <div className="section-header">
                <div className="section-header-info">
                  <p className="section-pretitle">My Profile</p>

                  <h2 className="section-title">Messages</h2>
                </div>

                <div className="section-header-actions">
                  <p className="section-header-action">Mark all as Read</p>

                  <p className="section-header-action">Settings</p>
                </div>
              </div>

              <div className="chat-widget-wrap">
                <div className="chat-widget static">
                  <div className="chat-widget-messages" data-simplebar>
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

                {/* <div className="chat-widget" ref={fieldRef}> */}
                <div className="chat-widget">
                  {!!userSelected && <Conversation user={userSelected} />}
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
