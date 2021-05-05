import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import Header from "./Header";

function CurrentOpenings() {
  //Back end
  const [jobData, setJobData] = useState([]);
  const history = useHistory();

  const callAboutPage = async () => {
    try {
      const res = await fetch("/jobopenings", {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      const data = await res.json();
      console.log(data);
      setJobData(data);

      if (!res.status === 200) {
        const error = new Error(res.error);
        throw error;
      }
    } catch (err) {
      console.log(err);
      history.push("");
    }
  };

  useEffect(() => {
    callAboutPage();
  }, []);

  return (
    <>
      <table className="table align-middle">
        <thead>
          <tr>
            <th>#</th>
            <th>Company Name</th>
            <th>Job Title</th>
            <th>View Job</th>
          </tr>
        </thead>
        <tbody>
          {jobData.map(({ creatorName, title }, id) => {
            return (
              <tr>
                <td>{id + 1}</td>
                <td>{creatorName}</td>
                <td>{title}</td>
                <td>
                  <button
                    className="btn btn-outline-primary"
                    data-bs-toggle="modal"
                    data-bs-target="#studentViewJob"
                  >
                    View Job
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

function Openings() {
  return (
    <>
      <Header />
      <main>
        <div
          className="modal fade"
          data-bs-backdrop="static"
          data-bs-keyboard="false"
          id="studentViewJob"
          tabIndex="-1"
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">View Job</h5>
                <button className="btn-close" data-bs-dismiss="modal"></button>
              </div>
              <div className="modal-body">
                <label
                  className="form-label"
                  htmlFor="studentViewJobCompanyName"
                >
                  Company Name
                </label>
                <div className="input-group mb-3">
                  <input
                    id="studentViewJobCompanyName"
                    className="form-control"
                    type="text"
                    placeholder="Company Name"
                    name="CompanyName"
                  />
                </div>
                <label
                  className="form-label"
                  htmlFor="studentViewJobCompanyDescription"
                >
                  Company Description
                </label>
                <div className="input-group mb-3">
                  <input
                    id="studentViewJobCompanyDescription"
                    className="form-control"
                    type="text"
                    placeholder="Company Description"
                    name="CompanyDescription"
                  />
                </div>
                <label className="form-label" htmlFor="studentViewJobJobID">
                  Job ID
                </label>
                <div className="input-group mb-3">
                  <input
                    id="studentViewJobJobID"
                    className="form-control"
                    type="text"
                    placeholder="Job ID"
                    name="JobID"
                  />
                </div>
                <label className="form-label" htmlFor="studentViewJobJobTitle">
                  Job Title
                </label>
                <div className="input-group mb-3">
                  <input
                    id="studentViewJobJobTitle"
                    className="form-control"
                    type="text"
                    placeholder="Job Title"
                    name="JobTitle"
                  />
                </div>
                <label
                  className="form-label"
                  htmlFor="studentViewJobJobDescription"
                >
                  Job Description
                </label>
                <div className="input-group mb-3">
                  <textarea
                    id="studentViewJobJobDescription"
                    className="form-control"
                    type="text"
                    placeholder="Job Description"
                    name="message"
                    rows="4"
                  />
                </div>
              </div>
              <div className="modal-footer">
                <button className="btn btn-secondary" data-bs-dismiss="modal">
                  Close
                </button>
                <button type="button" className="btn btn-primary">
                  Apply to this job
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="text-center">
          <h2 id="webpageTitle">Openings</h2>
          <hr />
          <h3 className="text-center">Current Openings</h3>
          <CurrentOpenings />
        </div>
      </main>
    </>
  );
}

export default Openings;
