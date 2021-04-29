import React from "react";
import { Link } from "react-router-dom";
import Header from "./Header";

function AllNotifications() {
  return (
    <>
      <table className="table">
        <thead>
          <tr>
            <th>#</th>
            <th>Timestamp</th>
            <th>Title</th>
            <th>Message</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>{new Date().toString()}</td>
            <td>Title</td>
            <td>Message</td>
          </tr>
        </tbody>
      </table>
    </>
  );
}

function Notifications() {
  return (
    <>
      <Header />
      <main>
        <div className="text-center">
          <h2 id="webpageTitle">Notifications</h2>
          <hr />
        </div>
        <AllNotifications />
      </main>
    </>
  );
}

export default Notifications;
