import mongoose  from "mongoose";
import {Categorias, Aplicacion} from './categorias.interface'

const schema = new mongoose.Schema<Categorias>({
  nombreCategoria: String,
  descripcion: String,
  aplicaciones: Array<Aplicacion>
});

export const CategoriasSchema = mongoose.model('categorias',schema);
