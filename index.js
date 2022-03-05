const express = require('express');
const dotenv  = require('dotenv');
const cors    = require('cors');
const { connectionDB } = require('./database/config');


dotenv.config();    
const app = express();

//Connection
connectionDB();

app.use(cors());
app.use(express.json());

//Routes
app.use('/auth', require('./routes/auth'));
app.use('/courses', require('./routes/courses'));
app.use('/profiles', require('./routes/profiles'));
app.use('/users', require('./routes/users'))

app.listen(process.env.PORT, () => {
    console.log(`servidor corriendo en puerto ${process.env.PORT} `)
});