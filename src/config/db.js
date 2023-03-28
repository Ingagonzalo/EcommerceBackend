import dotenv from 'dotenv';
import mongoose from "mongoose"
import logger from '../loggers/Log4jsLogger.js';

dotenv.config(); //carga las variables de entorno definidas

const connectToMongoDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        logger.info('Conectado con éxito a MongoDB✅');
    } catch (error) {
        logger.error(`Error al conectarse a MongoDB❌: ${error.message}`);
    }
};


export default connectToMongoDB;