import { connect } from 'react-redux'
import { bindActionCreators, Dispatch } from 'redux'

import HomeScreenView from '../views/HomeScreenView'

// Types imports

export default function HomeScreenFactory () {
  function mapStateToProps (state: any) {
    return {}
  }

  function mapDispatchToProps (dispatch: Dispatch) {
    return bindActionCreators({}, dispatch)
  }

  return connect(
    mapStateToProps,
    mapDispatchToProps
  )(HomeScreenView)
}

export type HomeScreen = ReturnType<typeof HomeScreenFactory>
