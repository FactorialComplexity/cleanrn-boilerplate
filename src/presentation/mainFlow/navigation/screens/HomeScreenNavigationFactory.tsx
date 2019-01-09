import React from 'react'
import { View, StatusBar } from 'react-native'
import { Icon, Container, Header, Body, Title } from 'native-base'

// Types imports
import { HomeScreen } from '../../containers/HomeScreenFactory'
import { NavigationScreenProp, NavigationScreenOptions } from 'react-navigation'

export default function HomeScreenNavigationFactory (HomeScreen: HomeScreen) {
  class HomeScreenNavigation extends React.Component<{
    navigation: NavigationScreenProp<{}>
  }> {
    static navigationOptions: NavigationScreenOptions = {
      tabBarIcon: ({ tintColor }) => <Icon name='home' style={{ color: tintColor, fontSize: 24 }} />
    }

    render () {
      const { navigation } = this.props
      return (
        <View style={{ flex: 1 }}>
          <StatusBar barStyle='dark-content' />
          <Container>
            <Header>
              <Body>
                <Title>Home</Title>
              </Body>
            </Header>

            <HomeScreen />
          </Container>
        </View>
      )
    }
  }

  return HomeScreenNavigation
}
