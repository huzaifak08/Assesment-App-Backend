import { Sequelize } from "sequelize";
import config from "./config";

const sequelize = new Sequelize(
  config.database as string,
  config.username as string,
  config.password,
  {
    host: config.host,
    dialect: "postgres",
    port: Number(config.port),
    // logging: false,
  }
);

export default sequelize;
