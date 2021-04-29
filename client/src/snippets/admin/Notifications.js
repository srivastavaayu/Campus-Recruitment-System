import React from "react";
import { Link } from "react-router-dom";
import Header from "./Header";

function AllNotifications() {
  return (
    <>
      <table className="table">
        <thead>
          <tr>
            <th>#</th>
            <th>Timestamp</th>
            <th>Target</th>
            <th>Title</th>
            <th>Message</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>{new Date().toString()}</td>
            <td>Placement Coordinators</td>
            <td>Title</td>
            <td>Message</td>
          </tr>
        </tbody>
      </table>
    </>
  );
}

function Notifications() {
  return (
    <>
      <Header />
      <main>
        <div
          className="modal fade"
          data-bs-backdrop="static"
          data-bs-keyboard="false"
          id="adminAddNotification"
          tabIndex="-1"
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Add Notification</h5>
                <button className="btn-close" data-bs-dismiss="modal"></button>
              </div>
              <div className="modal-body">
                <label className="form-label" htmlFor="adminNotificationType">
                  Notification Target
                </label>
                <div id="adminNotificationType" className="mb-3">
                  <div className="form-check">
                    <input
                      id="adminTargetCheckbox1"
                      className="form-check-input"
                      type="checkbox"
                      value="Placement Coordinators"
                      name="notification-target"
                    />
                    <label
                      className="form-check-label"
                      htmlFor="adminTargetCheckbox1"
                    >
                      Placement Coordinators
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                      id="adminTargetCheckbox2"
                      className="form-check-input"
                      type="checkbox"
                      value="Companies"
                      name="notification-target"
                    />
                    <label
                      className="form-check-label"
                      htmlFor="adminTargetCheckbox2"
                    >
                      Companies
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                      id="adminTargetCheckbox3"
                      className="form-check-input"
                      type="checkbox"
                      value="Students"
                      name="notification-target"
                    />
                    <label
                      className="form-check-label"
                      htmlFor="adminTargetCheckbox3"
                    >
                      Students
                    </label>
                  </div>
                </div>
                <label className="form-label" htmlFor="adminNotificationTitle">
                  Notification Title
                </label>
                <div className="input-group mb-3">
                  <input
                    id="adminNotificationTitle"
                    className="form-control"
                    type="text"
                    placeholder="Notification Title"
                    name="notification-title"
                  />
                </div>
                <label
                  className="form-label"
                  htmlFor="adminNotificationMessage"
                >
                  Notification Message
                </label>
                <div className="input-group mb-3">
                  <textarea
                    id="adminNotificationMessage"
                    className="form-control"
                    type="text"
                    placeholder="Notification Message"
                    name="notification-message"
                    rows="4"
                  />
                </div>
              </div>
              <div className="modal-footer">
                <button className="btn btn-secondary" data-bs-dismiss="modal">
                  Close
                </button>
                <button type="button" className="btn btn-primary">
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
              data-bs-target="#adminAddNotification"
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
