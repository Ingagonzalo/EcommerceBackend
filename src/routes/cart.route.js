import express from "express";
import * as cartController from '../controllers/cart.controller.js';

const router = express.Router();

router.get('/:id/productos', cartController.getProducts);

router.post('/', cartController.create);
router.post('/:id/productos', cartController.saveProduct);

router.delete('/:id/productos/:id_prod', cartController.removeProduct);
router.delete('/:id', cartController.deleteCart);

export default router;