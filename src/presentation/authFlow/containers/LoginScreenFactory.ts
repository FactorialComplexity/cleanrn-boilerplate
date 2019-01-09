import { connect } from 'react-redux'
import { bindActionCreators, Dispatch } from 'redux'

import LoginScreenView from '../views/LoginScreenView'

// Types imports
import { AuthModule } from '_app/domain/auth'

export default function LoginScreenFactory (auth: AuthModule) {
  function mapStateToProps (state: any) {
    return {
      isAuthenticating: auth.selectors.isAuthenticating(state),
      error: auth.selectors.error(state)
    }
  }

  function mapDispatchToProps (dispatch: Dispatch) {
    return bindActionCreators(
      {
        loginWithEmail: auth.actions.loginWithEmail.started,
        dismissError: auth.actions.dismissError
      },
      dispatch
    )
  }

  return connect(
    mapStateToProps,
    mapDispatchToProps
  )(LoginScreenView)
}

export type LoginScreen = ReturnType<typeof LoginScreenFactory>
