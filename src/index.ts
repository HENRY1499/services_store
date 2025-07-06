import express, { Application } from "express";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";
import { conecction_DB } from "./configuration/database";
import routes from "./routes/index.routes";

dotenv.config();

const app: Application = express();
app.set("PORT", process.env.PORT || 3000);
app.use(cors());
app.use(morgan("common"));
app.use(express.json());
// routes
app.use("/api", routes);

// conectar base de datos
conecction_DB();
// LEVANTAR SERVIDOR
app.listen(app.get("PORT"));
console.log("Servidor en linea, puerto:", app.get("PORT"));

export default app;
