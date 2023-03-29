import { cartService } from "../services/cart.service.js";
import { productService } from "../services/product.service.js";

const cartController = new cartService();

// POST /api/carrito
export const create = async (req, res) => {
    const newCart = await cartService.createCart();

    newCart
        ? res.status(200).json({ "success": "Product added with ID " + newCart._id })
        : res.status(500).json({ "error": "there was an error" })

}

// DELETE /api/carrito/id
export const deleteCart = async (req, res) => {
    const { id } = req.params;
    const wasDeleted = await cartController.deleteCartById(id);

    wasDeleted
        ? res.status(200).json({ "success": "cart successfully removed" })
        : res.status(404).json({ "error": "cart not found" })

}

// POST /api/carrito/:id/productos

export const saveProduct = async (req, res) => {
    const { id } = req.params;
    const { body } = req;

    const productExists = await productService.exists(body.productId);

    if (productExists) {
        await cartController.saveProductToCart(id, body)
    } else {
        res.status(404).json({ "error": "product not found" });
    }

}

// GET /api/carrito/:id/productos
export const getProducts = async (req, res) => {
    const { id } = req.params;
    const cartProducts = await cartController.getAllProductsFromCart(id);

    cartProducts
        ? res.status(200).json(cartProducts)
        : res.status(404).json({ "error": "cart not found" })
}


// DELETE /api/carrito/:id/productos/:id_prod
export const removeProduct = async (req, res) => {
    const { id, id_prod } = req.params;

    const wasDeleted = await cartService.deleteProductFromCart(id, id_prod);

    wasDeleted
        ? res.status(200).json({ "success": "that product is no longer in the cart" })
        : res.status(400).json({ "error": "there was some problem" })

}

