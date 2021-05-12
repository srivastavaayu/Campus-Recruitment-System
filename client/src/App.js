import React from "react";
import { Switch, Route } from "react-router-dom";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js";
import "./css/index.css";
import Home from "./snippets/Home";
import Authenticator from "./snippets/Authenticator";
import AdminHome from "./snippets/admin/Home";
import PlacementCoordinatorHome from "./snippets/placement-coordinator/Home";
import CompanyHome from "./snippets/company/Home";
import StudentHome from "./snippets/student/Home";
import AdminManageUsers from "./snippets/admin/ManageUsers";
import PlacementCoordinatorManageUsers from "./snippets/placement-coordinator/ManageUsers";
import CompanyApplications from "./snippets/company/Applications";
import StudentApplications from "./snippets/student/Applications";
import CompanyOpenings from "./snippets/company/Openings";
import StudentOpenings from "./snippets/student/Openings";
import AdminNotifications from "./snippets/admin/Notifications";
import PlacementCoordinatorNotifications from "./snippets/placement-coordinator/Notifications";
import CompanyNotifications from "./snippets/company/Notifications";
import StudentNotifications from "./snippets/student/Notifications";
import AdminProfile from "./snippets/admin/Profile";
import PlacementCoordinatorProfile from "./snippets/placement-coordinator/Profile";
import CompanyProfile from "./snippets/company/Profile";
import StudentProfile from "./snippets/student/Profile";
import AdminChangePassword from "./snippets/admin/ChangePassword";
import PlacementCoordinatorChangePassword from "./snippets/placement-coordinator/ChangePassword";
import CompanyChangePassword from "./snippets/company/ChangePassword";
import StudentChangePassword from "./snippets/student/ChangePassword";

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={Home}></Route>
        <Route exact path="/Authenticator" component={Authenticator}></Route>
        <Route path="/Admin">
          <Route path="/Admin/Home" component={AdminHome} />
          <Route path="/Admin/ManageUsers" component={AdminManageUsers} />
          <Route path="/Admin/Notifications" component={AdminNotifications} />
          <Route path="/Admin/Profile" component={AdminProfile} />
          <Route path="/Admin/ChangePassword" component={AdminChangePassword} />
        </Route>
        <Route path="/PlacementCoordinator">
          <Route
            path="/PlacementCoordinator/Home"
            component={PlacementCoordinatorHome}
          />
          <Route
            path="/PlacementCoordinator/ManageUsers"
            component={PlacementCoordinatorManageUsers}
          />
          <Route
            path="/PlacementCoordinator/Notifications"
            component={PlacementCoordinatorNotifications}
          />
          <Route
            path="/PlacementCoordinator/Profile"
            component={PlacementCoordinatorProfile}
          />
          <Route
            path="/PlacementCoordinator/ChangePassword"
            component={PlacementCoordinatorChangePassword}
          />
        </Route>
        <Route path="/Company">
          <Route path="/Company/Home" component={CompanyHome} />
          <Route path="/Company/Applications" component={CompanyApplications} />
          <Route path="/Company/Openings" component={CompanyOpenings} />
          <Route
            path="/Company/Notifications"
            component={CompanyNotifications}
          />
          <Route path="/Company/Profile" component={CompanyProfile} />
          <Route
            path="/Company/ChangePassword"
            component={CompanyChangePassword}
          />
        </Route>
        <Route path="/Student">
          <Route path="/Student/Home" component={StudentHome} />
          <Route path="/Student/Applications" component={StudentApplications} />
          <Route path="/Student/Openings" component={StudentOpenings} />
          <Route
            path="/Student/Notifications"
            component={StudentNotifications}
          />
          <Route path="/Student/Profile" component={StudentProfile} />
          <Route
            path="/Student/ChangePassword"
            component={StudentChangePassword}
          />
        </Route>
      </Switch>
    </div>
  );
}
export default App;
