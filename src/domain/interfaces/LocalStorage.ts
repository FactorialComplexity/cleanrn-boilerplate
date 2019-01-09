export default interface LocalStorage {
  writeData (data: { [key: string]: string }): Promise<void>,
  readData<KeyT extends string> (keys: Array<KeyT>): Promise<{ [key in KeyT]: string }>,
  removeData (keys: Array<string>): Promise<void>
}
