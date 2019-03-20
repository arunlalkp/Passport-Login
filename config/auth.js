// module.exports =  {
//     ensureAuthenticated: function(req, res, next) {
//         if(req.isAuthenticated()) {
//             console.log(req.isAuthenticated);
//             return next;
//         }
//         else {
//         req.flash('error_msg', 'Please Log In to view this resource');
//         res.redirect('/users/login')     
//         }
//     }
// }

module,exports.checkAuthentication = (req,res,next) => {
    if(req.isAuthenticated()){
        //req.isAuthenticated() will return true if user is logged in
        next();
    } else{
        req.flash('error_msg', 'Please Log In to view this resource');
        res.redirect('/users/login')
    }
}