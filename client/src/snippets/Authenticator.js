import React, { useState, useEffect } from "react";
import { Link, NavLink, useHistory, Redirect } from "react-router-dom";
import "../css/Header.css";
import "../css/Home.css";
import crslogo from "../img/crslogo.png";
import Select from "react-select";

function Authenticator(props) {
  let [authMode, setAuthMode] = useState(props.location.state.authMode);
  let [authTitle, setAuthTitle] = useState("");

  useEffect(() => {
    if (authMode === "login") {
      setAuthTitle("Login to Campus Recruitment System");
      document.getElementById("loginForm").style.display = "block";
      document.getElementById("registerForm").style.display = "None";
    } else {
      setAuthTitle("Signup on Campus Recruitment System");
      document.getElementById("loginForm").style.display = "None";
      document.getElementById("registerForm").style.display = "block";
    }
  }, [authMode]);

  //backend
  const history = useHistory();
  const data = [
    {
      value: 1,
      label: "Admin",
    },
    {
      value: 2,
      label: "Placement Coordinator",
    },
    {
      value: 3,
      label: "Company",
    },
    {
      value: 4,
      label: "Student",
    },
  ];

  const [user, setUser] = useState({
    member: "",
    userName: "",
    password: "",
  });

  const [signUser, setSignUser] = useState({
    member: "",
    userName: "",
    name: "",
    email: "",
    password: "",
    rpassword: "",
  });
  const [selectedValue, setSelectedValue] = useState();
  let name, value;
  const handleInputs = (e) => {
    console.log(e.target.value);
    name = e.target.name;
    value = e.target.value;

    setUser({ ...user, [name]: value });
  };
  const handleChange = (e) => {
    setSelectedValue(e.label);
    name = "member";
    value = e.label;
    setUser({ ...user, [name]: value });
    console.log(e.label);
    console.log(user.member);
  };

  //sign up form

  const handleChange1 = (e) => {
    setSelectedValue(e.label);
    name = "member";
    value = e.label;
    setSignUser({ ...user, [name]: value });
    console.log(e.label);
    console.log(user.member);
  };

  const handleInputs1 = (e) => {
    console.log(e.target.value);
    name = e.target.name;
    value = e.target.value;

    setSignUser({ ...signUser, [name]: value });
  };
  const random = (e) => {
    console.log("calling a function");
  };

  //register a user
  const registerUser = async (e) => {
    e.preventDefault();
    console.log(signUser);

    const { member, userName, name, email, password, rpassword } = signUser;
    try {
      const res = await fetch("/registerUser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          member,
          userName,
          name,
          email,
          password,
          rpassword,
        }),
      });

      const data = await res.json();

      if (res.status === 201) {
        console.log(data.message);
        window.alert(data.message);
        history.push("/");
      } else {
        console.log(data.message);
        window.alert(data.message);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const logIn = async (e) => {
    e.preventDefault();
    console.log(user);
    const { member, userName, password } = user;
    try {
      const res = await fetch("/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          member,
          userName,
          password,
        }),
      });

      const data = await res.json();

      if (res.status === 202) {
        console.log("SuccessFul");
        window.alert("Successful");

        if (member == "Student") {
          history.push("/Student/Home");
        } else if (member == "Placement Coordinator") {
          history.push("/PlacementCoordinator/Home");
        } else if (member == "Company") {
          history.push("/Company/Home");
        } else if (member == "Admin") {
          history.push("/Admin/Home");
        }
      } else {
        console.log(data.message);
        window.alert(data.message);
      }
    } catch (e) {
      console.log("Error");
      console.log(e);
    }
  };

  return (
    <>
      <header>
        <nav className="navbar navbar-expand-sm navbar-light bg-light">
          <div className="container-fluid">
            <Link className="navbar-brand" to="/">
              <img
                className="float-start"
                src={crslogo}
                alt=""
                width="50px"
                height="auto"
              />
              <h1 id="headerBrandName" className="navbar-text">
                Campus Recruitment System
              </h1>
            </Link>
            <button
              class="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#homeAuthNavbarMenu"
            >
              <span class="navbar-toggler-icon"></span>
            </button>
            <div id="homeAuthNavbarMenu" className="collapse navbar-collapse">
              <ul className="navbar-nav ms-auto">
                <li className="nav-item">
                  <NavLink className="nav-link" to="/">
                    Home
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/About">
                    About
                  </NavLink>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </header>
      <main id="homeAuthMain">
        <h2 className="text-center">{authTitle}</h2>
        <form id="loginForm" action="" method="POST">
          <div className="mb-3">
            <label className="form-label" htmlFor="InputLoginMemberType">
              Member Type
            </label>
            <Select
              id="InputLoginMemberType"
              placeholder="Select Option"
              name="member"
              value={data.find((obj) => obj.value === selectedValue)} // set selected value
              options={data} // set list of the data
              onChange={handleChange} // assign onChange function
            />
          </div>
          <label className="form-label" htmlFor="InputLoginUsername">
            Username
          </label>
          <div className="input-group mb-3">
            <span className="input-group-text">@</span>
            <input
              id="InputLoginUsername"
              className="form-control"
              type="text"
              placeholder="Username"
              name="userName"
              value={user.userName}
              onChange={handleInputs}
              required
            />
          </div>
          <label className="form-label" htmlFor="InputLoginPassword">
            Password
          </label>
          <div className="input-group mb-3">
            <input
              id="InputLoginPassword"
              className="form-control"
              type="password"
              placeholder="Password"
              name="password"
              value={user.password}
              onChange={handleInputs}
              required
            />
            <button
              id="homeAuthButtonForgotPassword"
              className="btn btn-outline-warning"
            >
              Forgot Password?
            </button>
          </div>
          <button
            className="btn btn-primary float-start"
            onClick={() =>
              setAuthMode(authMode === "login" ? "signup" : "login")
            }
          >
            New to Campus Recruitment System? Register here!
          </button>
          <button
            className="btn btn-success float-end"
            onClick={logIn}
            type="submit"
          >
            Login
          </button>
        </form>
        <form id="registerForm" action="" method="POST">
          <div className="mb-3">
            <label className="form-label" htmlFor="InputRegisterMemberType">
              Member Type
            </label>
            <Select
              id="InputRegisterMemberType"
              placeholder="Select Option"
              name="member"
              value={data.find((obj) => obj.value === selectedValue)} // set selected value
              options={data} // set list of the data
              onChange={handleChange1} // assign onChange function
            />
          </div>

          <label className="form-label" htmlFor="InputRegisterUsername">
            Username
          </label>
          <div className="input-group mb-3">
            <span className="input-group-text">@</span>
            <input
              id="InputRegisterUsername"
              className="form-control"
              type="text"
              placeholder="Username"
              name="userName"
              value={signUser.userName}
              onChange={handleInputs1}
              required
            />
          </div>
          <label className="form-label" htmlFor="InputRegisterName">
            Name
          </label>
          <div className="mb-3">
            <input
              id="InputRegisterName"
              className="form-control"
              type="text"
              placeholder="Name"
              name="name"
              value={signUser.name}
              onChange={handleInputs1}
              required
            />
          </div>
          <label className="form-label" htmlFor="InputRegisterEmail">
            Email
          </label>
          <div className="mb-3">
            <input
              id="InputRegisterEmail"
              className="form-control"
              type="email"
              placeholder="Email"
              name="email"
              value={signUser.email}
              onChange={handleInputs1}
              required
            />
          </div>
          <label className="form-label" htmlFor="InputRegisterPassword">
            Password
          </label>
          <div className="input-group mb-3">
            <input
              id="InputRegisterPassword"
              className="form-control"
              type="password"
              placeholder="Password"
              name="password"
              value={signUser.password}
              onChange={handleInputs1}
              required
            />
          </div>

          <label className="form-label" htmlFor="InputRegisterReenterPassword">
            Re-enter Password
          </label>
          <div className="input-group mb-3">
            <input
              id="InputRegisterReenterPassword"
              className="form-control"
              type="password"
              placeholder="Re-enter Password"
              name="rpassword"
              value={signUser.rpassword}
              onChange={handleInputs1}
              required
            />
          </div>
          <button
            className="btn btn-primary float-start"
            onClick={() =>
              setAuthMode(authMode === "login" ? "signup" : "login")
            }
          >
            Already have an account? Login here!
          </button>
          <button
            className="btn btn-success float-end"
            onClick={registerUser}
            type="submit"
          >
            Register
          </button>
        </form>
      </main>
    </>
  );
}

export default Authenticator;
