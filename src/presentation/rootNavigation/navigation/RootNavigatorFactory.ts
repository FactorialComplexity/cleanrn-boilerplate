import { createSwitchNavigator } from 'react-navigation'
import LoadingScreenView from '../views/LoadingScreenView'

// Types imports
import { INavigatorProvidingModule } from '..'

export default function RootNavigatorFactory (
  authFlow: INavigatorProvidingModule,
  mainFlow: INavigatorProvidingModule
) {
  const RootNavigator = createSwitchNavigator({
    Loading: {
      screen: LoadingScreenView
    },
    AuthNav: {
      screen: authFlow.Navigator
    },
    MainNav: {
      screen: mainFlow.Navigator
    }
  })

  return RootNavigator
}
