import { createBottomTabNavigator } from 'react-navigation'

import HomeScreenNavigationFactory from './screens/HomeScreenNavigationFactory'
import AccountScreenNavigationFactory from './screens/AccountScreenNavigationFactory'

// Types imports
import { HomeScreen } from '../containers/HomeScreenFactory'
import { AccountScreen } from '../containers/AccountScreenFactory'

export default function MainNavigatorFactory (HomeScreen: HomeScreen, AccountScreen: AccountScreen) {
  const MainNavigator = createBottomTabNavigator(
    {
      Home: {
        screen: HomeScreenNavigationFactory(HomeScreen)
      },
      Account: {
        screen: AccountScreenNavigationFactory(AccountScreen)
      }
    },
    {
      initialRouteName: 'Home'
    }
  )

  return MainNavigator
}
