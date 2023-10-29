import ReactDOM from "react-dom/client";
import { useSelector } from 'react-redux';
import { useState, useEffect } from "react"
import { BrowserRouter, Routes, Route, Navigate, Link } from "react-router-dom";
import "./App.scss";
import Auth from "./components/Auth";
import ListHeader from "./components/ListHeader";
import ViewTodos from './components/ViewTodos';

function App() {
  const state = useSelector((state) => state);
  localStorage.setItem('logIn', true);
  const [logIn, setLogIn] = useState(localStorage.getItem('logIn') === 'true');

  useEffect(() => {
    if(logIn) {
      console.log('Logged In:', logIn);
      console.log(localStorage.getItem('logIn'));
      console.log(logIn);
    }
    else {
      console.log("Logged out");
      console.log(logIn);
    }
  }, [logIn]);


  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/auth" element={<Auth onLogin={() => localStorage.setItem('logIn', 'true')}></Auth>}></Route>
          <Route path="/login" element={<Auth onLogin={() => localStorage.setItem('logIn', 'true')}></Auth>} />
          <Route path="/todos" element={<ViewTodos></ViewTodos>} />
          <Route index element={localStorage.getItem('logIn') === 'true' ? <ListHeader></ListHeader> : <Navigate to="/auth" />} />
        </Routes>
      </BrowserRouter>
      <button onClick={() => localStorage.setItem('logIn', false)}>Logout</button>
    </div>
  );
}

export default App;
