import sqlite3 from 'sqlite3';

export const db = new sqlite3.Database('./sqlite.db');

db.run(`
  CREATE TABLE IF NOT EXISTS addresses (
    id INTEGER PRIMARY KEY,
    addressLine TEXT,
    city TEXT,
    state TEXT,
    country TEXT,
    mobilePhone TEXT,
    fullName TEXT,
    zipCode TEXT,
    label TEXT
  )
`);


export default db;
