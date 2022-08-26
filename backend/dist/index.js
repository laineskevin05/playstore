"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors")); //Para gestionar politicas de dominios cruzados
const dotenv_1 = __importDefault(require("dotenv"));
const database_1 = require("./modules/database");
const categorias_router_1 = __importDefault(require("./routers/categorias.router"));
dotenv_1.default.config();
const database = new database_1.Database();
var app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use("/api", categorias_router_1.default);
app.listen(process.env.PORT || 3401, () => {
    console.log(`Servidor del backend levantado en http://localhost:${process.env.PORT}`);
});
