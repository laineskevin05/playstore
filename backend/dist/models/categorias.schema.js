"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoriasSchema = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const schema = new mongoose_1.default.Schema({
    nombreCategoria: String,
    descripcion: String,
    aplicaciones: (Array)
});
exports.CategoriasSchema = mongoose_1.default.model('categorias', schema);
