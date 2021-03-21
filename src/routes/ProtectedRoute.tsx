import React, { FunctionComponent, useEffect } from 'react'
import { Redirect, Route, RouteProps, useLocation } from 'react-router-dom'
import useAppContext from '../hooks/useAppContext'
import useAuth from '../hooks/useAuth'

export interface ProtectedRouteProps extends RouteProps {
  authenticationPath: string
  title?: string
}

const ProtectedRoute: FunctionComponent<ProtectedRouteProps> = (props) => {
  const { isAuthenticated, checkAuthenticated } = useAuth()

  const { authenticationPath, title = '' } = props

  useAppContext({ changeTitle: title })

  const location = useLocation()

  useEffect(() => {
    checkAuthenticated().then(() => {
      if (window.tpl) {
        window.tpl.load(['sidebar'])
      }
    })
  }, [location, isAuthenticated, checkAuthenticated])

  if (!isAuthenticated) {
    const renderComponent = () => <Redirect to={{ pathname: authenticationPath }} />
    return <Route {...props} component={renderComponent} render={undefined} />
  }

  return <Route {...props} />
}

export default ProtectedRoute
