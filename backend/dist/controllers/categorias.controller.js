"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addApp = exports.addComentario = exports.getCategorias = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const categorias_schema_1 = require("../models/categorias.schema");
const getCategorias = (req, res) => {
    categorias_schema_1.CategoriasSchema.find()
        .then((result) => {
        res.send(result);
        res.end();
    })
        .catch((error) => console.error(error));
};
exports.getCategorias = getCategorias;
const addComentario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const categoria = yield categorias_schema_1.CategoriasSchema.findById(req.params.idCategoria);
    const apps = categoria === null || categoria === void 0 ? void 0 : categoria.aplicaciones;
    const index = apps === null || apps === void 0 ? void 0 : apps.findIndex((app) => {
        return app._id.toHexString() === req.params.idApp;
    });
    console.log("indexs", index);
    const { comentario, calificacion, fecha, usuario } = req.body;
    if (index === -1 || index === undefined) {
        res.send({ ok: false, msg: "App no encontrada" });
        res.end();
        return;
    }
    (_a = categoria === null || categoria === void 0 ? void 0 : categoria.aplicaciones[index]) === null || _a === void 0 ? void 0 : _a.comentarios.push({
        _id: new mongoose_1.default.Types.ObjectId(),
        comentario: comentario,
        calificacion: calificacion,
        fecha: fecha,
        usuario: usuario,
    });
    categorias_schema_1.CategoriasSchema.updateOne({ _id: req.params.idCategoria }, {
        $set: {
            aplicaciones: categoria === null || categoria === void 0 ? void 0 : categoria.aplicaciones,
        },
    })
        .then((result) => {
        res.send({
            ok: true,
            msg: "Comentario agregado",
            result: categoria,
        });
        res.end();
    })
        .catch((error) => {
        res.send({ ok: false, msg: "Ocurrio un error", error });
        res.end();
    });
});
exports.addComentario = addComentario;
const addApp = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { nombre, descripcion, icono, instalada, app, calificacion, descargas, precio, desarrollador, imagenes, comentarios, } = req.body;
    categorias_schema_1.CategoriasSchema.updateOne({ _id: req.params.idCategoria }, {
        $push: {
            aplicaciones: {
                _id: new mongoose_1.default.Types.ObjectId(req.body.id),
                nombre,
                descripcion,
                icono,
                instalada,
                app,
                calificacion,
                descargas,
                precio,
                desarrollador,
                imagenes,
                comentarios,
            },
        },
    })
        .then((result) => {
        res.send({ ok: true, message: "App agregada", result });
        res.end();
    })
        .catch((error) => {
        res.send({ ok: false, message: "Ocurrio un error", error });
        res.end();
    });
});
exports.addApp = addApp;
