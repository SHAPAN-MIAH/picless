import { useContext, useEffect } from 'react'
import AuthService from '../services/AuthService'
import AuthorizationContext from '../context/AuthorizationContext'

const useAuth = () => {
  const { isAuthenticated, setIsAuthenticated } = useContext(AuthorizationContext.context)

  useEffect(() => {
    AuthService.currentSession().then(async (user: any) => {
      const userTokenId = await user.getIdToken()

      if (userTokenId) setIsAuthenticated(true)
      else setIsAuthenticated(false)
    })
  }, [setIsAuthenticated])

  return {
    isAuthenticated,
    setIsAuthenticated,
  }
}

export default useAuth
