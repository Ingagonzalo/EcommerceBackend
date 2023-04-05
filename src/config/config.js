import dotenv from "dotenv";

dotenv.config();

const config = {
    db: process.argv[2],
}

export default config;