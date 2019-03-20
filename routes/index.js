const express = require('express');
const router = express.Router();
//const {ensureAuthenticated} = require('../config/auth')
const Auth = require('../config/auth')

// welcome Page
router.get('/', (req, res) => {
    res.render('welcome')
})

// dashboard Page
router.get('/dashboard', Auth.checkAuthentication, (req, res) => {
    res.render('dashboard', { name: req.user.name})
})



module.exports = router;