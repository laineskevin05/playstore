import { Request, Response } from "express";
import mongoose from "mongoose";
import { CategoriasSchema } from "../models/categorias.schema";

export const getCategorias = (req: Request, res: Response) => {
  CategoriasSchema.find()
    .then((result) => {
      res.send(result);
      res.end();
    })
    .catch((error) => console.error(error));
};

export const addComentario = async (req: Request, res: Response) => {
  const categoria = await CategoriasSchema.findById(req.params.idCategoria);
  const apps = categoria?.aplicaciones;
  const index = apps?.findIndex((app) => {
    return app._id.toHexString() === req.params.idApp;
  });
  console.log("indexs", index);
  const { comentario, calificacion, fecha, usuario } = req.body;

  if (index === -1 || index === undefined) {
    res.send({ ok: false, msg: "App no encontrada" });
    res.end();
    return;
  }

  categoria?.aplicaciones[index]?.comentarios.push({
    _id: new mongoose.Types.ObjectId(),
    comentario: comentario,
    calificacion: calificacion,
    fecha: fecha,
    usuario: usuario,
  });

  CategoriasSchema.updateOne(
    { _id: req.params.idCategoria },
    {
      $set: {
        aplicaciones: categoria?.aplicaciones,
      },
    }
  )
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
};

export const addApp = async (req: Request, res: Response) => {
  const {
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
  } = req.body;
  CategoriasSchema.updateOne(
    { _id: req.params.idCategoria },
    {
      $push: {
        aplicaciones: {
          _id: new mongoose.Types.ObjectId(req.body.id),
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
    }
  )
    .then((result) => {
      res.send({ ok: true, message: "App agregada", result });
      res.end();
    })
    .catch((error) => {
      res.send({ ok: false, message: "Ocurrio un error", error });
      res.end();
    });
};
