module.exports = (req, res, next) => {
        if(req.session.isLoggedIn != null  && req.session.isLoggedIn == true){
            next();
        }
        else{
            res.redirect('/notfound');
        }
   
};