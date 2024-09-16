import { createPool } from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

export const connection = async () => {
    const pool = await createPool({
        host: process.env.DB_HOST || 'localhost',
        user: process.env.DB_USER || 'admin',
        password: process.env.DB_PASSWORD || 'admin',
        database: process.env.DB_NAME || 'people_places_db',
        port: process.env.DB_PORT || 3306,
        connectionLimit: process.env.DB_CONNECTION_LIMIT || 20,
    });

    return pool;
};
