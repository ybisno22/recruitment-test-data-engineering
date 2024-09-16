import { connection } from '../config/mysql.config.js';
import fs from 'fs';
import csv from 'csv-parser';
import PEOPLE_QUERY from '../query/people.query.js';
import PLACES_QUERY from '../query/places.query.js';

export const loadPeople = async () => {
    const pool = await connection();

    // Array of promises for insert operations
    const insertPromises = [];

    return new Promise((resolve, reject) => {
        fs.createReadStream('data/people.csv')
            .pipe(csv())
            .on('data', async (row) => {
                const { given_name, family_name, date_of_birth, place_of_birth } = row;

                try {
                    // Fetch the place_of_birth_id based on city
                    const [placeResults] = await pool.query(PLACES_QUERY.SELECT_PLACE_BY_CITY, [place_of_birth]);
                    if (placeResults.length === 0) {
                        console.error(`Place not found for city: ${place_of_birth}`);
                        return;
                    }
                    const place_of_birth_id = placeResults[0].id;

                    const insertPromise = pool.query(PEOPLE_QUERY.CREATE_PERSON, [given_name, family_name, date_of_birth, place_of_birth_id])
                        .then(([result]) => {
                            console.log(`Inserted person with ID: ${result.insertId}`);
                        }).catch((error) => {
                            console.error(`Error inserting person: ${error.message}`);
                        });

                    insertPromises.push(insertPromise);
                } catch (error) {
                    console.error(`Error fetching place for ${place_of_birth}: ${error.message}`);
                }
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
