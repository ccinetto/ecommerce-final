import mongoose from 'mongoose';
import { Router } from 'express';
import { productoService } from '../services/producto.service';
import { upload } from '../utils/upload';
import Grid from 'gridfs-stream';

export const routerImagen = Router();

let gfs: any; // Porque no logro descifrar el tipo
const conn = mongoose.connection;
conn.once('open', function () {
  gfs = Grid(conn.db, mongoose.mongo);
  gfs.collection('imagenes');
  // console.log(gfs);
});

routerImagen.post('/upload', upload.single('file'), async (req, res) => {
  if (req.file === undefined) {
    return res
      .status(400)
      .json({ error: 'Se debe subir un archivo de imagen .png o .jpg' });
  }
  const salida: any = req.file; // El formato Express.Multer.File no incluye el id
  const producto = await productoService.agregaImagen(
    req.body.producto_id,
    String(salida.id)
  );
  return res.status(200).json({ producto });
});

routerImagen.get('/:id', async (req, res) => {
  try {
    const file = await gfs.files.findOne({
      _id: req.params.id,
    });
    const readStream = gfs.createReadStream(file.filename);
    readStream.pipe(res);
  } catch (error) {
    res.status(400).json({ msg: 'No se encuentra la imagen con el id' });
  }
});

routerImagen.delete('/:id', async (req, res) => {
  try {
    await gfs.files.deleteOne({ _id: req.params.id });
    res.status(200).json({ msg: 'Imagen eliminada ' });
  } catch (error) {
    console.log(error);
    res
      .status(400)
      .json({ msg: 'Hubo un error no se pudo eliminar la imagen' });
  }
});

// routerImagen.get('/', imagenService.listAllImagenes);
