import React, { FunctionComponent, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Redirect, Route, RouteProps, useLocation } from 'react-router-dom'
import { userAuthSelector } from '../redux/Auth/AuthSelectors'

export interface ProtectedRouteProps extends RouteProps {
  authenticationPath: string
}

const ProtectedRoute: FunctionComponent<ProtectedRouteProps> = (props) => {
  const user = useSelector(userAuthSelector)
  const location = useLocation()
  const isAuthenticated = !!user.token

  const { authenticationPath } = props

  useEffect(() => {
    if (window.tpl) {
      window.tpl.load()
      dispatchEvent(new Event('load'))
    }
  }, [location])

  if (!isAuthenticated) {
    const renderComponent = () => <Redirect to={{ pathname: authenticationPath }} />
    return <Route {...props} component={renderComponent} render={undefined} />
  }

  return <Route {...props} />
}

export default ProtectedRoute
