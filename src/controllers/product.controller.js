import { productService } from "../services/product.service.js";
const productService = new productService();

// GET api/productos

export const getAll = async (_req, res) => {
    const products = await productService.getAll();
    products
        ? res.status(200).json(products)
        : res.status(400).json({ "error": "Ha ocurrido un problema al intentar mostrarte los productos❌" })

}

// GET api/productos/:id

export const getById = async (req, res) => {
    const { id } = req.params;
    const product = await productService.getProductById(id);

    product
        ? res.status(200).json(product)
        : res.status(400).json({ "error": "product not found" })

}


// POST api/productos
export const create = async (req, res) => {
    const { body } = req;
    const newProduct = await productService.createProduct(body);

    newProduct
        ? res.status(200).json({ "success": "✅Producto añadido con el siguien ID: " + newProduct._id })
        : res.status(400).json({ "error": "❌Hubo un error, verifique que el contenido del cuerpo coincida con el esquema" })

}

// PUT api/productos/:id
export const update = async (req, res) => {
    const { id } = req.params;
    const { body } = req;
    const wasUpdated = await productService.updateProductById(id, body);

    wasUpdated
        ? res.status(200).json({ "success": "🔁Producto actualizado" })
        : res.status(404).json({ "error": "❌Producto no encontrado o contenido del cuerpo no válido." })
}


// DELETE /api/productos/id

export const remove = async (req, res) => {
    const { id } = req.params;
    const wasDeleted = await productService.deleteProductById(id)

    wasDeleted
        ? res.status(200).json({ "success": "🗑Producto eliminado con éxito" })
        : res.status(404).json({ "error": "❌Producto no encontrado" })
}



export default router;
