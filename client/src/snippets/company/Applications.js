import React, { useEffect, useState } from "react";
import Header from "./Header";

function ApplicationStatus(props) {
  if (props.status == "BeingProcessed") {
    return (
      <span className="badge bg-warning rounded-pill">Being Processed</span>
    );
  } else if (props.status == "Rejected") {
    return <span className="badge bg-danger rounded-pill">Rejected</span>;
  } else if (props.status == "Selected") {
    return <span className="badge bg-success rounded-pill">Selected</span>;
  } else {
    return <span className="badge bg-secondary rounded-pill">Applied</span>;
  }
}

const sendStatusToBackend = async (userName, jobId, status) => {
  try {
    const res = await fetch("/updateJobStatus", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userName,
        jobId,
        status,
      }),
    });
    const data = await res.json();
    if (res.status === 202) {
      window.alert(data.message);
      window.location.reload(true);
    } else {
      window.alert(data.message);
    }
  } catch (err) {
    console.log(err);
  }
};

const sendStatus = (userName, jobId) => {
  if (
    document.getElementById("companyApplicationsApplicationStatus1").checked
  ) {
    sendStatusToBackend(
      userName,
      jobId,
      document.getElementById("companyApplicationsApplicationStatus1").value
    );
  } else if (
    document.getElementById("companyApplicationsApplicationStatus2").checked
  ) {
    sendStatusToBackend(
      userName,
      jobId,
      document.getElementById("companyApplicationsApplicationStatus2").value
    );
  } else if (
    document.getElementById("companyApplicationsApplicationStatus3").checked
  ) {
    sendStatusToBackend(
      userName,
      jobId,
      document.getElementById("companyApplicationsApplicationStatus3").value
    );
  }
};

