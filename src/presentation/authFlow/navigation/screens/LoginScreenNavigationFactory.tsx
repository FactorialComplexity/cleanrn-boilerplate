import React from 'react'
import { View, StatusBar } from 'react-native'

// Types imports
import { LoginScreen } from '../../containers/LoginScreenFactory'
import { NavigationScreenProp } from 'react-navigation'

export default function LogincreenNavigationFactory (LoginScreen: LoginScreen) {
  class LoginScreenNavigation extends React.Component<{
    navigation: NavigationScreenProp<{}>
  }> {
    static navigationOptions = {
      title: 'Login'
    }

    render () {
      const { navigation } = this.props
      return (
        <View style={{ flex: 1 }}>
          <StatusBar barStyle='dark-content' />
          <LoginScreen />
        </View>
      )
    }
  }

  return LoginScreenNavigation
}
