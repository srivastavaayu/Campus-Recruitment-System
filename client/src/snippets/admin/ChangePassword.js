import React from "react";
import Header from "./Header";

function ChangePassword() {
  return (
    <>
      <Header />
      <main id="main">
        <h2 id="webpageTitle" className="text-center">
          Change Password
        </h2>
        <hr />
        <form action="" method="POST">
          <div className="container-fluid">
            <div className="row mb-3">
              <label className=" col-sm-3 col-form-label">
                Current Password
              </label>
              <div className="col-sm-9">
                <input
                  className="form-control"
                  type="text"
                  placeholder="Current Password"
                  name="adminCurrentPassword"
                />
              </div>
            </div>
            <div className="row mb-3">
              <label className=" col-sm-3 col-form-label">New Password</label>
              <div className="col-sm-9">
                <input
                  className="form-control"
                  type="text"
                  placeholder="New Password"
                  name="adminNewPassword"
                />
              </div>
            </div>
            <div className="row mb-3">
              <label className=" col-sm-3 col-form-label">
                Re-enter New Password
              </label>
              <div className="col-sm-9">
                <input
                  className="form-control"
                  type="text"
                  placeholder="Re-enter New Password"
                  name="adminReenterNewPassword"
                />
              </div>
            </div>
          </div>
          <button className="btn btn-primary float-end" type="submit">
            Save Changes
          </button>
          <button className="btn btn-danger float-end me-3" type="button">
            Cancel
          </button>
        </form>
      </main>
    </>
  );
}

export default ChangePassword;
