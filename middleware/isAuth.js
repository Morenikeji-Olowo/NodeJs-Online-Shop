export  const isAuth = (req, res, next) => {
    if(req.session.isLoggedIn) {
        return next();
    }
    else{
        return res.redirect("/auth/login");
    }
}