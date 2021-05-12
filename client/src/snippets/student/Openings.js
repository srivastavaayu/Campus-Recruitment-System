import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";

import Header from "./Header";

function CurrentOpenings() {
  //Back end
  const [jobData, setJobData] = useState([]);
  const history = useHistory();

  const callAboutPage1 = async () => {
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

  //student Data
  const [userData, setUserData] = useState({});
  const callAboutPage = async () => {
    try {
      const res = await fetch("/userData", {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      const data = await res.json();
      console.log(data);
      setUserData(data);

      if (!res.status === 200) {
        const error = new Error(res.error);
        throw error;
      }
    } catch (err) {
      console.log(err);
      history.push("");
    }
  };

  const [jobInfo, setJobInfo] = useState({
    /*jobId: "",
    creator: "",
    title: "",
    description: "",
    companyDescription: "",*/
  });

  //companyDescription
  const comapny = async (value) => {
    const creator = value;
    try {
      const res = await fetch("/companyDescription", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          creator,
        }),
      });

      const data = await res.json();

      if (res.status === 202) {
        jobInfo.companyDescription = data.companyDescription;
        console.log(jobInfo);
      } else {
        console.log(data.message);
        window.alert(data.message);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const apply = async (e) => {
    console.log("in apply");
    const { jobId, creator, title, description, companyDescription } = jobInfo;
    const { userName, name, email, phone, department } = userData;

    try {
      const res = await fetch("/applyJob", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          jobId,
          creator,
          title,
          description,
          companyDescription,
          userName,
          name,
          email,
          phone,
          department,
        }),
      });

      const data = await res.json();
      console.log(data.message);
      window.alert(data.message);
    } catch (err) {
      console.log(err);
    }
  };

  let name, value;
  const archive = async (jobId, creatorName, title, description) => {
    value = creatorName;
    //console.log(value);
    /*jobInfo.creator = value;
    jobInfo.jobId = jobId;
    jobInfo.title = title;
    jobInfo.description = description;
    console.log(jobInfo);*/
    await comapny(value);
    setJobInfo({
      creator: value,
      jobId: jobId,
      title: title,
      description: description,
    });
  };

  useEffect(() => {
    callAboutPage1();
    callAboutPage();
  }, []);

  return (
    <>
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
            <div className="modal-body text-start">
              <form className="row g-3">
                <div className="col-md-12">
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
                      value={jobInfo.creator}
                      disabled
                    />
                  </div>
                </div>
                <div className="col-md-5">
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
                      value={jobInfo.jobId}
                      disabled
                    />
                  </div>
                </div>
                <div className="col-md-7">
                  <label
                    className="form-label"
                    htmlFor="studentViewJobJobTitle"
                  >
                    Job Title
                  </label>
                  <div className="input-group mb-3">
                    <input
                      id="studentViewJobJobTitle"
                      className="form-control"
                      type="text"
                      placeholder="Job Title"
                      name="JobTitle"
                      value={jobInfo.title}
                      disabled
                    />
                  </div>
                </div>
                <div className="col-md-12">
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
                      value={jobInfo.description}
                      disabled
                    />
                  </div>
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button className="btn btn-secondary" data-bs-dismiss="modal">
                Close
              </button>
              <button type="button" className="btn btn-primary" onClick={apply}>
                Apply to this job
              </button>
            </div>
          </div>
        </div>
      </div>
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
          {jobData.map(({ jobId, creatorName, title, description }, id) => {
            return (
              <tr>
                <td>{id + 1}</td>
                <td>{creatorName}</td>
                <td>{title}</td>
                <td>
                  <button
                    className="btn btn-outline-primary"
                    data-bs-target="#studentViewJob"
                    data-bs-toggle="modal"
                    onClick={archive.bind(
                      this,
                      jobId,
                      creatorName,
                      title,
                      description
                    )}
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
