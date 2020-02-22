const passport = require('passport')

module.exports = function (req, res, next) {
    passport.authenticate('jwt', function (err, user) {
        if (err || !user) {
            res.status(403).send({
                // error: 'you do not have access to this resource'
                error: 'This error may be because either your session got expired or role had been changed, please login again.'
            })
        } else {
            req.user = user
            next()
        }
    })(req, res, next)
}
