import React from "react";
import "./login.css";
import { useState } from "react";
import { instance } from "../App";
import { useNavigate, Link } from "react-router-dom";
import { toastSuccess, toastWarn } from "../services/toast";

const Login = () => {
  const data = { email: "", password: "" };
  const [user, setUser] = useState(data);

  const handleInput = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    instance
      .post("/login", {
        email: user.email,
        password: user.password,
      })
      .then((res) => {
        toastSuccess(res.data.message);
        navigate("/");
      })
      .catch((response) => {
        toastWarn(response.response.data.message);
      });
  };
  return (
    <>
      <div className="register">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/IMDB_Logo_2016.svg/863px-IMDB_Logo_2016.svg.png"
          alt="logo"
        />
        <form className="form" onSubmit={handleSubmit}>
          <h2>Sign-in Account</h2>
          <label htmlFor="email">
            <b>Email</b>{" "}
          </label>
          <input
            type="email"
            name="email"
            id="email"
            value={user.email}
            onChange={handleInput}
            required
          />
          <label htmlFor="password">
            <b>Password</b>{" "}
          </label>
          <input
            type="password"
            placeholder="at least 8 characters"
            name="password"
            id="password"
            value={user.password}
            onChange={handleInput}
            required
          />
          <button type="submit">Sign in</button>
          <hr />
          <div>
            New to IMDB ? <Link to={"/register"}>Sign-Up</Link>
          </div>
        </form>
      </div>
    </>
  );
};

export default Login;
