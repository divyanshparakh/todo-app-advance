import React from "react";

function RegisterForm({ btn }) {
  return (
    <form className="register page">
      <input
        name="name"
        type="text"
        placeholder="Full Name"
      />
      <input
        name="email"
        type="text"
        placeholder="Email ID"
      />
      <input
        type="tel"
        placeholder="Phone Number"
      />
      <input
        disabled
        name="one-time-code"
        type="text"
        autoComplete="new-password"
        placeholder="OTP"
      />
      <input
        type="password"
        placeholder="Password"
      />
      <input
        type="password"
        placeholder="Confirm Password"
      />
      <button type="submit">SUBMIT &#8595;</button>
      { btn }
    </form>
  );
}

export default RegisterForm;
