import "../config/db.js"
import { UsuariosModel } from "../modules/usuarios.modules.js"
import logger from "../loggers/Log4jsLogger.js"

export class usersDao {
    id_field = "_id";
    username_field = "username";

    async createUser(object) {
        try {
            return await UsuariosModel.create(object); //crea un objeto con los parametros del modelo de Usuario
        }
        catch (error) {
            logger.error(error);
            return null;
        }
    }
    async loginUser(object) {
        try {
            const user = await UsuariosModel.findOne({ //busca en la base de datos un usuario que corresponda a los datos del objeto
                [this.username_field]: object.username // compara el user name, sintaxis del findOne.
            });
            if (!user) {
                logger.info(`El usuario '${object.username}' no existe`)
                return null;
            }
            return await user.comparePassword(object.password); // si se encuentra el usuario compara la contraseña de la base de datos con el password del objeto
        } catch (error) {
            logger.error(error);
            return null;
        }
    }
}

