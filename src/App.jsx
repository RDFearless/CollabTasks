import { Outlet } from "react-router-dom";
import { Footer, Header } from "./components";
import { useDispatch } from "react-redux";
import authService from "./api/auth";
import { useState, useEffect } from "react";
import { login, logout } from "./store/authSlice";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    authService.getCurrentUser()
    .then((response) => {
      if(response) {
        dispatch(login(response.data))
      } else {
        dispatch(logout())
      }
    })
  }, [])

  return (
    <div>
      <Header />
        <Outlet />
      <Footer />
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
}

export default App;
