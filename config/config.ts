import dotenv from "dotenv";

dotenv.config();

const isDev = process.env.NODE_ENV === "development";

const config = {
  username: isDev ? process.env.DEV_DB_USERNAME : process.env.LOCAL_DB_USERNAME,
  password: isDev ? process.env.DEV_DB_PASSWORD : process.env.LOCAL_DB_PASSWORD,
  database: isDev ? process.env.DEV_DB_NAME : process.env.LOCAL_DB_NAME,
  host: isDev ? process.env.DEV_DB_HOST : process.env.LOCAL_DB_HOST,
  port: isDev ? process.env.DEV_DB_PORT : process.env.LOCAL_DB_PORT,
  dialect: "postgres",
  appPort: process.env.APP_PORT || 3000,
};

export default config;
