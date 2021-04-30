import React ,{useEffect,useState} from "react";
import { Link,useHistory } from "react-router-dom";
import Header from "./Header";

function AllNotifications() {
  //backend for all notifications

  const [notifyData,setNotifyData] = useState({});
  const history = useHistory();

  const callAboutPage = async ()=>{
    try{
      const res = await fetch('/getNotification',{
        method:"GET",
        headers:{
          Accept: "application/json",
          "Content-Type": "application/json"
          },
          credentials:"include"
      });

      const data = await res.json();
      console.log(data);
      setNotifyData(data);
            


      if(!res.status ===200){
        const error = new Error(res.error);
          throw error;
        }

        }catch(err){
            console.log(err);
            history.push('');

        }
  }

  useEffect(()=>{
    callAboutPage();
  },[]);

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
            <td>{notifyData.date}</td>
            <td>{notifyData.title}</td>
            <td>{notifyData.message}</td>
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
