import React from 'react'
import { createStackNavigator } from 'react-navigation'
import LoginScreenNavigationFactory from './screens/LoginScreenNavigationFactory'

// Types imports
import { LoginScreen } from '../containers/LoginScreenFactory'

export default function AuthNavigatorFactory (LoginScreen: LoginScreen) {
  const AuthNavigator = createStackNavigator(
    {
      Login: {
        screen: LoginScreenNavigationFactory(LoginScreen)
      }
    },
    {
      headerMode: 'screen'
    }
  )

  return AuthNavigator
}
