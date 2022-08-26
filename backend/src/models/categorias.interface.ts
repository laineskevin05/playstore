import mongoose from "mongoose";

export interface Categorias {
  nombreCategoria: string;
  descripcion: string;
  aplicaciones: Aplicacion[];
}

export interface Aplicacion {
  _id: mongoose.Types.ObjectId;
  nombre: string;
  descripcion: string;
  icono: string;
  instalada: boolean;
  app: string;
  calificacion: number;
  descargas: number;
  precio: number;
  desarrollador: string;
  imagenes: string[];
  comentarios: Comentario[];
}

export interface Comentario {
  _id: mongoose.Types.ObjectId;
  comentario: string;
  calificacion: number;
  fecha: string;
  usuario: string;
}
