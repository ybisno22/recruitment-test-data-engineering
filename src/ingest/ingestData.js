import { loadPlaces } from "./loadPlaces.js";
import { loadPeople } from './loadPeople.js';

const runIngestion = async () => {
  try {
    console.log('Starting data ingestion...');
    await loadPlaces();
    await loadPeople();
    console.log('Data ingestion completed successfully.');
  } catch (error) {
    console.error('Error during data ingestion:', error.message);
  } finally {
    process.exit();
  }
};

runIngestion();