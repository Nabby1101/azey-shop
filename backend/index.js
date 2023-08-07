const path = require('path');
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const passport = require('passport');
const methodOverride = require('method-override');
const session = require('express-session');
const port = 8080;
const app = express();

require('dotenv').config();

const router = require('./routers/index');
const db = require('./config/key');
//ket noi Mongoose
db.connect();

app.use(
    cors({
        origin: process.env.CLIENT_URL, 
        // method: 'GET, POST, PUT, PATCH, DELETE',
        credentials: true,
    })
);

app.use(
    session({
        secret: 'azeysecret',
        resave: true,
        saveUninitialized: true,
    })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(
    express.urlencoded({
        extended: true,
    })
);

app.use(express.json());

// app.use(function (req, res, next) {
//     res.header('Access-Control-Allow-Origin', '*');
//     res.header(
//         'Access-Control-Allow-Methods',
//         'GET, POST, OPTIONS, PUT, PATCH, DELETE'
//     );
//     res.header(
//         'Access-Control-Allow-Headers',
//         'Origin, X-Requested-With, Content-Type, Accept, Authorization'
//     );
//     next();
// });

app.use(methodOverride('_method'));
// console.log('path',path.join(__dirname, 'uploads'))
app.use(express.static(path.join(__dirname)));

//HTTP logger
app.use(morgan('combined'));

router(app);

app.get('/', (req, res) => {res.send('Welcome to Azey_Shop')})
app.listen(port, () => console.log("Server running on port " + port));
