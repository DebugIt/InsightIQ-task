const rateLimit = require("express-rate-limit");

const rateLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100, // limits each IP make only 100 requests window
    message: "Too many request's, try again later"
})

module.exports = rateLimiter;