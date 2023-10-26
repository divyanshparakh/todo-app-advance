import React, { Component } from "react";
import axios from "axios";
import jwtDecode from "jwt-decode";
import "./LoginForm.scss";

function LoginForm({btn, onLogin}) {
    return (
        <form className="login page">
            <button onClick={onLogin}></button>
            <input
                type="email"
                id="username"
                name="username"
                autoComplete="username"
                placeholder="Email ID"
            />
            <input
                type="password"
                id="password"
                placeholder="Password"
            />
            <button type="submit">LOGIN</button>
            <div className="text">
                <a href="">Forgot Password?</a>
            </div>
            <div className="text">Not a Member?</div>
            <br />
            { btn }
        </form>
    );
}

export default LoginForm;