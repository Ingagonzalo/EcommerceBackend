import { fork } from 'child_process';
import os from 'node:os';
const randomNumbersGeneratorFork = fork('../utils/functions/randomNumersGenerator.js')


export const getInfo = async (req, res) => {
    const processInfo = {
        platform: process.platform,
        version: process.version,
        title: process.title,
        execPath: process.execPath,
        processId: process.pid,
        rss: process.memoryUsage().rss,
        numberOfProcessors: os.cpus().length
    };
    res.status(200).json(processInfo);
}


export const getRandomNumbers = async (req, res) => {

    const cant = req.query.cant || 5000;

    randomNumbersGeneratorFork.on('message', (resultado) => {
        res.status(200).json(resultado);
    })
    randomNumbersGeneratorFork.send(cant);
    console.log('Lista generada')

}