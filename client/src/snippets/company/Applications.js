import React,{ useEffect, useState } from "react";
import Header from "./Header";

function CurrentApplications() {

  //backend for current applications
  const [applicants,setApplicants] = useState([]);

  const callAboutPage = async () => {

    const res = await fetch("/companyJob",{
      method: "GET",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
      },
      credentials: "include"
    });

    const data = await res.json();
    console.log(data);
    setApplicants(data);
    console.log(applicants);
  }

  useEffect(() => {
    callAboutPage();
  }, []);


  return (
    <>
      <table className="table align-middle">
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Job ID</th>
            <th>Application Date</th>
            <th>Application Status</th>
            <th>View Application</th>
            <th>Change Application Status</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>Aayush Srivastava</td>
            <td>101</td>
            <td>23/12/2000</td>
            <td>
              <span className="badge bg-danger rounded-pill">Rejected</span>
            </td>
            <td>
              <button
                className="btn btn-outline-primary"
                data-bs-toggle="modal"
                data-bs-target="#companyViewApplication"
              >
                View Application
              </button>
            </td>
            <td>
              <button
                className="btn btn-outline-primary"
                data-bs-toggle="modal"
                data-bs-target="#companyChangeApplicationStatus"
              >
                Change Application Status
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </>
  );
}

function Applications() {
  return (
    <>
      <Header />
      <main>
        <div
          className="modal fade"
          data-bs-backdrop="static"
          data-bs-keyboard="false"
          id="companyViewApplication"
          tabIndex="-1"
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">View Application</h5>
                <button className="btn-close" data-bs-dismiss="modal"></button>
              </div>
              <div className="modal-body">
                <label className="form-label">Job ID</label>
                <input className="form-control" type="text" value="" disabled />
                <label className="form-label">Job Title</label>
                <input className="form-control" type="text" value="" disabled />
                <label className="form-label">Name</label>
                <input className="form-control" type="text" value="" disabled />
              </div>
              <div className="modal-footer">
                <button className="btn btn-secondary" data-bs-dismiss="modal">
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
        <div
          className="modal fade"
          data-bs-backdrop="static"
          data-bs-keyboard="false"
          id="companyChangeApplicationStatus"
          tabIndex="-1"
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">View Application</h5>
                <button className="btn-close" data-bs-dismiss="modal"></button>
              </div>
              <div className="modal-body">
                <div class="form-check">
                  <input
                    class="form-check-input"
                    type="radio"
                    name="companyApplicationsApplicationStatus"
                    id="companyApplicationsApplicationStatus1"
                  />
                  <label
                    class="form-check-label"
                    for="companyApplicationsApplicationStatus1"
                  >
                    <span className="badge bg-danger rounded-pill">
                      Rejected
                    </span>
                  </label>
                </div>
                <div class="form-check">
                  <input
                    class="form-check-input"
                    type="radio"
                    name="companyApplicationsApplicationStatus"
                    id="companyApplicationsApplicationStatus2"
                  />
                  <label
                    class="form-check-label"
                    for="companyApplicationsApplicationStatus2"
                  >
                    <span className="badge bg-warning rounded-pill">
                      Being Processed
                    </span>
                  </label>
                </div>
                <div class="form-check">
                  <input
                    class="form-check-input"
                    type="radio"
                    name="companyApplicationsApplicationStatus"
                    id="companyApplicationsApplicationStatus3"
                  />
                  <label
                    class="form-check-label"
                    for="companyApplicationsApplicationStatus3"
                  >
                    <span className="badge bg-success rounded-pill">
                      Selected
                    </span>
                  </label>
                </div>
              </div>
              <div className="modal-footer">
                <button className="btn btn-secondary" data-bs-dismiss="modal">
                  Close
                </button>
                <button type="Submit" className="btn btn-primary">
                  Save Status
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="text-center">
          <h2 id="webpageTitle">Applications</h2>
          <hr />
          <CurrentApplications />
        </div>
      </main>
    </>
  );
}

export default Applications;
