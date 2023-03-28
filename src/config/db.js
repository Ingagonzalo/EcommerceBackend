import dotenv from 'dotenv';
import mongoose from "mongoose"
import logger from '../loggers/Log4jsLogger.js';

dotenv.config(); //carga las variables de entorno definidas

mongoose.connect(process.env.MONGO_URL, (err) => { //si la conexion se realiza de manera exitosa se informa por medio del logger
    err ? logger.error("Error al conectarse a MongoDB❌")
        : logger.info("Conectado con exito a MongoDB✅")
})

export default mongoose;