import React from "react";
import Home from "./components/Home";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Codeforces from "./components/Codeforces";
import Leetcode from "./components/Leetcode";
import Codechef from "./components/Codechef";
import Searchuser from "./components/Searchuser";
import About from "./components/About";
import Kickstart from "./components/Kickstart";
import "./App.css";
import Reminderstate from "./context/Reminderstate";
const App = () => {
  return (
    <>
      <Reminderstate>
        <BrowserRouter>
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/codeforces" element={<Codeforces />} />
            <Route exact path="/leetcode" element={<Leetcode />} />
            <Route exact path="/codechef" element={<Codechef />} />
            <Route exact path="/searchuser" element={<Searchuser />} />
            <Route exact path="/about" element={<About />} />
            <Route exact path="/kickstart" element={<Kickstart />} />
          </Routes>
        </BrowserRouter>
      </Reminderstate>
    </>
  );
};

export default App;
