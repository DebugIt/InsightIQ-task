const User = require("../model/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

module.exports = {
    login: async (data) => {
        try {
            const { username, password } = data;
            if(!(username || password)){
                return {
                    success: false,
                    message: "All fields required",
                }
            }
            else{
                const findUser = await User.findOne({username});
                if (!findUser) {
                    return {
                        success: false,
                        status: 404,
                        message: "User not found",
                        data: null
                    }
                }
                else{
                    const isPasswordValid = await bcrypt.compare(password, findUser.password);
                    if (!isPasswordValid) {
                        return {
                            success: false,
                            status: 401,
                            message: "Invalid credentials",
                            data: null
                        }
                    }
                    else{
                        const token = jwt.sign({ id: findUser._id }, process.env.JWT_SECRET, {
                            expiresIn: process.env.EXPIRY
                        });
                        return {
                            success: false,
                            status: 200,
                            message: "Login successful",
                            data: token
                        }
                    }
                }
            }
        } catch (error) {
            return {
                success: false,
                status: 500,
                message: "Internal Server Error",
                data: null
            }
        }
    },

    register: async (data) => {
        try {
            const { username, password } = data;
            if(!(username || password)){
                return {
                    success: false,
                    message: "All fields required",
                }
            }
            else{
                const checkUsernameDuplication = await User.findOne({username});
                if(checkUsernameDuplication){
                    return {
                        success: false,
                        status: 400,
                        message: "Username already exists, try another one",
                        data: null
                    }
                }
                else{
                    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
                    if (!passwordRegex.test(password)) {
                        return {
                            success: false,
                            status: 400,
                            message: "Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, one number, and one special character",
                            data: null
                        };
                    }
                    const hashPassword = await bcrypt.hash(password, 10);
                    const newUser = new User({
                            username,
                            password: hashPassword
                        }).save();
                        if(newUser){
                            return {
                                success: true,
                                status: 201,
                                message: "User created successfully",
                                data: newUser
                            }
                        }
                        else{
                            return {
                                success: false,
                                status: 500,
                                message: "Error creatinng account",
                                data: null
                            }
                        }
                }
            }
        } catch (error) {
            return {
                success: false,
                status: 500,
                message: "Internal Server Error",
                data: null
            }
        }
    }
}