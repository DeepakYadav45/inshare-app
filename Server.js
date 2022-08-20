const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');

const corsOptions = {
    origin: process.env.ALLOWED_CLIENTS.split(',')
        // ['http://localhost:3000', 'http://localhost:5000', 'http://localhost:3300']
}

// Default configuration looks like
// {
//     "origin": "*",
//     "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
//     "preflightContinue": false,
//     "optionsSuccessStatus": 204
//   }

app.use(cors(corsOptions))

app.use(express.static('public'));
app.use(express.json());

const connectDB = require('./config/db');
connectDB();

//cors


//Templattes engine
app.set('views', path.join(__dirname, '/views'));
app.set('view engine', 'ejs');

//Routes

app.use('/api/files', require('./routes/files'));
app.use('/files', require('./routes/show'));
app.use('/files/download', require('./routes/download'));


app.listen(process.env.PORT, () => {
    console.log(`Listening on port  ${ process.env.PORT}`);
})