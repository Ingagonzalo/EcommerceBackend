import { createTransport } from "nodemailer";
import logger from "../loggers/Log4jsLogger.js";
import dotenv from 'dotenv';

dotenv.config({ path: '../../.env' });

const transporter = createTransport({
    service: "gmail",
    port: 587,
    auth: {
        user: process.env.GMAIL_ACCOUNT,
        pass: process.env.GMAIL_PASSWORD
    }
})

const gmailOptions = (emailSubject, htmlTemplate) => {
    return {
        from: process.env.GMAIL_ACCOUNT, //La dirección de correo electrónico del remitente, que se toma de la variable de entorno GMAIL_ACCOUNT.
        to: ["someAccount@gmail.com"], //Un array que contiene una o varias direcciones de correo electrónico de los destinatarios.
        subject: emailSubject, // asunto del correo electrónico
        html: htmlTemplate //El cuerpo del mensaje en formato HTML
    }
}



export async function sendGmail(subject, htmlTemplate) {
    try {
        const mailOptions = gmailOptions(
            subject,
            htmlTemplate
        );

        await transporter.sendMail(mailOptions); //sendGmail utiliza el objeto devuelto por gmailOptions para enviar un correo electrónico utilizando el objeto transporter
        logger.info(`Email enviado📩`)
    } catch (error) {
        logger.error(error);
    }
}

