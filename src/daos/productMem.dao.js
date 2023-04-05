import { ProductosModel } from "../modules/productos.modules.js";
import memDao from "./mem.dao.js";


let instance
export class ProductMemDao extends memDao {
    constructor() {
        super()
    }

    static getInstance() {
        if (!instance) instance = new ProductMemDao();
        return instance
    }
}