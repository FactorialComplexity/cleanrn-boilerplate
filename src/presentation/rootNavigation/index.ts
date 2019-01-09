import {
  NavigationActions,
  NavigationAction,
  NavigationState,
  NavigationContainer
} from 'react-navigation'
import {
  reduxifyNavigator,
  createReactNavigationReduxMiddleware
} from 'react-navigation-redux-helpers'
import { connect } from 'react-redux'

import RootNavigatorFactory from './navigation/RootNavigatorFactory'

// Type imports
import StoreManager from '_app/utils/StoreManager'
import { AuthModule } from '_app/domain/auth'

// Interfaces
export interface INavigatorProvidingModule {
  Navigator: NavigationContainer
}

export default function rootNavigationModule (
  storeManager: StoreManager,
  auth: AuthModule,
  authFlow: INavigatorProvidingModule,
  mainFlow: INavigatorProvidingModule
) {
  const RootNavigator = RootNavigatorFactory(authFlow, mainFlow)

  // Middleware
  const middleware = createReactNavigationReduxMiddleware('root', (state: any) => state.rootNav)
  storeManager.addMiddleware(middleware)

  // Reducer
  const initialState = {
    routeName: 'Loading',
    state: RootNavigator.router.getStateForAction(RootNavigator.router.getActionForPathAndParams(
      'Loading'
    ) as NavigationAction)
  }

  const { authChange } = auth.actions

  storeManager.addReducer('rootNav', (state = initialState, action) => {
    let nextState
    switch (action.type) {
      case authChange.type:
        if (action.payload.user && state.routeName !== 'MainNav') {
          nextState = {
            routeName: 'MainNav',
            state: RootNavigator.router.getStateForAction(
              NavigationActions.navigate({ routeName: 'MainNav' })
            )
          }
        } else if (!action.payload.user && state.routeName !== 'AuthNav') {
          nextState = {
            routeName: 'AuthNav',
            state: RootNavigator.router.getStateForAction(
              NavigationActions.navigate({ routeName: 'AuthNav' })
            )
          }
        }
        break
      default:
        if (state) {
          nextState = {
            routeName: state.routeName,
            state: RootNavigator.router.getStateForAction(action, state.state)
          }
        }
        break
    }

    // Simply return the original `state` if `nextState` is null or undefined.
    return nextState || state
  })

  // Container
  const RootNavigatorRedux = reduxifyNavigator(RootNavigator, 'root')
  const mapStateToProps = (state: any) => ({
    state: state.rootNav.state as NavigationState
  })

  return {
    RootComponent: connect(mapStateToProps)(RootNavigatorRedux as any) // HACK: types issue
  }
}

export type RootNavigationModule = ReturnType<typeof rootNavigationModule>
