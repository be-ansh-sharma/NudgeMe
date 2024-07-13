import * as SQLite from 'expo-sqlite';

const db = await SQLite.openDatabaseAsync('db');

await db.execAsync(`
  CREATE TABLE IF NOT EXISTS nudgeme (id INTEGER PRIMARY KEY NOT NULL, occurance TEXT NOT NULL, time INTEGER, message TEXT NOT NULL, upcomingNotifee TEXT, skipstarttime TEXT, skipendtime TEXT);
`);
