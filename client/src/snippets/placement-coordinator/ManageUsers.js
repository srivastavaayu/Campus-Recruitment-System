import React, { useState, useEffect } from "react";
import { Link, NavLink, useParams } from "react-router-dom";
import "../../css/ManageUsers.css";
import Header from "./Header";

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
    } catch (e) {
      console.log(e);
    }
  };

  const approve = async (userName, name) => {
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
        window.alert(data.message);
        window.location.reload(true);
      } else {
        window.alert(data.message);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const deleteUser = async (userName, name) => {
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
        window.alert(data.message);
        window.location.reload(true);
      } else {
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
  //backend for all Companies
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
    } catch (e) {
      console.log(e);
    }
  };

  //delete company
  const deleteUser = async (userName, name) => {
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
        window.alert(data.message);
        window.location.reload(true);
      } else {
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
    } catch (e) {
      console.log(e);
    }
  };

  const approve = async (userName, name) => {
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
        window.alert(data.message);
        window.location.reload(true);
      } else {
        window.alert(data.message);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const deleteUser = async (userName, name) => {
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
        window.alert(data.message);
        window.location.reload(true);
      } else {
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
            <th>Student Username</th>
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
  //backend for all Students
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
    } catch (e) {
      console.log(e);
    }
  };

  //backend Code for delete Students
  const deleteUser = async (userName, name) => {
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
        window.alert(data.message);
        window.location.reload(true);
      } else {
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
            <th>Student UserName</th>
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
            <a
              className="nav-link active"
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
            <div className="tab-pane fade show active" id="ManageCompanies">
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
