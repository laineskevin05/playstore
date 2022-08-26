"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const categorias_controller_1 = require("../controllers/categorias.controller");
const categorias_controller_2 = require("./../controllers/categorias.controller");
const router = express_1.default.Router();
router.get("/categorias", categorias_controller_1.getCategorias);
router.put("/:idCategoria/:idApp/addcomentario", categorias_controller_2.addComentario);
router.put("/:idCategoria/addapp", categorias_controller_1.addApp);
exports.default = router;
