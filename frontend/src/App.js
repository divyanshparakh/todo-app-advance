import ReactDOM from "react-dom/client";
import { useState, useEffect } from "react"
import { BrowserRouter, Routes, Route, Navigate, Link } from "react-router-dom";
import "./App.scss";
import Auth from "./components/Auth";
import ListHeader from "./components/ListHeader";
import ViewTodos from './components/ViewTodos';

function App() {
  const [logIn, setLogIn] = useState(false);

  useEffect(() => {
    if(logIn) {
      console.log('Logged In:', logIn);
    }
  }, [logIn]);


  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/auth" element={<Auth onLogin={() => setLogIn(true)}></Auth>}></Route>
          <Route path="/login" element={<Auth onLogin={() => setLogIn(true)}></Auth>} />
          <Route path="/todos" element={<ViewTodos></ViewTodos>} />
          <Route index element={logIn === true ? <ListHeader></ListHeader> : <Navigate to="/login" />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
