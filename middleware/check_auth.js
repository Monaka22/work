module.exports = (req, res, next) => {
        if(req.session.isLoggedIn != null  && req.session.isLoggedIn == true){
            console.log(req.session.username);
            next();
        }
        else{
            res.redirect('/notfound');
        }
   
};