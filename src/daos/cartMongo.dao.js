import { CarritosModel } from "../modules/carritos.modules.js";
import MongoDao from "./mongo.dao.js";

let instance;

export class CartMongoDao extends MongoDao {
    constructor() {
        super(CarritosModel)
    }

    static getInstance() {
        if (!instance) instance = new CartMongoDao();
        return instance
    }
}