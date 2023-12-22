import React from "react";
import "./register.css";
import { useState } from "react";
import { instance } from "../App";
import { useNavigate, Link } from "react-router-dom";
import { toastSuccess, infoToast } from "../services/toast";

const Register = () => {
  const data = { name: "", email: "", password: "", confirmPassword: "" };
  const [user, setUser] = useState(data);
  const [errors, setErrors] = useState({});
  const handleInput = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    let error = {};
    var emailPattern = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;
    var passwordPattern =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{8,12}$/;

    if (user.name === "") {
      error.name = "Name is required.";
    }
    if (!emailPattern.test(user.email)) {
      error.email = "Please enter valid Email";
    }
    if (!passwordPattern.test(user.password)) {
      error.password = "Enter a strong Password";
    }
    if (user.password !== user.confirmPassword) {
      error.mismatch = "Passwords do not match";
    }
    setErrors(error);

    if (!user.email || !user.name || !user.password || !user.confirmPassword) {
      alert("Something issue is there");
    } else if (!error.mismatch && !error.password) {
      instance
        .post("/register", {
          name: user.name,
          email: user.email,
          password: user.password,
        })
        .then((res) => {
          toastSuccess(res.data.message);
          navigate("/login");
        })
        .catch((response) => {
          infoToast(response.response.data.message);
        });
    }
  };

  return (
    <>
      <div className="register ">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/IMDB_Logo_2016.svg/863px-IMDB_Logo_2016.svg.png"
          alt="logo"
        />
        <form className="form" onSubmit={handleSubmit}>
          <h2>Create Account</h2>
          <label htmlFor="name">
            <b>Your Name</b>{" "}
          </label>
          <input
            type="text"
            placeholder="First and last name"
            name="name"
            id="name"
            value={user.name}
            onChange={handleInput}
            required
          />
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
          <span>{errors.email && errors.email}</span>
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
          <span>{errors.password && errors.password}</span>
          <label htmlFor="confirmPassword">
            <b>Re-enter Password</b>{" "}
          </label>
          <input
            type="password"
            name="confirmPassword"
            id="confirmPassword"
            value={user.confirmPassword}
            onChange={handleInput}
            required
          />
          <span>{errors.mismatch && errors.mismatch}</span>
          <button type="submit">Create your IMDB Account</button>
          <hr />
          <div>
            Already have account ? <Link to={"/login"}>Sign-In</Link>
          </div>
        </form>
      </div>
    </>
  );
};

export default Register;
