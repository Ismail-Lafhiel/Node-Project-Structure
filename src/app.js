const express = require('express');
const userRoutes = require('./api/v1/routes/userRoutes');
const app = express();

app.use(express.json()); // To parse JSON bodies
app.use('/api/v1/users', userRoutes); // Use the user routes

app.listen(3001, () => console.log('Server running on port 3001'));