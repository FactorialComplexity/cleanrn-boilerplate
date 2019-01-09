import MainNavigatorFactory from './navigation/MainNavigatorFactory'

import HomeScreenFactory from './containers/HomeScreenFactory'
import AccountScreenFactory from './containers/AccountScreenFactory'

// Types imports
import { AuthModule } from '_app/domain/auth'

export default function mainFlowModule (auth: AuthModule) {
  const HomeScreen = HomeScreenFactory()
  const AccountScreen = AccountScreenFactory(auth)

  const MainNavigator = MainNavigatorFactory(HomeScreen, AccountScreen)

  return {
    navigators: {
      MainNavigator
    },
    Navigator: MainNavigator
  }
}

export type MainFlowModule = ReturnType<typeof mainFlowModule>
