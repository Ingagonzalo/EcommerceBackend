import { ProductMongoDao } from "./productMongo.dao.js";


let instance;

export default class ProductDaoFactory {
    static getDao(db) {
        switch (db) {
            case "MONGO":
                return ProductMongoDao.getInstance();
            case "MEME":
                return ProductMemDao.getInstance();
        }
    }
}