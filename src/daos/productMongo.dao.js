import { ProductosModel } from "../modules/productos.modules.js";
import MongoDao from "./mongo.dao.js";

let instance
export class ProductMongoDao extends MongoDao {
    constructor() {
        super(ProductosModel)
    }
    static getInstance() {
        if (!instance) instance = new ProductMongoDao();
        return instance
    }
}