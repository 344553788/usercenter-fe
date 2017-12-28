module.exports = function(req, res, next) {
    if (req.session.theUser.idcardAuth !== 1) {
        res.redirect('/accountsettings/security-info/personalId-update');
    } else {
    	next();
    }
}