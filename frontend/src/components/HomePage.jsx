import React, { useState, useEffect } from "react";
// import { toggleLoginRegister } from "./redux/actions";
import jwtDecode from "jwt-decode";
import ViewWeather from "./Weather/ViewWeather";
import ViewTodos from "./ViewTodos";

function HomePage() {
	const [decodedToken, setDecodedToken] = useState({});
	const storedToken = localStorage.getItem('token');

	useEffect(() => {
		if (storedToken) {
			const decoded = jwtDecode(storedToken);
			setDecodedToken(decoded);
		}
	}, [storedToken]);

	const handleLogout = () => {
		localStorage.removeItem('token');
		if(localStorage.getItem('token') === null)
			window.location.href = '/';
	}

	const logoutButton = (
        storedToken ? <button className="custom-button" onClick={handleLogout}>LOGOUT</button> : ''
	);

    return (
        <div className="homepage">
			<ViewWeather></ViewWeather>
            <ViewTodos decodedToken={decodedToken.email} logoutButton={logoutButton}></ViewTodos>
        </div>
    );
}

export default HomePage;