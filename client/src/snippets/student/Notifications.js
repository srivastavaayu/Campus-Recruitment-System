import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import Header from "./Header";

function AllNotifications() {
  //backend for all notifications

  const [notifyData, setNotifyData] = useState([]);
  const history = useHistory();

  const callAboutPage = async () => {
    try {
      const res = await fetch("/getNotification", {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      const data = await res.json();
      console.log(data);
      setNotifyData(data);

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
            <th>Timestamp</th>
            <th>Title</th>
            <th>Message</th>
          </tr>
        </thead>
        <tbody>
          {notifyData.map(({ date, title, message }, id) => {
            return (
              <tr>
                <td>{id + 1}</td>
                <td>{date}</td>
                <td>{title}</td>
                <td>{message}</td>
              </tr>
            );
          })}
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
