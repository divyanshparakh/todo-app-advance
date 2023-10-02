var { login_pool, register_pool } = require("../database");
require("dotenv").config();
const { registerUserSchema, loginUserSchema } = require("../middlewares");
var jwt = require("jsonwebtoken");

exports.loginUser = function (req, res) {
    const { email, password } = req.body;
    if (email.length == 0 || password.length == 0) {
        res.status(400).json({
            message: "Email or Password is empty",
        });
    } else {
        var loginInputChecked = loginUserSchema.validate(req.body);
        if (loginInputChecked.error == null) {
            console.log(
                "IP Address reached " + (req.headers["x-forwarded-for"] ||
                req.connection.remoteAddress) + " server."
            );
            login_pool.query(
                "SELECT * FROM authentication WHERE email = ($1) and password = crypt(($2), password)",
                [email, password],
                (err, results) => {
                    if (err) {
                        console.log("CONNECTION WITH DB FAILED");
                        throw err;
                    } 
                    else if (results.rows.length == 1) {
                        // On Successful Login
                        const token = jwt.sign(
                            {
                                email: results.rows[0].email,
                                full_name: results.rows[0].full_name,
                                phone_number: results.rows[0].phone_number,
                            },
                            btoa(process.env.TOKEN_SECRET), // converting token_secret to base 64
                            { expiresIn: "1800s" },
                            { algorithm: "HS256" },
                            (err) => {
                                if (err) {
                                    res.status(400).json({
                                        message: "Not able to create a token",
                                    });
                                    console.log(err);
                                }
                            }
                        );

                        res.header({
                            Authorization: "Bearer" + token,
                            "Access-Control-Expose-Headers": "Authorization",
                        });
                        res.status(201).json({
                            message: results.rows[0].full_name + "logged in.",
                        });
                        console.log(results.rows[0].full_name + " just logged in");
                    } else {
                        login_pool.query(
                            "SELECT * FROM authentication WHERE email = ($1)",
                            [email],
                            (errUser, resultUser) => {
                                if (resultUser.rows.length != 1) {
                                    res.status(400).json({
                                        message: "User does not exist",
                                    });
                                } else {
                                    res.status(400).json({
                                        message: "Password is incorrect",
                                    });
                                }
                                if (errUser) {
                                    res.status(501).json({
                                        message: "Server Internal Error",
                                    });
                                }
                            }
                        );
                    }
                }
            );
        } else {
            console.log(loginInputChecked.error.details[0].message);
            res.status(500).json(loginInputChecked.error.details[0]);
        }
    }
};



exports.signupUser = function (req, res) {
    var registerInputChecked = registerUserSchema.validate(req.body);
    if (registerInputChecked.error == null) {
        const {
            email,
            phoneNumber,
            password,
            passwordConfirmation,
        } = req.body;
        try {
            login_pool.query(
                "SELECT * FROM authentication WHERE email = ($1) or phone_number = ($2)",
                [email, phoneNumber],
                (errUser, result) => {
                    if (result != null && result.rows.length > 0) {
                        res.status(409).json({
                            message: "Username or Phone Number is already in use",
                        });
                        console.log("Duplicate Credential(s) present in Database");
                    } else {
                        register_pool.query(
                            "INSERT INTO authentication (email, phone_number, password) VALUES ($1, $2, crypt($4, gen_salt('bf')))",
                            [email, phoneNumber, password]
                        );
                        console.log("User Successfully Created");
                        res.status(201).send({ message: "New User Created by " + email });
                    }
                }
            );
        } catch (error) {
            console.log(error.stack);
        }
    } else {
        console.log(registerInputChecked.error.details[0].message);
        res.status(500).json(registerInputChecked.error.details[0]);
    }
};
