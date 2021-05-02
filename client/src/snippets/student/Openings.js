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
                  <button className="btn btn-outline-primary">View Job</button>
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
