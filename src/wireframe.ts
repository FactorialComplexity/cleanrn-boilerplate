import StoreManager from './utils/StoreManager'

import APIClient from './data/APIClient'
import LocalStorage from './utils/LocalStorage'

import authModule from './domain/auth'

import rootNavigationModule from './presentation/rootNavigation'
import rootContainerModule from './presentation/rootContainer'
import authFlowModule from './presentation/authFlow'
import mainFlowModule from './presentation/mainFlow'

import config from './config'

export default function () {
  const storeManager = new StoreManager()

  // Data
  const api = new APIClient(config.baseUrl)
  const localStorage = new LocalStorage(config.storageName)
  const data = {
    api,
    localStorage
  }

  // Domain
  const auth = authModule(storeManager, data.localStorage, data.api)
  const domain = {
    auth
  }

  // Presentation
  const authFlow = authFlowModule(storeManager, domain.auth)
  const mainFlow = mainFlowModule(domain.auth)
  const rootNavigation = rootNavigationModule(storeManager, domain.auth, authFlow, mainFlow)
  const rootContainer = rootContainerModule(storeManager, rootNavigation)
  const presentation = {
    rootContainer
  }

  return {
    storeManager,
    data,
    domain,
    presentation
  }
}
