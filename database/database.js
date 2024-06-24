import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabaseSync('todo.db');

export const initDB = () => {
  db.transaction(tx => {
    tx.executeSql(
      `CREATE TABLE IF NOT EXISTS todos (
        id INTEGER PRIMARY KEY NOT NULL,
        title TEXT NOT NULL,
        description TEXT,
        isDone BOOLEAN NOT NULL
      );`,
      [],
      () => { console.log('Table created successfully'); },
      (_, error) => { console.log('Error creating table:', error); return true; }
    );
  });
};

export const getDB = () => db;
