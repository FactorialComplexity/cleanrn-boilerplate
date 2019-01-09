import React from 'react'
import { View, StatusBar } from 'react-native'
import { Icon, Container, Header, Body, Title } from 'native-base'

// Types imports
import { AccountScreen } from '../../containers/AccountScreenFactory'
import { NavigationScreenProp, NavigationScreenOptions } from 'react-navigation'

export default function AccountScreenNavigationFactory (AccountScreen: AccountScreen) {
  class AccountScreenNavigation extends React.Component<{
    navigation: NavigationScreenProp<{}>
  }> {
    static navigationOptions: NavigationScreenOptions = {
      tabBarIcon: ({ tintColor }) => (
        <Icon name='person' style={{ color: tintColor, fontSize: 24 }} />
      )
    }

    render () {
      const { navigation } = this.props
      return (
        <View style={{ flex: 1 }}>
          <StatusBar barStyle='dark-content' />
          <Container>
            <Header>
              <Body>
                <Title>Account</Title>
              </Body>
            </Header>

            <AccountScreen />
          </Container>
        </View>
      )
    }
  }

  return AccountScreenNavigation
}
