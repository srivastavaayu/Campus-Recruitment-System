import React from "react";
import Header from "./Header";

function Profile() {
  return (
    <>
      <Header />
      <main id="main">
        <h2 id="webpageTitle" className="text-center">
          Profile
        </h2>
        <hr />
        <form id="profileForm" action="" method="POST">
          <div className="container-fluid">
            <div className="row mb-3">
              <label className="col-sm-2 col-form-label">Name</label>
              <div className="col-sm-10 input-group">
                <input
                  className="form-control"
                  type="text"
                  placeholder="Company Name"
                  name="companyProfileName"
                  required
                />
              </div>
            </div>
            <div className="row mb-3">
              <div className="col-sm-8">
                <label className="col-form-label">Company Address</label>
                <input
                  className="form-control"
                  type="email"
                  placeholder="Company Address"
                  name="companyProfileAddress"
                  required
                />
              </div>
              <div className="col-sm-4">
                <label className="col-form-label">Company Website</label>
                <input
                  className="form-control"
                  type=""
                  placeholder="Company Website"
                  name="companyProfileWebsite"
                  required
                />
              </div>
            </div>
            <div className="row mb-3">
              <div className="col-sm-6">
                <label className="col-form-label">Company E-mail Address</label>
                <input
                  className="form-control"
                  type="email"
                  placeholder="E-mail Address"
                  name="companyProfileEmailAddress"
                  required
                />
              </div>
              <div className="col-sm-6">
                <label className="col-form-label">Company Phone Number</label>
                <input
                  className="form-control"
                  type="tel"
                  placeholder="Phone Number"
                  name="companyProfilePhoneNumber"
                  required
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

export default Profile;
