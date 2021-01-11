import { useContext, useEffect } from 'react'
import UserContext from '../context/UserContext'
import UserService from '../services/UserService'

const useUser = () => {
  const { user, setUser } = useContext(UserContext.context)

  useEffect(() => {
    if (!user) {
      UserService.getUserProfile().then((userData) => {
        setUser(userData)
      })
    }
  }, [])

  return {
    user,
  }
}

export default useUser
