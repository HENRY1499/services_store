import { Sequelize } from "sequelize";
import dotenv from "dotenv";
dotenv.config();

const { DB_NAME, DB_USER, DB_PASS, DB_HOST } = process.env;

if (!DB_NAME || !DB_USER || !DB_PASS || !DB_HOST) {
  throw new Error("Missing environment variables for DB connection");
}

export const db_project = new Sequelize(DB_NAME, DB_USER, DB_PASS, {
  host: DB_HOST,
  dialect: "postgres",
  timezone: "-05:00",
  logging: false,
  pool: {
    max: 100,
    min: 0,
    idle: 10000,
  },
});
export const conecction_DB = async () => {
  try {
    await db_project.authenticate();
    console.log(
      "DATABASE SUCCESSFULL: conectado a la base de datos de project_flutter"
    );
  } catch (error: any) {
    console.log(error);
  }
};
