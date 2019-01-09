import { createStore, applyMiddleware, combineReducers, Store, Middleware, Reducer } from 'redux'
import createSagaMiddleware, { SagaIterator } from 'redux-saga'

export default class StoreManager {
  sagas: Array<() => SagaIterator>
  middleware: Array<Middleware<any, any, any>>
  reducers: { [key: string]: (state: any, action: any) => any }

  // @ts-ignore
  store: Store

  constructor () {
    this.sagas = []
    this.middleware = []
    this.reducers = {}
  }

  addSaga (saga: () => SagaIterator) {
    this.sagas.push(saga)
  }

  addReducer (key: string, reducer: (state: any, action: any) => any) {
    if (!this.reducers) {
      this.reducers = {}
    }

    if (this.reducers[key]) {
      throw new Error(`Reducer for key "${key}" is already set`)
    }

    this.reducers[key] = reducer
  }

  addMiddleware (middleware: Middleware<any, any, any>) {
    this.middleware.push(middleware)
  }

  protected createStore (reducer: Reducer, middleware: Array<Middleware>): Store {
    return createStore(reducer, {}, applyMiddleware(...middleware))
  }

  init () {
    if (this.store) {
      throw new Error('StoreManager is already initialized')
    }

    if (!this.reducers) {
      console.warn('StoreManager was initialized without reducers')
    }

    const rootReducer = combineReducers(this.reducers)
    const sagaMiddleware = createSagaMiddleware()
    const middleware = this.middleware.concat(sagaMiddleware)
    this.store = this.createStore(rootReducer, middleware)

    this.sagas.forEach(saga => sagaMiddleware.run(saga))
  }
}
