const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const mongoose = require('mongoose');


const app = express();

// DB config
const db = require('./config/keys').mongoURI;

// Connect to Mongo
mongoose.connect(db, { useNewUrlParser: true })
    .then(()=> console.log('MongoDB connected..'))
    .catch(()=> console.log(error));

// EJS
app.use(expressLayouts);
app.set('view engine', 'ejs');

// Body Parser
app.use(express.urlencoded( { extended: false} ))

// Routes
app.use('/', require('./routes/index'));
app.use('/users', require('./routes/users'));

// Set Port and connect
const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log(`Server started on port ${PORT}..`));