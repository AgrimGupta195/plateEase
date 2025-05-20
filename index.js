const express = require('express');
const app = express();
const cors= require('cors');
const dotenv = require('dotenv');
const connectDB = require('./lib/db');
const userAuthRoutes = require('./routes/userAuthRoutes');
const itemRoutes = require('./routes/itemRoutes');
dotenv.config();
app.use(cors());
const PORT = process.env.PORT || 3000;
app.use(express.json());
app.use("/api/userAuth",userAuthRoutes);
app.use("/api/items",itemRoutes);
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  connectDB();
});