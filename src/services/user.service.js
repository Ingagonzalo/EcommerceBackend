import "../config/db.js";
import { UsuariosModel } from "../modules/usuarios.modules.js";
import logger from "../utils/loggers/Log4jsLogger.js";

export class userService {

    ID_FIELD = "_id";
    USERNAME_FIELD = 'username';

    async createUser(object) {
        try {
            return await UsuariosModel.create(object);
        } catch (error) {
            logger.error(error);
            return null;
        }
    }

    async loginUser(object) {
        try {
            const user = await UsuariosModel.findOne({
                [this.USERNAME_FIELD]: object.username
            });

            if (!user) {
                logger.info(`User '${object.username}' does not exist`)
                return null;
            }

            return await user.comparePassword(object.password);

        } catch (error) {
            logger.error(error);
            return null;
        }
    }
}