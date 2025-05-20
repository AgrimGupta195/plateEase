const express = require('express');
const app = express();
const dotenv = require('dotenv');
const connectDB = require('./lib/db');
const userAuthRoutes = require('./routes/userAuthRoutes');
dotenv.config();
const PORT = process.env.PORT || 3000;
app.use(express.json());
app.use("/api/userAuth",userAuthRoutes);
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  connectDB();
});