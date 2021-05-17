import React, { FunctionComponent, useEffect } from 'react'
import useChatMessages from 'hooks/useChatMessages'
import User from './User/User'
import useRouter from 'hooks/commons/useRouter'
import { Link, useRouteMatch } from 'react-router-dom'
import styled from 'styled-components'
import Loader from 'react-loader-spinner'
import Fade from 'react-reveal/Fade'

const Users: FunctionComponent<{}> = () => {
  const { query } = useRouter()

  const { users, loadingUsers, getUserList, selectUser } = useChatMessages()

  useEffect(() => {
    getUserList().then(() => {
      const userId = Number(query && (query as { userid: string }).userid)
      if (userId) {
        selectUser(userId)
      }
    })
  }, [])

  useEffect(() => {
    if (users.length > 0) {
      const userId = Number(query && (query as { userid: string }).userid)
      if (userId) {
        selectUser(userId)
      }
    }
  }, [query])

  return (
    <>
      {loadingUsers && <h6 style={{ paddingTop: '6px', paddingLeft: '10px' }}>Loading ...</h6>}
      {users.map((u: any) => (
        <Link key={u.userId} to={`/user/chat/${u.userId}`}>
          <User data={u} />
        </Link>
      ))}
    </>
  )
}

export default Users
