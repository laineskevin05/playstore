import express, { Express } from "express";
import cors from "cors"; //Para gestionar politicas de dominios cruzados
import bodyParser from "body-parser";
import dotenv from "dotenv";
import { Database } from "./modules/database";
import categoriasRouter from "./routers/categorias.router";

dotenv.config();

const database: Database = new Database();
var app: Express = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", categoriasRouter);

app.listen(process.env.PORT || 3401, () => {
  console.log(
    `Servidor del backend levantado en http://localhost:${process.env.PORT}`
  );
});
