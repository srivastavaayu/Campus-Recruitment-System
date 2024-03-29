import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import Header from "./Header";

function AllNotifications() {
  //backend for all notifications

  const [notifyData, setNotifyData] = useState([]);
  const history = useHistory();

  const callAboutPage = async () => {
    try {
      const res = await fetch("/getNotification", {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      const data = await res.json();
      setNotifyData(data);

      if (!res.status === 200) {
        const error = new Error(res.error);
        throw error;
      }
    } catch (err) {
      console.log(err);
      history.push("");
    }
  };

  const target = (students, companies) => {
    let result = "";
    if (students) {
      result += "Students,";
    }
    if (companies) {
      result += "Companies";
    }

    return result;
  };

  useEffect(() => {
    callAboutPage();
  }, []);

  return (
    <>
      <table className="table">
        <thead>
          <tr>
            <th>#</th>
            <th>Timestamp</th>
            <th>Creator Role</th>
            <th>Target</th>
            <th>Title</th>
            <th>Message</th>
          </tr>
        </thead>
        <tbody>
          {notifyData.map(
            (
              { creatorRole, date, title, message, students, companies },
              id
            ) => {
              return (
                <tr>
                  <td>{id + 1}</td>
                  <td>{date}</td>
                  <td>{creatorRole}</td>
                  <td>{target(students, companies)}</td>
                  <td>{title}</td>
                  <td>{message}</td>
                </tr>
              );
            }
          )}
        </tbody>
      </table>
    </>
  );
}

function Notifications() {
  //backend for
  const [data, setData] = useState({
    students: "false",
    companies: "false",
    title: "",
    message: "",
  });

  let name, value;
  const handleInputs = (e) => {
    name = e.target.name;
    value = e.target.value;

    if (e.target.checked) {
      data[name] = "true";
    } else {
      data[name] = "false";
    }
  };

  const handleInputsChange = (e) => {
    name = e.target.name;
    value = e.target.value;

    setData({ ...data, [name]: value });
  };

  const sendNotification = async (e) => {
    e.preventDefault();
    const { students, companies, title, message } = data;
    try {
      const res = await fetch("/notifyData", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          students,
          companies,
          title,
          message,
        }),
      });

      const resdt = await res.json();

      if (res.status === 201) {
        window.alert("Notification successfull");
      } else {
        window.alert("Notification unsuccessfull");
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <Header />
      <main>
        <div
          className="modal fade"
          data-bs-backdrop="static"
          data-bs-keyboard="false"
          id="placementCoordinatorAddNotification"
          tabIndex="-1"
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Add Notification</h5>
                <button className="btn-close" data-bs-dismiss="modal"></button>
              </div>
              <div className="modal-body">
                <label
                  className="form-label"
                  htmlFor="placementCoordinatorNotificationType"
                >
                  Notification Target
                </label>
                <div id="placementCoordinatorNotificationType" className="mb-3">
                  <div className="form-check">
                    <input
                      id="placementCoordinatorTargetCheckbox1"
                      className="form-check-input"
                      type="checkbox"
                      value="Companies"
                      name="companies"
                      onChange={handleInputs}
                    />
                    <label
                      className="form-check-label"
                      htmlFor="placementCoordinatorTargetCheckbox1"
                    >
                      Companies
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                      id="placementCoordinatorTargetCheckbox2"
                      className="form-check-input"
                      type="checkbox"
                      value="Students"
                      name="students"
                      onChange={handleInputs}
                    />
                    <label
                      className="form-check-label"
                      htmlFor="placementCoordinatorTargetCheckbox2"
                    >
                      Students
                    </label>
                  </div>
                </div>
                <label
                  className="form-label"
                  htmlFor="placementCoordinatorNotificationTitle"
                >
                  Notification Title
                </label>
                <div className="input-group mb-3">
                  <input
                    id="placementCoordinatorNotificationTitle"
                    className="form-control"
                    type="text"
                    placeholder="Notification Title"
                    name="title"
                    value={data.title}
                    onChange={handleInputsChange}
                  />
                </div>
                <label
                  className="form-label"
                  htmlFor="placementCoordinatorNotificationMessage"
                >
                  Notification Message
                </label>
                <div className="input-group mb-3">
                  <textarea
                    id="placementCoordinatorNotificationMessage"
                    className="form-control"
                    type="text"
                    placeholder="Notification Message"
                    name="message"
                    value={data.message}
                    onChange={handleInputsChange}
                    rows="4"
                  />
                </div>
              </div>
              <div className="modal-footer">
                <button className="btn btn-secondary" data-bs-dismiss="modal">
                  Close
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={sendNotification}
                >
                  Push Notification
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="text-center">
          <h2 id="webpageTitle">Notifications</h2>
          <hr />
          <Link>
            <button
              className="btn btn-primary rounded-pill"
              data-bs-toggle="modal"
              data-bs-target="#placementCoordinatorAddNotification"
            >
              Add Notification
            </button>
          </Link>
        </div>
        <AllNotifications />
      </main>
    </>
  );
}

export default Notifications;
