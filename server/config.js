require('dotenv').config({ silent: true });

module.exports = {
    port: process.env.PORT,

    db: {
        url: process.env.LOCAL
    },

    authentication: {
        jwtSecret: process.env.JWT_SECRET
    }
}