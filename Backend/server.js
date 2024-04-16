const express = require('express');
const app = express();
const PORT = 5000;
const apiRoutes = require('./routes/routes');


app.use(express.static('../Frontend/build')); // For the future Vite build

app.use('/api', apiRoutes); // For the future API routes

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
