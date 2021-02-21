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
    checkAuthenticated()

    if (window.tpl) {
      window.tpl.load([
        'sidebar',
        'accordions',
        'form-rating',
        'form-counter',
        'form-switch',
        'form-input',
        'interactive-input',
        'user-avatar',
      ])
    }
  }, [location, isAuthenticated])

  if (!isAuthenticated) {
    const renderComponent = () => <Redirect to={{ pathname: authenticationPath }} />
    return <Route {...props} component={renderComponent} render={undefined} />
  }

  return <Route {...props} />
}

export default ProtectedRoute
