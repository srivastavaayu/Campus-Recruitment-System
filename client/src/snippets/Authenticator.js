import React, { useState, useEffect } from "react";
import { Link, NavLink,useHistory } from "react-router-dom";
import "../css/Header.css";
import "../css/Home.css";
import crslogo from "../img/crslogo.png";
import Select from 'react-select';

function Authenticator(props) {
  let [authMode, setAuthMode] = useState(props.location.state.authMode);
  let [authTitle, setAuthTitle] = useState("");
  let [authModeText, setAuthModeText] = useState("");
  let [authText, setAuthText] = useState("");

  useEffect(() => {
    if (authMode === "login") {
      setAuthTitle("Login to Campus Recruitment System");
      setAuthModeText("Don't have an account? Signup here!");
      setAuthText("Login");
      document.getElementById("homeAuthButtonForgotPassword").style.display =
        "inline-block";
      document.getElementsByClassName("form-label")[3].style.display = "None";
      document.getElementById(
        "homeAuthReenterPasswordContainer"
      ).style.display = "None";
    } else {
      setAuthTitle("Signup on Campus Recruitment System");
      setAuthModeText("Already have an account? Login here!");
      setAuthText("Signup");
      document.getElementById("homeAuthButtonForgotPassword").style.display =
        "None";
      document.getElementsByClassName("form-label")[3].style.display =
        "inline-block";
      document.getElementById(
        "homeAuthReenterPasswordContainer"
      ).style.display = "flex";
    }
  }, [authMode]);


  //backend
  const history = useHistory();
  const data = [
    {
      value: 1,
      label: "Admin"
    },
    {
      value: 2,
      label: "Placement Coordinator"
    },
    {
      value: 3,
      label: "Company"
    },
    {
      value: 4,
      label: "Student"
    }
  ];


  const [user,setUser] = useState({
    member:"",
    userName:"",
    password:""

  });
  const [selectedValue, setSelectedValue] = useState();
  let name,value;
  const handleInputs = (e) =>{
      console.log(e.target.value);
      name = e.target.name;
      value=e.target.value;

      setUser({...user,[name]:value});
  }
  const handleChange = (e) => {
    setSelectedValue(e.label);
    name="member";
    value=e.label;
    setUser({...user,[name]:value});
    console.log(e.label);
    console.log(user.member);
  }

  const logIn = async (e) =>{

    e.preventDefault();
    console.log(user);
    const {member,userName, password} = user;
    try{
      const res = await fetch("/login",{
        method:"POST",
        headers:{
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          member,userName, password
        })
      });
  
      const data = await res.json();
  
      if (res.status ===202){
        console.log("SuccessFul");
        window.alert("Successful");

        if(member =='Student'){
          history.push("/Student/Home");
        }else if(member=="Placement Coordinator"){
          history.push("/PlacementCoordinator/Home");
        }else if(member=="Company"){
          history.push("/Company/Home");
        }else if(member=="Admin"){
          history.push("/Admin/Home");
        }
      }else{
        console.log("Invalid Credantials");
        window.alert("Invalid Credantials");
      }
    

    }catch(e){
      console.log("Error");
      console.log(e);
    }
  }

    
  

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
        <form action="" method="POST">
          <div className="mb-3">
          <label className="form-label" htmlFor="homeAuthMemberType">
              Member Type
            </label>
            <Select
        placeholder="Select Option"
        name="member"
        value={data.find(obj => obj.value === selectedValue)} // set selected value
        options={data} // set list of the data
        onChange={handleChange} // assign onChange function
      />

          </div>
          <label className="form-label" htmlFor="homeAuthUsername">
            Username
          </label>
          <div className="input-group mb-3">
            <span className="input-group-text">@</span>
            <input
              id="homeAuthUsername"
              className="form-control"
              type="text"
              placeholder="Username"
              name="userName"
              value={user.userName}
              onChange={handleInputs}
              required
            />
          </div>
          <label className="form-label" htmlFor="homeAuthPassword">
            Password
          </label>
          <div className="input-group mb-3">
            <input
              id="homeAuthPassword"
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
          <label className="form-label" htmlFor="homeAuthReenterPassword">
            Re-enter Password
          </label>
          <div
            id="homeAuthReenterPasswordContainer"
            className="input-group mb-3"
          >
            <input
              id="homeAuthReenterPassword"
              className="form-control"
              type="password"
              placeholder="Re-enter Password"
              name="reenterpassword"
              value={user.reenterpassword}
              onchange={handleInputs}
              required
            />
          </div>
          <button
            className="btn btn-primary float-start"
            onClick={() =>
              setAuthMode(authMode === "login" ? "signup" : "login")
            }
          >
            {authModeText}
          </button>
          <button className="btn btn-success float-end" 
            onClick = {logIn}
          type="submit">
            {authText}
          
          </button>
        </form>
      </main>
    </>
  );
}

export default Authenticator;
