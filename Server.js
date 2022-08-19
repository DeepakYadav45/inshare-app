const express = require('express');
const app = express();
const path = require('path');

app.use(express.static('public'));
app.use(express.json());

const connectDB = require('./config/db');
connectDB();

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