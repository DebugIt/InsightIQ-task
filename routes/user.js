const express = require("express");
const { register, login } = require("../controllers/AuthControllers");
const userRouter = express.Router();
const rateLimiter = require("../middleware/ratelimiter");

const csrf = require("csurf");
const csrfProtection = csrf({ cookie: true });


// ratelimiter - using as a middleware to limit excessive requests from a IP
userRouter.post("/register", csrfProtection, rateLimiter, async (req, res) => {
    const { username, password } = req.body;
    const inputData = {
        username,
        password
    }
    const response = await register(inputData);
    const { success, status, message, data } = response;
    return res.status(status).json({
        success,
        status,
        message,
        data
    })
}) 
userRouter.post("/login", csrfProtection,  rateLimiter, async (req, res) => {
    const { username, password } = req.body;
    const inputData = {
        username,
        password
    }
    const response = await login(inputData);
    const { success, status, message, data } = response;
    return res.status(status).json({
        success,
        status,
        message,
        data
    })
}) 

module.exports = userRouter;