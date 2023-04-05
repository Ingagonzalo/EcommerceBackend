import { CartMongoDao } from "./cartMongo.dao.js";



let instance;

export default class CartDaoFactory {
    static getDao(db) {
        switch (db) {
            case "MONGO":
                return CartMongoDao.getInstance();
            case "MEME":
                return CartMemDao.getInstance();
        }
    }
}