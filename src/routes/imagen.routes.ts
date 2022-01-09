import { Router } from 'express';
import { productoService } from '../services/producto.service';
import { upload } from '../utils/upload';

export const routerImagen = Router();

routerImagen.post('/upload', upload.single('file'), async (req, res) => {
  if (req.file === undefined) {
    return res
      .status(400)
      .json({ error: 'Se debe subir un archivo de imagen .png o .jpg' });
  }
  // const producto = await productoService.agregaImagen(req.body.producto_id, JSON.stringify(req.file.id))
  console.log(req.file.id);
  return res.status(200).json(req.file);
});
