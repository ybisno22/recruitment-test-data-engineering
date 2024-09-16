import express from 'express';
import ip from 'ip';
import cors from 'cors';
import dotenv from 'dotenv';
import Response from './util/response.js';
import HttpStatus from './util/httpStatus.js';

// Load env variables
dotenv.config();

// Initialise app
const app = express();
const PORT = process.env.SERVER_PORT || 3000;

// Middleware
app.use(cors({ origin: '*'}));
app.use(express.json());

// Root route for testing
app.get('/', (req, res) => {
    res.send(new Response(HttpStatus.OK.code, HttpStatus.OK.status, 'People and Places API v1.0.0'));
});

// Fallback route for undefined routes
app.all('*', (req, res) => {
    res.status(HttpStatus.NOT_FOUND.code)
      .send(new Response(HttpStatus.NOT_FOUND.code, HttpStatus.NOT_FOUND.status, 'Server route does not exist'));
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${ip.address()}:${PORT}`);
});