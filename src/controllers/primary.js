/**
 * Console Logger
 * Next time we Will use Morgan, promise!
 */
function logger(req, res, next) {
    console.log(`${req.method} `.green.bold + `${req.originalUrl}`.blue );
    next();
}


module.exports.logger = logger;