import { connection } from '../config/mysql.config.js';
import fs from 'fs';
import csv from 'csv-parser';
import PLACES_QUERY from '../query/places.query.js';

export const loadPlaces = async () => {
    const pool = await connection();

    // Array of promises for insert operations
    const insertPromises = [];

    return new Promise((resolve, reject) => {
        fs.createReadStream('data/places.csv')
            .pipe(csv())
            .on('data', (row) => {
                const { city, county, country } = row;

                const insertPromise = pool.query(PLACES_QUERY.CREATE_PLACE, [city, county, country])
                    .then(([result]) => {
                        console.log(`Inserted place with ID: ${result.insertId}`);
                    }).catch((error) => {
                        console.error(`Error inserting place: ${error.message}`);
                    });

                insertPromises.push(insertPromise);
            })
            .on('end', async () => {
                console.log('CSV reading completed.');
                
                await Promise.all(insertPromises);
                resolve();
            })
            .on('error', (error) => {
                console.error(`Error reading CSV file: ${error.message}`);
                reject(error);
            });
    });
};