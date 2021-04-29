import React, { useState, useEffect } from "react";
import { Link, NavLink, useParams } from "react-router-dom";
import "../../css/ManageUsers.css";
import Header from "./Header";

function PendingUsers() {
  return (
    <>
      <table className="table">
        <thead>
          <tr>
            <th>#</th>
            <th>Enrollment Number</th>
            <th>Name</th>
            <th>Approve</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>181B005</td>
            <td>Aayush Srivastava</td>
            <td>
              <button className="btn btn-outline-success">Approve</button>
            </td>
            <td>
              <button className="btn btn-outline-danger">Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
    </>
  );
}
function AllUsers() {
  return (
    <>
      <>
        <table className="table">
          <thead>
            <tr>
              <th>#</th>
              <th>Enrollment Number</th>
              <th>Name</th>
              <th>Approve</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>181B005</td>
              <td>Aayush Srivastava</td>
              <td>
                <button className="btn btn-outline-success">Approve</button>
              </td>
              <td>
                <button className="btn btn-outline-danger">Delete</button>
              </td>
            </tr>
          </tbody>
        </table>
      </>
    </>
  );
}

function ManageUsers() {
  let { slug } = useParams();
  let [userType, setUserType] = useState(slug);
  useEffect(() => {
    document
      .getElementsByClassName("dropdown-toggle")[0]
      .classList.add("active");
  }, [slug]);
  return (
    <>
      <Header />
      <main>
        <h2 id="webpageTitle" className="text-center">
          Manage {userType}
        </h2>
        <hr />
        <div id="manageUsersContainer">
          <nav className="nav nav-tabs nav-fill">
            <NavLink
              className="nav-link"
              to="/PlacementCoordinator/ManageUsers/Companies"
              onClick={() => setUserType("Companies")}
            >
              Companies
            </NavLink>
            <NavLink
              className="nav-link"
              to="/PlacementCoordinator/ManageUsers/Students"
              onClick={() => setUserType("Students")}
            >
              Students
            </NavLink>
          </nav>
          <h3 className="text-center">Pending {userType}</h3>
          <PendingUsers />
          <h3 className="text-center">All {userType}</h3>
          <AllUsers />
        </div>
      </main>
    </>
  );
}

export default ManageUsers;