function CurrentApplications() {
  //backend for current applications
  const [applicants, setApplicants] = useState([]);

  const callAboutPage = async () => {
    const res = await fetch("/companyJob", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    const data = await res.json();
    setApplicants(data);
  };

  const [applicant, setApplicant] = useState({
    creatorName: "",
    jobId: "",
    title: "",
    jobDescription: "",
    name: "",
    appliedDate: "",
    applicationStatus: "",
    userName: "",
  });

  //backend for getting student data
  const [student, setstudent] = useState({});
  const studentData = async (userName) => {
    try {
      const res = await fetch("/gettingStudentData", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userName,
        }),
      });

      const data = await res.json();
      setstudent(data);
    } catch (err) {
      console.log(err);
    }
  };

  const archive = async (
    creatorName,
    jobId,
    title,
    jobDescription,
    name,
    appliedDate,
    applicationStatus,
    userName
  ) => {
    studentData(userName);
    setApplicant({
      creatorName,
      jobId,
      title,
      jobDescription,
      name,
      appliedDate,
      applicationStatus,
      userName,
    });
  };

  useEffect(() => {
    callAboutPage();
  }, []);

  return (
    <>
      <div
        className="modal fade"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        id="companyViewApplication"
        tabIndex="-1"
      >
        <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">View Application</h5>
              <button className="btn-close" data-bs-dismiss="modal"></button>
            </div>
            <div className="modal-body ">
              <form action="" className="row g-3 text-start">
                <div className="col-md-7">
                  <label className="form-label">Application Date</label>
                  <input
                    className="form-control mb-3"
                    type="text"
                    value={applicant.appliedDate}
                    disabled
                  />
                </div>
                <div className="col-md-5">
                  <label className="form-label">Application Status</label>
                  <div className="mb-3">
                    <ApplicationStatus status={applicant.applicationStatus} />
                  </div>
                </div>
                <div className="col-md-12">
                  <label className="form-label">Company Name</label>
                  <input
                    className="form-control mb-3"
                    type="text"
                    value={applicant.creatorName}
                    disabled
                  />
                </div>
                <div className="col-md-5">
                  <label className="form-label">Job ID</label>
                  <input
                    className="form-control mb-3"
                    type="text"
                    value={applicant.jobId}
                    disabled
                  />
                </div>
                <div className="col-md-7">
                  <label className="form-label">Job Title</label>
                  <input
                    className="form-control mb-3"
                    type="text"
                    value={applicant.title}
                    disabled
                  />
                </div>
                <div className="col-md-12">
                  <label className="form-label">Job Description</label>
                  <textarea
                    className="form-control mb-3"
                    value={applicant.jobDescription}
                    rows="4"
                    disabled
                  />
                </div>
                <div className="col-md-4">
                  <label className="form-label">Student Username</label>
                  <input
                    className="form-control mb-3"
                    type="text"
                    value={student.userName}
                    disabled
                  />
                </div>
                <div className="col-md-8">
                  <label className="form-label">Student Name</label>
                  <input
                    className="form-control mb-3"
                    type="text"
                    value={student.name}
                    disabled
                  />
                </div>
                <div className="col-md-5">
                  <label className="form-label">Student Phone Number</label>
                  <input
                    className="form-control mb-3"
                    type="tel"
                    value={student.phone}
                    disabled
                  />
                </div>
                <div className="col-md-7">
                  <label className="form-label">Student E-mail Address</label>
                  <input
                    className="form-control mb-3"
                    type="email"
                    value={student.email}
                    disabled
                  />
                </div>
                <div className="col-md-4">
                  <label className="form-label">Student Department</label>
                  <input
                    className="form-control mb-3"
                    type="text"
                    value={student.department}
                    disabled
                  />
                </div>
              </form>
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
                  value="Rejected"
                  id="companyApplicationsApplicationStatus1"
                />
                <label
                  class="form-check-label"
                  for="companyApplicationsApplicationStatus1"
                >
                  <span className="badge bg-danger rounded-pill">Rejected</span>
                </label>
              </div>
              <div class="form-check">
                <input
                  class="form-check-input"
                  type="radio"
                  name="companyApplicationsApplicationStatus"
                  value="BeingProcessed"
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
                  value="Selected"
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
              <button
                type="Submit"
                className="btn btn-primary"
                onClick={() => sendStatus(applicant.userName, applicant.jobId)}
              >
                Save Status
              </button>
            </div>
          </div>
        </div>
      </div>
      <table className="table align-middle">
        <thead>
          <tr>
            <th>#</th>
            <th>Job ID</th>
            <th>Name</th>
            <th>Application Date</th>
            <th>Application Status</th>
            <th>View Application</th>
            <th>Change Application Status</th>
          </tr>
        </thead>
        <tbody>
          {applicants.map(
            (
              {
                name,
                creatorName,
                jobId,
                title,
                appliedDate,
                applicationStatus,
                jobDescription,
                userName,
              },
              id
            ) => {
              return (
                <tr>
                  <td>{id + 1}</td>
                  <td>{jobId}</td>
                  <td>{name}</td>
                  <td>{appliedDate}</td>
                  <td>
                    <ApplicationStatus status={applicationStatus} />
                  </td>
                  <td>
                    <button
                      className="btn btn-outline-primary"
                      data-bs-toggle="modal"
                      data-bs-target="#companyViewApplication"
                      onClick={archive.bind(
                        this,
                        creatorName,
                        jobId,
                        title,
                        jobDescription,
                        name,
                        appliedDate,
                        applicationStatus,
                        userName
                      )}
                    >
                      View Application
                    </button>
                  </td>
                  <td>
                    <button
                      className="btn btn-outline-primary"
                      data-bs-toggle="modal"
                      data-bs-target="#companyChangeApplicationStatus"
                      onClick={archive.bind(
                        this,
                        creatorName,
                        jobId,
                        title,
                        jobDescription,
                        name,
                        appliedDate,
                        applicationStatus,
                        userName
                      )}
                    >
                      Change Application Status
                    </button>
                  </td>
                </tr>
              );
            }
          )}
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
