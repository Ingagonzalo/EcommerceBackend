import { CarritosModel } from "../modules/carritos.modules.js";
import memDao from "./mem.dao.js";

let instance

export class CartMemDao extends memDao {
    constructor() {
        super()
    }


    static getInstance() {
        if (!instance) instance = new CartMemDao();
        return instance
    }
}