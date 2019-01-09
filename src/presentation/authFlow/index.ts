import LoginScreenFactory from './containers/LoginScreenFactory'
import AuthNavigatorFactory from './navigation/AuthNavigatorFactory'

// Types imports
import StoreManager from '_app/utils/StoreManager'
import { AuthModule } from '_app/domain/auth'

export default function authFlowModule (storeManager: StoreManager, auth: AuthModule) {
  const LoginScreen = LoginScreenFactory(auth)

  const Navigator = AuthNavigatorFactory(LoginScreen)
  return {
    Navigator
  }
}

export type AuthFlowModule = ReturnType<typeof authFlowModule>
