import express from 'express';
import ip from 'ip';
import cors from 'cors';
import dotenv from 'dotenv';


// Load env variables
dotenv.config();

// Initialise app
const app = express();
const PORT = process.env.SERVER_PORT || 3000;

// Middleware
app.use(cors({ origin: '*'}));
app.use(express.json());

// Root route for basic testing
app.get('/', (req, res) => {
  res.send('Node application is running!');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${ip.address()}:${PORT}`);
});