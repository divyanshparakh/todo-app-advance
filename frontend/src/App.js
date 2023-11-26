// import { useSelector } from 'react-redux';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./App.scss";
import Auth from "./components/Auth";
import HomePage from './components/HomePage';

function App() {
	const storedToken = localStorage.getItem('token');
	return (
		<div className="App">
			<BrowserRouter>
				<Routes>
					<Route path="/auth" element={storedToken ? <Navigate to="/" /> : <Auth></Auth>}></Route>
					<Route index element={storedToken ? <HomePage></HomePage> : <Navigate to="/auth" />} />
				</Routes>
			</BrowserRouter>
		</div>
	);
}

export default App;
