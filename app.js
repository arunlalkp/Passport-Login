const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const mongoose = require('mongoose');
const flash = require('connect-flash');
const session = require('express-session')



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

// Session Middleware
app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: true,
  }))

// connect-flash middleware
app.use(flash());

// Global Vars
app.use((req, res, next) => {
    res.locals.success_msg = req.flash('success_msg')
    res.locals.error_msg = req.flash('error_msg')
    next();
})


// Routes
app.use('/', require('./routes/index'));
app.use('/users', require('./routes/users'));

// Set Port and connect
const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log(`Server started on port ${PORT}..`));