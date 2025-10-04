import {createPool} from 'mysql2/promise';
import {
  BD_HOST,
  BD_DATABASE,
  BD_USER,
  BD_PASSWORD,
  BD_PORT
} from './config.js';

export const sql =  createPool({
  host: BD_HOST,
  database: BD_DATABASE,
  user: BD_USER,
  password: BD_PASSWORD,
  port: BD_PORT,
  ssl: {
    rejectUnauthorized: false
  },
  waitForConnections: true,           
  connectionLimit: 5,               
  queueLimit: 0  
});
