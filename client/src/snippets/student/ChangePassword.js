import React, { useEffect,useState } from "react";
import { Link, NavLink ,useHistory} from "react-router-dom";
import Header from "./Header";

function ChangePassword() {

  //backend

  const [userData,setUserData] = useState({
    cpassword:"",
    npassword:"",
    rpassword:"",
  });
  const history = useHistory();

  let name,value;
  const handleInputs = (e) =>{
      //console.log(e.target.value);
      name = e.target.name;
      value=e.target.value;

      setUserData({...userData,[name]:value});
  }

  const updatePassword = async (e) =>{

    e.preventDefault();

    console.log(userData);
    const {cpassword,npassword,rpassword} = userData;

    try{

      const res = await fetch("/updatePassword",{
        method:"POST",
        headers:{
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          cpassword,npassword,rpassword
        })
      });

      const data = await res.json();

      if (res.status ===202){
        console.log(data.message);
        window.alert(data.message);
        window.location.reload(true);
        setUserData({ cpassword: "", npassword: "", rpassword: "" });
      }else{
        console.log(data.message);
        window.alert(data.message);
      }
    }catch(e){
      console.log(e);
    }

  }

  return (
    <>
      <Header />
      <main id="main">
        <h2 id="webpageTitle" className="text-center">
          Change Password
        </h2>
        <hr />
        <form action="" method="POST">
          <div className="container-fluid">
            <div className="row mb-3">
              <label className=" col-sm-3 col-form-label">
                Current Password
              </label>
              <div className="col-sm-9">
                <input
                  className="form-control"
                  type="password"
                  placeholder="Current Password"
                  name="cpassword"
                  value={userData.cpassword}
                  onChange={handleInputs}
                />
              </div>
            </div>
            <div className="row mb-3">
              <label className=" col-sm-3 col-form-label">New Password</label>
              <div className="col-sm-9">
                <input
                  className="form-control"
                  type="password"
                  placeholder="New Password"
                  name="npassword"
                  value={userData.npassword}
                  onChange={handleInputs}
                />
              </div>
            </div>
            <div className="row mb-3">
              <label className=" col-sm-3 col-form-label">
                Re-enter New Password
              </label>
              <div className="col-sm-9">
                <input
                  className="form-control"
                  type="password"
                  placeholder="Re-enter New Password"
                  name="rpassword"
                  value={userData.rpassword}
                  onChange={handleInputs}
                />
              </div>
            </div>
          </div>
          <button className="btn btn-primary float-end" type="submit" onClick={updatePassword}>
            Save Changes
          </button>
          <button className="btn btn-danger float-end me-3" type="button">
            Cancel
          </button>
        </form>
      </main>
    </>
  );
}

export default ChangePassword;
