const express = require('express');
const router = express.Router();

// Get Login
router.get('/login', (req, res) => {
    res.render("login")
})

// Get Register
router.get('/register', (req, res) => {
    res.render("register")
})

// Handle Register
router.post('/register', (req, res)=> {
    const { name, email, password, password2} = req.body;
    let errors = [];

    // check required feilds
    if (!name || !email || !password || !password2) {
        errors.push( {msg: 'Please fill in all feilds'} )
    }

    // check passwoeds are correct
    if (password !== password2) {
        errors.push( {msg: 'Passwords do not match'} )
    }
    console.log({ name, email, password, password2});
    console.log('password = ' + req.body.password);
    console.log('name = ' + req.body.name);
    
    // check passwords length is not less than 6 charecters
    if (password.length < 6) {
        errors.push( {msg: 'Password should be atleast 6 charecters'} )
    }
    
    if (errors.length > 0) {
        res.render('register', {
            errors,
            name,
            email,
            password,
            password2
        })
    }
    else {
        res.send('Pass!')
    }
})

module.exports = router;