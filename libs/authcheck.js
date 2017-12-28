module.exports = function(req, res, next) {
    if (!req.session.theUser) {
        res.redirect('/authenticate/login');
    } else {
    	next();
    }
}