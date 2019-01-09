import { AuthResponse } from './types/auth'

export default class APIClient {
  private baseURL: string
  private _onAuthenticationLost?: Function

  accessToken?: string

  constructor (baseURL: string) {
    this.baseURL = baseURL
    if (this.baseURL[this.baseURL.length - 1] !== '/') {
      this.baseURL += '/'
    }
  }

  async loginWithEmail (email: string, password: string): Promise<AuthResponse> {
    // TODO: actual implementation
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve({
          user: {
            email
          },
          accessToken: new Date().getTime().toString()
        })
      }, 1000)
    })
  }

  onAuthenticationLost (handler: Function) {
    this._onAuthenticationLost = handler
  }
}
