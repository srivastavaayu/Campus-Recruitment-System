import React, { useState, useEffect } from "react";
import { Link, NavLink,useHistory } from "react-router-dom";
import "../../css/Header.css";
import crslogo from "../../img/crslogo.png";

function Header(props) {
  let [username, setUsername] = useState(props.username);

  //backend
  const [userData,setUserData] = useState({});
  const history = useHistory();

  const callAboutPage = async ()=>{
    try{
      const res = await fetch('/userData',{
        method:"GET",
        headers:{
          Accept: "application/json",
          "Content-Type": "application/json"
          },
          credentials:"include"
      });

      const data = await res.json();
      console.log(data);
      setUserData(data);
            


      if(!res.status ===200){
        const error = new Error(res.error);
          throw error;
        }

        }catch(err){
            console.log(err);
            history.push('');

        }
  }


  useEffect(() => {
    document.getElementsByClassName("dropdown-toggle")[0].style.userSelect =
      "None";
    document.getElementsByClassName("dropdown-toggle")[1].style.userSelect =
      "None";

    callAboutPage();

  }, []);
  return (
    <>
      <header>
        <nav className="navbar navbar-expand-sm navbar-light bg-light">
          <div className="container-fluid">
            <Link className="navbar-brand" to="/PlacementCoordinator/Home">
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
              data-bs-target="#placementCoordinatorNavbarMenu"
            >
              <span class="navbar-toggler-icon"></span>
            </button>
            <div
              id="placementCoordinatorNavbarMenu"
              className="collapse navbar-collapse"
            >
              <ul className="navbar-nav ms-auto">
                <li className="nav-item">
                  <NavLink className="nav-link" to="/PlacementCoordinator/Home">
                    Home
                  </NavLink>
                </li>
                <li className="nav-item dropdown">
                  <a
                    className="nav-link dropdown-toggle"
                    role="button"
                    data-bs-toggle="dropdown"
                  >
                    Manage Users
                  </a>
                  <div className="dropdown-menu dropdown-menu-end">
                    <NavLink
                      className="dropdown-item"
                      to="/PlacementCoordinator/ManageUsers/Companies"
                    >
                      Manage Companies
                    </NavLink>
                    <NavLink
                      className="dropdown-item"
                      to="/PlacementCoordinator/ManageUsers/Students"
                    >
                      Manage Students
                    </NavLink>
                  </div>
                </li>
                <li className="nav-item">
                  <NavLink
                    className="nav-link"
                    to="/PlacementCoordinator/Notifications"
                  >
                    Notifications
                  </NavLink>
                </li>
                <li className="nav-item dropdown">
                  <a
                    className="nav-link dropdown-toggle"
                    role="button"
                    data-bs-toggle="dropdown"
                  >
                    @{userData.userName}
                  </a>
                  <div className="dropdown-menu dropdown-menu-end">
                    <NavLink
                      className="dropdown-item"
                      to="/PlacementCoordinator/Profile"
                    >
                      Edit Profile
                    </NavLink>
                    <NavLink
                      className="dropdown-item"
                      to="/PlacementCoordinator/ChangePassword"
                    >
                      Change Password
                    </NavLink>
                    <div class="dropdown-divider"></div>
                    <Link className="dropdown-item" to="/">
                      Logout @{username}
                    </Link>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </header>
    </>
  );
}

export default Header;
