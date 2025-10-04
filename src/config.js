import {config} from 'dotenv'
config()

console.log('Variables de entorno:', {
  BD_HOST: process.env.BD_HOST,
  BD_DATABASE: process.env.BD_DATABASE,
  BD_USER: process.env.BD_USER,
  BD_PASSWORD: process.env.BD_PASSWORD,
  BD_PORT: process.env.BD_PORT
});

export const BD_HOST = process.env.BD_HOST || 'mysql-danieltesis.alwaysdata.net'
export const BD_DATABASE = process.env.BD_DATABASE || 'danieltesis_app'
export const BD_USER = process.env.BD_USER || '433568'
export const BD_PASSWORD = process.env.BD_PASSWORD || 'D23T07S2004'
export const BD_PORT = process.env.BD_PORT || 3306
export const PORT = process.env.PORT || 10000
