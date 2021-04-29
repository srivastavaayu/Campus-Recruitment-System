import React from "react";
import Header from "./Header";

function CurrentApplications() {
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
              <button className="btn btn-outline-primary">
                View Application
              </button>
            </td>
            <td>
              <button className="btn btn-outline-primary">
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
