import { connect } from 'react-redux'
import { bindActionCreators, Dispatch } from 'redux'

import AccountScreenView from '../views/AccountScreenView'

// Types imports
import { AuthModule } from '_app/domain/auth'

export default function AccountScreenFactory (auth: AuthModule) {
  const logout = () => auth.actions.logout({ isForcedByServer: false })

  function mapStateToProps (state: any) {
    const user = auth.selectors.user(state)
    return {
      isLoggedIn: !!user,
      email: user ? user.email : undefined
    }
  }

  function mapDispatchToProps (dispatch: Dispatch) {
    return bindActionCreators(
      {
        logout
      },
      dispatch
    )
  }

  return connect(
    mapStateToProps,
    mapDispatchToProps
  )(AccountScreenView)
}

export type AccountScreen = ReturnType<typeof AccountScreenFactory>
