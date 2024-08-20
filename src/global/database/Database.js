import * as SQLite from 'expo-sqlite';

export default class Database {
  constructor() {
    this._db = null;
  }

  init = async () => {
    this._db = await SQLite.openDatabaseAsync('db');
    this._db.execAsync(`
        CREATE TABLE IF NOT EXISTS nudgeme (id INTEGER PRIMARY KEY NOT NULL, status TEXT, occurance TEXT NOT NULL, hours INTEGER, minutes INTEGER, message TEXT NOT NULL);
      `);
    return this._db;
  };
}
