import RootContainerFactory from './containers/RootContainerFactory'

// Types imports
import StoreManager from '_app/utils/StoreManager'

export interface IRootComponentProvider {
  RootComponent: React.ComponentClass
}

export default function rootContainerModule (
  storeManager: StoreManager,
  rootComponentProvider: IRootComponentProvider
) {
  return {
    RootContainer: RootContainerFactory(storeManager, rootComponentProvider)
  }
}
