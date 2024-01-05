const express = require('express');
const connectDB = require('./data/db');
const path = require('path');
const helmet = require('helmet');
const cors = require('cors');
const rateLimit = require('express-rate-limit');


const app = express();

if(process.env.NODE_ENV !== 'production'){
    require('dotenv').config();
}

connectDB();
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100 // limit each IP to 100 requests per windowMs
});


// Middlewares
// app.use(express.static(path.join(__dirname)));
app.use(express.json());
app.use(helmet());
app.use(cors());
app.use(limiter);

const PORT = process.env.PORT || 4000;

app.use('/api', require('./routes/'));

app.listen(PORT, () => console.log(`server is running on http://localhost:${PORT}`));