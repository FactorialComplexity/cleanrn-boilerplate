import { call, put, select, takeLatest, all } from 'redux-saga/effects'
import actionCreatorFactory, { isType } from 'typescript-fsa'

// Type imports
import { SagaIterator } from 'redux-saga'
import { Action } from 'redux'
import StoreManager from '_app/utils/StoreManager'
import { AuthResponse, User } from '_app/data/APIClient/types/auth'
import LocalStorage from './interfaces/LocalStorage'

// Interfaces
export interface IAuthAPI {
  accessToken?: string

  onAuthenticationLost (handler: Function): void
  loginWithEmail (email: string, password: string): Promise<AuthResponse>
}

// Payloads
export interface LoginWithEmailPayload {
  email: string
  password: string
}

export interface LoginWithEmailSuccessPayload {
  accessToken: string
  user: User
}

export interface LogoutPayload {
  isForcedByServer?: boolean
}

export interface AuthChangePayload {
  accessToken: string | null
  user: User | null
  isRestored?: boolean
}

// State types
enum ActiveOperation {
  loginWithEmail
}

interface StateAuth {
  user: User | null
  error: Error | undefined
  activeOperation: ActiveOperation | undefined
  logoutWasForcedByServer: boolean | undefined
}

interface State {
  auth: StateAuth
}

// Module
export default function authModule (
  storeManager: StoreManager,
  localStorage: LocalStorage,
  api: IAuthAPI
) {
  const actionCreator = actionCreatorFactory('auth')

  // Actions
  const loginWithEmail = actionCreator.async<LoginWithEmailPayload, LoginWithEmailSuccessPayload>(
    'LOGIN_WITH_EMAIL'
  )

  const logout = actionCreator<LogoutPayload>('LOGOUT')

  const authChange = actionCreator<AuthChangePayload>('AUTH_CHANGE')
  const dismissError = actionCreator<void>('DISMISS_ERROR')

  // Sagas
  /** Load authentication data from local storage and dispatch AUTH_CHANGE */
  function* loadAuthDataSaga () {
    const authData = yield call([localStorage, localStorage.readData], ['accessToken', 'user'])
    if (authData.user && authData.accessToken) {
      yield put(
        authChange({
          accessToken: authData.accessToken,
          user: JSON.parse(authData.user),
          isRestored: true
        })
      )
    } else {
      yield put(
        authChange({
          accessToken: null,
          user: null,
          isRestored: true
        })
      )
    }
  }

  /** Perform loginWithEmail and dispatch LOGIN_WITH_EMAIL_DONE or LOGIN_WITH_EMAIL_FAILED */
  function* loginWithEmailSaga (params: LoginWithEmailPayload): SagaIterator {
    try {
      if (params.email.length === 0) {
        throw new Error('Email should not be empty')
      }

      if (params.password.length === 0) {
        throw new Error('Password should not be empty')
      }

      const response: AuthResponse = yield call(
        [api, api.loginWithEmail],
        params.email,
        params.password
      )

      yield put(
        loginWithEmail.done({
          params,
          result: {
            accessToken: response.accessToken,
            user: response.user
          }
        })
      )
    } catch (e) {
      yield put(loginWithEmail.failed(e))
    }
  }

  /** Dispatch AUTH_CHANGE on successful login with email */
  function* loginWithEmailSuccessSaga (result: LoginWithEmailSuccessPayload) {
    yield put(
      authChange({
        accessToken: result.accessToken,
        user: result.user
      })
    )
  }

  /** Dispatch AUTH_CHANGE on logout */
  function* logoutSaga (payload: LogoutPayload) {
    yield put(
      authChange({
        accessToken: null,
        user: null
      })
    )
  }

  /** Set access token for APIClient and save data to local storage */
  function* authChangeSaga (payload: AuthChangePayload): SagaIterator {
    api.accessToken = payload.accessToken || undefined

    if (!payload.isRestored) {
      if (payload.accessToken) {
        localStorage.writeData({
          accessToken: payload.accessToken,
          user: JSON.stringify(payload.user)
        })
      } else {
        localStorage.removeData(['accessToken'])
      }
    }
  }

  // Register all sagas
  storeManager.addSaga(function* () {
    yield all([
      call(loadAuthDataSaga),

      takeLatest(loginWithEmail.started, action => loginWithEmailSaga(action.payload)),

      // Dispatch authChange
      takeLatest(loginWithEmail.done, action => loginWithEmailSuccessSaga(action.payload.result)),
      takeLatest(logout, action => logoutSaga(action.payload)),

      takeLatest(authChange, action => authChangeSaga(action.payload))
    ])
  })

  // Register handler to be called when APIClien detects that existing login credentials
  // are no longer valid
  api.onAuthenticationLost(() => {
    storeManager.store.dispatch(logout({ isForcedByServer: true }))
  })

  const initialState: StateAuth = {
    user: null,
    error: undefined,
    activeOperation: undefined,
    logoutWasForcedByServer: undefined
  }

  // Reducer
  storeManager.addReducer(
    'auth',
    (state = initialState, action: Action): StateAuth => {
      if (isType(action, loginWithEmail.started)) {
        return {
          ...state,
          user: null,
          activeOperation: ActiveOperation.loginWithEmail
        }
      }

      if (isType(action, loginWithEmail.done)) {
        return {
          ...state,
          activeOperation: undefined
        }
      }

      if (isType(action, loginWithEmail.failed)) {
        return {
          ...state,
          error: action.payload,
          activeOperation: undefined
        }
      }

      if (isType(action, dismissError)) {
        return {
          ...state,
          error: undefined
        }
      }

      if (isType(action, authChange)) {
        const { accessToken, user } = action.payload
        return {
          ...state,
          logoutWasForcedByServer: false,
          accessToken,
          user
        }
      }

      if (isType(action, logout)) {
        return {
          ...initialState,
          logoutWasForcedByServer: action.payload.isForcedByServer || false
        }
      }

      return state
    }
  )

  return {
    actions: {
      loginWithEmail,
      logout,
      authChange,
      dismissError
    },

    selectors: {
      isLoggedIn: (state: State) => state.auth.user !== null,
      activeOperation: (state: State) => state.auth.activeOperation,
      isAuthenticating: (state: State) => state.auth.activeOperation !== undefined,
      error: (state: State) => state.auth.error,
      user: (state: State) => state.auth.user
    }
  }
}

export type AuthModule = ReturnType<typeof authModule>
