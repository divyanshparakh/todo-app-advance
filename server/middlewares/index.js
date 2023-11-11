const Joi = require("joi");     // Schema validation library that allows to validate nested JSON object.

const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();


exports.loginUserSchema = Joi.object({
    email: Joi.string()
        .min(6)
        .max(50)
        .trim()
        .lowercase()
        .email({ minDomainSegments: 2, tlds: { allow: ["com", "net", "edu"] } })
        .required()
        .label("Username")
        .messages({
            "string.email": "Not a valid Username!.",
            "string.empty": "Username cannot be empty.",
        }),
    password: Joi.string()
        .max(100)
        .required()
        .label("Password")
        .messages({
            "string.pattern.base": "Password is Invalid!",
        }),
});


exports.registerUserSchema = Joi.object({
    email: Joi.string()
        .min(6)
        .max(50)
        .trim()
        .lowercase()
        .email({ minDomainSegments: 2, tlds: { allow: ["com", "net", "edu"] } })
        .required()
        .label("Email")
        .messages({
            "string.email": "Not a valid Email",
            "string.empty": "Email cannot be Empty",
        }),
    phone: Joi.string()
        .length(10)
        .required()
        .label("Phone Number")
        .messages({
            "string.empty": "Phone Number can't be Empty",
        }),
    // oneTimeCode: Joi.string().min(0).max(6).allow(null, "").label("OTP"),
    password: Joi.string()
        .min(8)
        .max(100)
        .required()
        // .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*\\W)[a-zA-Z0-9\\&S]{8,500}$/)
        .regex(/^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,500}$/)
        .label("Password")
        .messages({
            "string.pattern.base": "Password is not Strong Enough",
        }),
    confirmPassword: Joi.any()
        .equal(Joi.ref("password"))
        .required()
        .label("Confirm Password")
        .messages({
            "any.only": "Password and Confirm Password do not match"
        }),
});

exports.verifyToken = function (req, res, next) {
    const token = req.headers.authorization;
    if (!token) {
        return res.status(401).json({ message: "Access Denied. No token provided." });
    }
    try {
            const verified = jwt.verify(token.replace("Bearer ", ""), atob(process.env.TOKEN_SECRET));
            req.user = verified;
            req.email = verified.email;
            next();
    } catch (e) {
        return res.status(401).json({
            'error': 'Unauthorized',
            'message': 'Invalid or expired token'
        });
    }
};

// function generateAccessToken(username) {
//     return jwt.sign(username, process.env.TOKEN_SECRET, { expiresIn: '1800s' });
// }

