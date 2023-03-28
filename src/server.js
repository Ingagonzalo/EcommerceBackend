import express from "express";
import minimist from "minimist";
import logger from "./loggers/Log4jsLogger.js";

const app = express();
const options = {
    alias: {
        "p": "PORT"
    },
    default: {
        "PORT": 8080
    }
};



const { PORT } = minimist(process.argv.slice(2), options);

const server = app.listen(PORT, () => {
    logger.info(`🚀 Server iniciado en http://localhost:${PORT}`)
})

server.on('error', (err) => logger.error(err));