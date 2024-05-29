import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import PrimaryNavBar from "../../Components/NavBar/PrimaryNavBar";
import Footer from "../../Components/Footer/Footer";
import loginimage from "../../assets/Ellipse 628.svg";
import "./loginPage.css";
import "../../vars.css";
import { Link } from "react-router-dom";

function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e:any) => {
    e.preventDefault();
    if (username && password) {
      // Redirect to BusOwnerPage with username and password
      navigate("/BusOwnerPage", { state: { username, password } });
    } else {
      alert("Please enter both username and password.");
    }
  };

  return (
    <>
      <PrimaryNavBar />
      <a href="#">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="30"
          height="30"
          fill="#042F40"
          className="bi bi-arrow-left-circle col-1 my-3 mx-5"
          viewBox="0 0 16 16"
        >
          <path
            fillRule="evenodd"
            d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8m15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-4.5-.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5z"
          />
        </svg>
      </a>
      <form onSubmit={handleLogin}>
        <div className="d-flex justify-content-center">
          <div
            className="shadow p-3 mb-5 bg-white col-5 row-2 justify-center"
            id="login-form"
          >
            <div className="text-center">
              <img src={loginimage} alt="loginimage" className="" />
            </div>

            <input
              className="form-control col-8 mx-auto m-4 custom-bg-color"
              type="text"
              placeholder="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              style={{ paddingLeft: "30px" }} // Add padding for the icon
            />

            <input
              type="password"
              className="form-control col-8 mx-auto m-4 custom-bg-color"
              placeholder="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <div className="d-flex justify-content-center">
              <button type="submit" className="btn primary">
                LOG IN
              </button>
            </div>
          </div>
        </div>
      </form>
      <Footer />
    </>
  );
}

export default LoginPage;
