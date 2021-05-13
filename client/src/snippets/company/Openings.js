import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import Header from "./Header";

function CurrentOpenings() {
  //back end
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
  //job archive back-end code
  const archive = async (jobId, title) => {
    console.log("Inside Archive function");
    console.log(jobId);
    console.log(title);

    try {
      const res = await fetch("/jobArchive", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          jobId,
          title,
        }),
      });

      const data = await res.json();

      if (res.status === 202) {
        console.log(data.message);
        window.alert(data.message);
      } else {
        console.log(data.message);
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
      <table className="table">
        <thead>
          <tr>
            <th>#</th>
            <th>Job ID</th>
            <th>Job Title</th>
            <th>Archive Job</th>
          </tr>
        </thead>
        <tbody>
          {jobData.map(({ jobId, title }, id) => {
            return (
              <tr>
                <td>{id + 1}</td>
                <td>{jobId}</td>
                <td>{title}</td>
                <td>
                  <button
                    className="btn btn-outline-danger"
                    onClick={archive.bind(this, jobId, title)}
                  >
                    Archive Job
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

function AllOpenings() {
  //back end for all Openings

  const [jobData, setJobData] = useState([]);
  const history = useHistory();

  const callAboutPage = async () => {
    try {
      const res = await fetch("/alljobopenings", {
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
            <th>Job ID</th>
            <th>Job Title</th>
          </tr>
        </thead>
        <tbody>
          {jobData.map(({ jobId, title }, id) => {
            return (
              <tr>
                <td>{id + 1}</td>
                <td>{jobId}</td>
                <td>{title}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
}

function Openings() {
  //back end

  const history = useHistory();
  const [job, setJob] = useState({
    jobId: "",
    title: "",
    ctc: "",
    description: "",
  });

  let name, value;
  const handleInputs = (e) => {
    console.log(e.target.value);
    name = e.target.name;
    value = e.target.value;

    setJob({ ...job, [name]: value });
  };

  const addJob = async (e) => {
    e.preventDefault();

    const { jobId, title, ctc, description } = job;

    try {
      const res = await fetch("/job", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          jobId,
          title,
          ctc,
          description,
        }),
      });

      const data = await res.json();

      if (res.status === 201) {
        console.log("Job created successfully");
        window.alert("Job created successfully");
        window.location.reload(true);
      } else {
        console.log("Job Id already exists");
        window.alert("Job Id already exists");
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
          id="companyCreateOpening"
          tabIndex="-1"
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Create Opening</h5>
                <button className="btn-close" data-bs-dismiss="modal"></button>
              </div>
              <form method="POST">
                <div className="modal-body">
                  <label className="form-label" htmlFor="companyJobId">
                    Job Id
                  </label>
                  <div className="input-group mb-3">
                    <input
                      id="companyJobId"
                      className="form-control"
                      type="text"
                      placeholder="Job ID"
                      name="jobId"
                      value={job.jobId}
                      onChange={handleInputs}
                      required
                    />
                  </div>
                  <label className="form-label" htmlFor="companyJobTitle">
                    Job Title
                  </label>
                  <div className="input-group mb-3">
                    <input
                      id="companyJobTitle"
                      className="form-control"
                      type="text"
                      placeholder="Job Title"
                      name="title"
                      value={job.title}
                      onChange={handleInputs}
                      required
                    />
                  </div>
                  <label className="form-label" htmlFor="companyJobDescription">
                    Job Description
                  </label>
                  <div className="input-group mb-3">
                    <textarea
                      id="companyJobDescription"
                      className="form-control"
                      type="text"
                      placeholder="Job Description"
                      name="description"
                      value={job.description}
                      onChange={handleInputs}
                      rows="4"
                      required
                    />
                  </div>
                  <label className="form-label" htmlFor="companyCTCOffered">
                    CTC Offered
                  </label>
                  <input
                    id="companyCTCOffered"
                    className="form-control"
                    type="text"
                    placeholder="CTC Offered"
                    name="ctc"
                    value={job.ctc}
                    onChange={handleInputs}
                    required
                  />
                </div>
                <div className="modal-footer">
                  <button className="btn btn-secondary" data-bs-dismiss="modal">
                    Close
                  </button>
                  <button
                    type="Submit"
                    className="btn btn-primary"
                    onClick={addJob}
                  >
                    Add Job
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
        <div className="text-center">
          <h2 id="webpageTitle">Openings</h2>
          <hr />
          <Link>
            <button
              className="btn btn-primary rounded-pill"
              data-bs-toggle="modal"
              data-bs-target="#companyCreateOpening"
            >
              Create Opening
            </button>
          </Link>
          <h3 className="text-center">Current Openings</h3>
          <CurrentOpenings />
          <h3 className="text-center">All Openings</h3>
          <AllOpenings />
        </div>
      </main>
    </>
  );
}

export default Openings;
