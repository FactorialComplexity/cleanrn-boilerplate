import { AsyncStorage } from 'react-native'

export default class LocalStorageImpl {
  storageName: string

  constructor (storageName: string) {
    this.storageName = storageName
  }

  async writeData (data: { [key: string]: string }): Promise<void> {
    await Promise.all(
      Object.keys(data).map(key => AsyncStorage.setItem(this._keyInStorage(key), data[key]))
    )
  }

  async readData<KeyT extends string> (keys: Array<KeyT>): Promise<{ [key in KeyT]: string }> {
    const result = await Promise.all(
      keys.map(key => {
        return AsyncStorage.getItem(this._keyInStorage(key)).then(value => {
          return { [key]: value }
        })
      })
    )

    return result.reduce((o: { [key in KeyT]: string }, r) => Object.assign(r, o), {} as {
      [key in KeyT]: string
    })
  }

  async removeData (keys: Array<string>): Promise<void> {
    await Promise.all(keys.map(key => AsyncStorage.removeItem(this._keyInStorage(key))))
  }

  private _keyInStorage (key: string) {
    return `${this.storageName}:${key}`
  }
}
