module.exports = function(req, res, next) {
    if (!req.session.theUser.shop) {
        res.redirect('/SellerShop');
    } else {
    	next();
    }
}