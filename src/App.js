

import React, { useEffect } from "react";
import "./App.css";
import Header from "./Header";
import Home from "./Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Checkout from "./Checkout";
import Login from "./Login";
import { auth } from "./firebase";
import { useStateValue } from "./StateProvider";
import Payment from "./Payment";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import Orders from "./Orders";

const promise = loadStripe(
  "pk_test_51P6dkTSBJVCyXidX5qfffNd0z0dYP32h4wbrPFzdpVStU9bSn8WH10z8DS1aSlm5jPfSMWKf2YPr27p21RLLy0IZ00U2hNGi7V"
);

function App() {
  const [{}, dispatch] = useStateValue();

  useEffect(() => {
    // will only run once when the app component loads
    auth.onAuthStateChanged((authUser) => {
      console.log("THE USER IS >>> ", authUser);

      if (authUser) {
        // the user has just logged in/ was logged in

        dispatch({
          type: "SET_USER",
          user: authUser,
        });
      } else {
        // the user is logged out
        dispatch({
          type: "SET_USER",
          user: null,
        });
      }
    });
  }, []);
  return (
    // BEM
    <Router>
    <div className="app">
      <Routes>
        <Route path="/orders" element={<><Header /><Orders /></>} />
        <Route path="/login" element={<Login />} />
        <Route path="/checkout" element={<><Header /><Checkout /></>} />
        <Route path="/payment" element={<><Header /><Elements stripe={promise}><Payment /></Elements></>} />
        <Route path="/" element={<><Header /><Home /></>} />
      </Routes>
    </div>
  </Router>
);
}
export default App;
