const express = require('express');

const app = express();

const connectDatabase = require('./src/config/database');
const bodyParser = require('body-parser')
app.use(bodyParser.json());
const route = require('./src/routes/route')

require('dotenv').config()


const cors = require('cors');
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


connectDatabase();

app.use('/', route)

const port = process.env.PORT || 3003;
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
})