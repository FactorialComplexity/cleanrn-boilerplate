/* global __DEV__ */
import logger from 'redux-logger'

import buildWireframe from './wireframe'

export default function main () {
  const wireframe = buildWireframe()
  const {
    storeManager,
    presentation: {
      rootContainer: { RootContainer }
    }
  } = wireframe

  if (__DEV__) {
    storeManager.addMiddleware(logger)
  }

  storeManager.init()
  return RootContainer
}
