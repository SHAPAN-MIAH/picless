import React, { FunctionComponent } from 'react'
import { useSelector } from 'react-redux'
import { Redirect, Route, RouteProps } from 'react-router-dom'
import { userAuthSelector } from '../redux/Auth/AuthSelectors'

export interface ProtectedRouteProps extends RouteProps {
  authenticationPath: string
}

const ProtectedRoute: FunctionComponent<ProtectedRouteProps> = (props) => {
  const user = useSelector(userAuthSelector)
  const isAuthenticated = !!user.token

  console.log(`IsAuthenticated: ${isAuthenticated}`)

  const { authenticationPath } = props

  if (!isAuthenticated) {
    const renderComponent = () => <Redirect to={{ pathname: authenticationPath }} />
    return <Route {...props} component={renderComponent} render={undefined} />
  }
  return <Route {...props} />
}

export default ProtectedRoute
