import React from "react";
import api from "..";
import { useState } from "react";

function RegisterForm({ btn }) {
	const [name, setName] = useState();
	const [email, setEmail] = useState();
	const [phone, setPhone] = useState();
	const [otp, setOtp] = useState();
	const [password, setPassword] = useState();
	const [confirmPassword, setConfirmPassword] = useState();
	const [error, setError] = useState(null);

	const handleRegister = async (event) => {
		event.preventDefault();
		await api.post('/register', {
			email,
			phone,
			otp,
			password,
			confirmPassword,
			name
		})
		.then(() => {
			// Navigate to the homepage
			window.location.href = '/';
		})
		.catch((error) => {
		// Handle errors
			console.error('Registration failed:', error);
			setError(error.response.data.message.replace(/"/g, ""));
		});
	}
	
	return (
		<form className="register page" onSubmit={handleRegister}>
			<input
				name="name"
				value={name}
				onChange={(e) => setName(e.target.value)}
				type="text"
				placeholder="Full Name"
			/>
			<input
				name="email"
				value={email}
				onChange={(e) => setEmail(e.target.value)}
				type="text"
				placeholder="Email ID"
			/>
			<input
				type="tel"
				value={phone}
				onChange={(e) => setPhone(e.target.value)}
				placeholder="Phone Number"
			/>
			<input
				disabled
				name="one-time-code"
				value={otp}
				onChange={(e) => setOtp(e.target.value)}
				type="text"
				autoComplete="new-password"
				placeholder="OTP"
			/>
			<input
				type="password"
				value={password}
				onChange={(e) => setPassword(e.target.value)}
				placeholder="Password"
			/>
			<input
				type="password"
				value={confirmPassword}
				onChange={(e) => setConfirmPassword(e.target.value)}
				placeholder="Confirm Password"
			/>
			<button className="custom-button" type="submit">SUBMIT &#8595;</button>
			<p className="error">{error}</p>
			<br />
			{ btn }
		</form>
	);
}

export default RegisterForm;
