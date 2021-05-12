import React, { useState, useEffect } from "react";
import { Link, NavLink, useParams } from "react-router-dom";
import "../../css/ManageUsers.css";
import Header from "./Header";

function PendingPlacementCoordinators() {
  //backend for pending Companies
  const [companydata, setCompanyData] = useState([]);

  const callAboutPage = async () => {
    try {
      const res = await fetch("/newUserData", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user: "Placement Coordinator",
        }),
      });

      const data = await res.json();

      setCompanyData(data);

      console.log(companydata);
    } catch (e) {
      console.log(e);
    }
  };

  const approve = async (userName, name) => {
    //console.log("Inside Pending Companies Approve Functions");
    //console.log(userName,name);

    const user = "Placement Coordinator";

    try {
      const res = await fetch("/verifyUser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user,
          userName,
          name,
        }),
      });

      const data = await res.json();

      if (res.status === 202) {
        console.log(data.message);
        window.alert(data.message);
      } else {
        console.log(data.message);
        window.alert(data.message);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const deleteUser = async (userName, name) => {
    //console.log("Inside Pending Companies Delete Functions");
    //console.log(userName,name);

    const user = "Placement Coordinator";

    try {
      const res = await fetch("/deleteUsers", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user,
          userName,
          name,
        }),
      });

      const data = await res.json();

      if (res.status === 202) {
        console.log(data.message);
        window.alert(data.message);
        window.location.reload(true);
      } else {
        console.log(data.message);
        window.alert(data.message);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    callAboutPage();
  }, []);

  return (
    <>
      <h3 id="webpageTitle" className="text-center">
        Pending Placement Coordinators
      </h3>
      <table className="table align-middle">
        <thead>
          <tr>
            <th>#</th>
            <th>Placement Coordinator Username</th>
            <th>Placement Coordinator Name</th>
            <th>Approve</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {companydata.map(({ name, userName }, id) => {
            return (
              <tr>
                <td>{id + 1}</td>
                <td>{userName}</td>
                <td>{name}</td>
                <td>
                  <button
                    className="btn btn-outline-success"
                    onClick={approve.bind(this, userName, name)}
                  >
                    Approve
                  </button>
                </td>
                <td>
                  <button
                    className="btn btn-outline-danger"
                    onClick={deleteUser.bind(this, userName, name)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
}

function AllPlacementCoordinators() {
  //backend for pending Companies
  const [companydata, setCompanyData] = useState([]);

  const callAboutPage = async () => {
    try {
      const res = await fetch("/verifyUserData", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user: "Placement Coordinator",
        }),
      });

      const data = await res.json();

      setCompanyData(data);

      console.log(companydata);
    } catch (e) {
      console.log(e);
    }
  };

  const deleteUser = async (userName, name) => {
    //console.log("Inside Pending Companies Delete Functions");
    //console.log(userName,name);

    const user = "Placement Coordinator";

    try {
      const res = await fetch("/deleteUsers", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user,
          userName,
          name,
        }),
      });

      const data = await res.json();

      if (res.status === 202) {
        console.log(data.message);
        window.alert(data.message);
        window.location.reload(true);
      } else {
        console.log(data.message);
        window.alert(data.message);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    callAboutPage();
  }, []);

  return (
    <>
      <h3 id="webpageTitle" className="text-center">
        All Placement Coordinators
      </h3>
      <table className="table align-middle">
        <thead>
          <tr>
            <th>#</th>
            <th>Placement Coordinator Username</th>
            <th>Placement Coordinator Name</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {companydata.map(({ name, userName }, id) => {
            return (
              <tr>
                <td>{id + 1}</td>
                <td>{userName}</td>
                <td>{name}</td>
                <td>
                  <button
                    className="btn btn-outline-danger"
                    onClick={deleteUser.bind(this, userName, name)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
}

function PendingCompanies() {
  //backend for pending Companies
  const [companydata, setCompanyData] = useState([]);

  const callAboutPage = async () => {
    try {
      const res = await fetch("/newUserData", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user: "Company",
        }),
      });

      const data = await res.json();

      setCompanyData(data);

      console.log(companydata);
    } catch (e) {
      console.log(e);
    }
  };

  const approve = async (userName, name) => {
    //console.log("Inside Pending Companies Approve Functions");
    //console.log(userName,name);

    const user = "Company";

    try {
      const res = await fetch("/verifyUser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user,
          userName,
          name,
        }),
      });

      const data = await res.json();

      if (res.status === 202) {
        console.log(data.message);
        window.alert(data.message);
        window.location.reload(true);
      } else {
        console.log(data.message);
        window.alert(data.message);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const deleteUser = async (userName, name) => {
    //console.log("Inside Pending Companies Delete Functions");
    //console.log(userName,name);

    const user = "Company";

    try {
      const res = await fetch("/deleteUsers", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user,
          userName,
          name,
        }),
      });

      const data = await res.json();

      if (res.status === 202) {
        console.log(data.message);
        window.alert(data.message);
        window.location.reload(true);
      } else {
        console.log(data.message);
        window.alert(data.message);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    callAboutPage();
  }, []);

  return (
    <>
      <h3 id="webpageTitle" className="text-center">
        Pending Companies
      </h3>
      <table className="table align-middle">
        <thead>
          <tr>
            <th>#</th>
            <th>Company Username</th>
            <th>Company Name</th>
            <th>Company E-mail</th>
            <th>Approve</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {companydata.map(({ name, email, userName }, id) => {
            return (
              <tr>
                <td>{id + 1}</td>
                <td>{userName}</td>
                <td>{name}</td>
                <td>{email}</td>
                <td>
                  <button
                    className="btn btn-outline-success"
                    onClick={approve.bind(this, userName, name)}
                  >
                    Approve
                  </button>
                </td>
                <td>
                  <button
                    className="btn btn-outline-danger"
                    onClick={deleteUser.bind(this, userName, name)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
}

function AllCompanies() {
  //backend for pending Companies
  const [companydata, setCompanyData] = useState([]);

  const callAboutPage = async () => {
    try {
      const res = await fetch("/verifyUserData", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user: "Company",
        }),
      });

      const data = await res.json();

      setCompanyData(data);

      console.log(companydata);
    } catch (e) {
      console.log(e);
    }
  };

  const deleteUser = async (userName, name) => {
    //console.log("Inside Pending Companies Delete Functions");
    //console.log(userName,name);

    const user = "Company";

    try {
      const res = await fetch("/deleteUsers", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user,
          userName,
          name,
        }),
      });

      const data = await res.json();

      if (res.status === 202) {
        console.log(data.message);
        window.alert(data.message);
        window.location.reload(true);
      } else {
        console.log(data.message);
        window.alert(data.message);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    callAboutPage();
  }, []);

  return (
    <>
      <h3 id="webpageTitle" className="text-center">
        All Companies
      </h3>
      <table className="table align-middle">
        <thead>
          <tr>
            <th>#</th>
            <th>Company Username</th>
            <th>Company Name</th>
            <th>Company E-mail</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {companydata.map(({ name, email, userName }, id) => {
            return (
              <tr>
                <td>{id + 1}</td>
                <td>{userName}</td>
                <td>{name}</td>
                <td>{email}</td>
                <td>
                  <button
                    className="btn btn-outline-danger"
                    onClick={deleteUser.bind(this, userName, name)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
}

function PendingStudents() {
  //backend for pending Students
  const [studentdata, setStudentData] = useState([]);

  const callAboutPage = async () => {
    try {
      const res = await fetch("/newUserData", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user: "Student",
        }),
      });

      const data = await res.json();

      setStudentData(data);

      console.log(studentdata);
    } catch (e) {
      console.log(e);
    }
  };

  const approve = async (userName, name) => {
    //console.log("Inside Pending Students Approve Functions");
    //console.log(userName,name);

    const user = "Student";

    try {
      const res = await fetch("/verifyUser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user,
          userName,
          name,
        }),
      });

      const data = await res.json();

      if (res.status === 202) {
        console.log(data.message);
        window.alert(data.message);
        window.location.reload(true);
      } else {
        console.log(data.message);
        window.alert(data.message);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const deleteUser = async (userName, name) => {
    //console.log("Inside Pending Students Delete Functions");
    //console.log(userName,name);

    const user = "Student";

    try {
      const res = await fetch("/deleteUsers", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user,
          userName,
          name,
        }),
      });

      const data = await res.json();

      if (res.status === 202) {
        console.log(data.message);
        window.alert(data.message);
        window.location.reload(true);
      } else {
        console.log(data.message);
        window.alert(data.message);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    callAboutPage();
  }, []);

  return (
    <>
      <h3 id="webpageTitle" className="text-center">
        Pending Students
      </h3>
      <table className="table align-middle">
        <thead>
          <tr>
            <th>#</th>
            <th>Student Enrollment Number</th>
            <th>Student Name</th>
            <th>Approve</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {studentdata.map(({ name, userName }, id) => {
            return (
              <tr>
                <td>{id + 1}</td>
                <td>{userName}</td>
                <td>{name}</td>
                <td>
                  <button
                    className="btn btn-outline-success"
                    onClick={approve.bind(this, userName, name)}
                  >
                    Approve
                  </button>
                </td>
                <td>
                  <button
                    className="btn btn-outline-danger"
                    onClick={deleteUser.bind(this, userName, name)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
}

function AllStudents() {
  //backend for pending Students
  const [studentdata, setStudentData] = useState([]);

  const callAboutPage = async () => {
    try {
      const res = await fetch("/verifyUserData", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user: "Student",
        }),
      });

      const data = await res.json();

      setStudentData(data);

      console.log(studentdata);
    } catch (e) {
      console.log(e);
    }
  };

  //backend Code for delete Students
  const deleteUser = async (userName, name) => {
    //console.log("Inside Pending Students Delete Functions");
    //console.log(userName,name);

    const user = "Student";

    try {
      const res = await fetch("/deleteUsers", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user,
          userName,
          name,
        }),
      });

      const data = await res.json();

      if (res.status === 202) {
        console.log(data.message);
        window.alert(data.message);
        window.location.reload(true);
      } else {
        console.log(data.message);
        window.alert(data.message);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    callAboutPage();
  }, []);

  return (
    <>
      <h3 id="webpageTitle" className="text-center">
        All Students
      </h3>
      <table className="table align-middle">
        <thead>
          <tr>
            <th>#</th>
            <th>Student Enrollment Number</th>
            <th>Student Name</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {studentdata.map(({ name, userName }, id) => {
            return (
              <tr>
                <td>{id + 1}</td>
                <td>{userName}</td>
                <td>{name}</td>
                <td>
                  <button
                    className="btn btn-outline-danger"
                    onClick={deleteUser.bind(this, userName, name)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
}

function ManageUsers() {
  return (
    <>
      <Header />
      <main>
        <h2 id="webpageTitle" className="text-center">
          Manage Users
        </h2>
        <hr />
        <div id="manageUsersContainer">
          <nav className="nav nav-tabs nav-fill">
            <a
              className="nav-link active"
              data-bs-toggle="tab"
              data-bs-target="#ManagePlacementCoordinators"
            >
              Placement Coordinators
            </a>
            <a
              className="nav-link"
              data-bs-toggle="tab"
              data-bs-target="#ManageCompanies"
            >
              Companies
            </a>
            <a
              className="nav-link"
              data-bs-toggle="tab"
              data-bs-target="#ManageStudents"
            >
              Students
            </a>
          </nav>
          <div className="tab-content">
            <div
              className="tab-pane fade show active"
              id="ManagePlacementCoordinators"
            >
              <PendingPlacementCoordinators />
              <AllPlacementCoordinators />
            </div>
            <div className="tab-pane fade" id="ManageCompanies">
              <PendingCompanies />
              <AllCompanies />
            </div>
            <div className="tab-pane fade" id="ManageStudents">
              <PendingStudents />
              <AllStudents />
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export default ManageUsers;
