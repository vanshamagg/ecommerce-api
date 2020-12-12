
function checkCookies(req, res, next) {
    if(req.cookies._id) {
        next();
    }
    else {
        res.redirect('/user/signin');
    }
} 

function checkAdminAccess(req, res, next) {
    if( req.cookies._id && req.cookies.role === "admin") {
        next();
    }
    else {
        res.send({ messge : "Sign in as the administrator"});
    }
}

function showSignUpPage(req, res, next) {
    if(req.cookies._id) {
        res.redirect('/user/dashboard')
    }
    else {
        next();
    }
}

function showDashBoard(req, res, next) {
    if(req.cookies._id) {
        next();
    }
    else {
        res.redirect('/user/signin');
    }
}
module.exports.checkCookies = checkCookies;
module.exports.checkAdminAccess =  checkAdminAccess;
module.exports.showSignUpPage =  showSignUpPage;
module.exports.showDashBoard = showDashBoard;

