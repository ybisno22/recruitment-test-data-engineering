#!/usr/bin/env node

import { loadPlaces } from './loadPlaces.js';
import { loadPeople } from './loadPeople.js';

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const runIngestion = async () => {
  await delay(10000);
  try {
    console.log('Starting places ingestion...');
    await loadPlaces();  
    console.log('Places ingestion completed.');

    await delay(10000);

    console.log('Starting people ingestion...');
    await loadPeople(); 
    console.log('People ingestion completed.');

  } catch (error) {
    console.error(`Ingestion error: ${error.message}`);
    process.exit();
  } finally {
    process.exit();
  }
};

runIngestion();
