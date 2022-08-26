import express from "express";
import { addApp, getCategorias } from "../controllers/categorias.controller";
import { addComentario } from "./../controllers/categorias.controller";

const router = express.Router();

router.get("/categorias", getCategorias);
router.put("/:idCategoria/:idApp/addcomentario", addComentario);
router.put("/:idCategoria/addapp", addApp);

export default router;
