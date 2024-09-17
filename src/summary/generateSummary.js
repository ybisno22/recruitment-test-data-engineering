#!/usr/bin/env node

import { connection } from '../config/mysql.config.js';
import fs from 'fs/promises';

const generateSummary = async () => {
    try {
        const pool = await connection();
        console.log('Generating summary...');

        const [results] = await pool.query(`
            SELECT places.country, COUNT(people.id) AS count
            FROM places
            JOIN people ON places.id = people.place_of_birth_id
            GROUP BY places.country;
        `);
        
        console.log('Query executed successfully:', results);

        const summary = {};
        results.forEach(row => {
            summary[row.country] = row.count;
        });

        await fs.writeFile('data/summary_output.json', JSON.stringify(summary, null, 2), 'utf8');
        console.log('Summary generated and written to data/summary_output.json');
    } catch (error) {
        console.error('Error generating summary:', error.message);
    } finally {
        process.exit();
    }
};

generateSummary();