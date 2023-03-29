import express from "express";
import { productService } from "../services/product.service.js";
import { authMiddleware } from "../middleware/Auth.js";
const router = express.Router();
const productService = new productService();
import logger from "../loggers/Log4jsLogger.js";

// GET api/productos

router.get('/', async (_req, res) => {
    const products = await productService.getAll();
    products
        ? res.status(200).json(products)
        : res.status(400).json({ "error": "there was a problem when trying to get the products" })

})

// GET api/productos/:id

router.get('/:id', async (req, res) => {
    const { id } = req.params;
    const product = await productService.getProductById(id);

    product
        ? res.status(200).json(product)
        : res.status(400).json({ "error": "product not found" })

})


// POST api/productos
router.post('/', authMiddleware, async (req, res) => {
    const { body } = req;
    const newProduct = await productService.createProduct(body);

    newProduct
        ? res.status(200).json({ "success": "Product added with ID " + newProduct._id })
        : res.status(400).json({ "error": "there was an error, please verify the body content match the schema" })

})

// PUT api/productos/:id
router.put('/:id', authMiddleware, async (req, res) => {
    const { id } = req.params;
    const { body } = req;
    const wasUpdated = await productService.updateProductById(id, body);

    wasUpdated
        ? res.status(200).json({ "success": "product updated" })
        : res.status(404).json({ "error": "product not found or invalid body content." })
})


// DELETE /api/productos/id

router.delete('/:id', authMiddleware, async (req, res) => {
    const { id } = req.params;
    const wasDeleted = await productService.deleteProductById(id)

    wasDeleted
        ? res.status(200).json({ "success": "product successfully removed" })
        : res.status(404).json({ "error": "product not found" })
})



export default router;
