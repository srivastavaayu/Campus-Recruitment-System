import React,{ useEffect, useState } from "react";
import Header from "./Header";

function CurrentApplications() {

  //backend for current applications
  const [applicants,setApplicants] = useState([]);

  const callAboutPage = async () => {

    const res = await fetch("/studentJob",{
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
                data-bs-target="#studentViewApplication"
              >
                View Application
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
          id="studentViewApplication"
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
