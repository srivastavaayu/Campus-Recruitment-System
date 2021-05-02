const express = require("express");
const router = express.Router();

require("../db/conn");

const authentication = require("../middleware/authentication");
const Notification = require("../model/notificationSchema");

/*router.post("/notifyData",authentication,async (req, res) => {
    console.log("In notification");
    console.log(req.rootUser.role);
    console.log(req.body);
})
*/
router.post("/notifyData", authentication, async (req, res) => {
  //console.log("inside Notification function");
  const creatorRole = req.rootUser.role;
  const creatorUserName = req.rootUser.userName;
  //console.log(creatorRole);
  console.log(req.body);
  if (creatorRole == "admin") {
    const {
      students,
      placementCoordinators,
      companies,
      title,
      message,
    } = req.body;
    if (!title || !message) {
      return res.status(422).json({ error: "Plz filled the fields properly" });
    }
    try {
      const notify = new Notification({
        students,
        placementCoordinators,
        companies,
        title,
        message,
        creatorUserName,
        creatorRole,
      });

      await notify.save();

      res.status(201).json({ message: "Notification registered successfully" });
    } catch (e) {
      console.log("Inside Catch block");
      console.log(e);
    }
  } else if (creatorRole == "placement") {
    const { students, companies, title, message } = req.body;
    if (!title || !message) {
      return res.status(422).json({ error: "Plz filled the fields properly" });
    }
    try {
      const notify = new Notification({
        students,
        companies,
        title,
        message,
        creatorUserName,
        creatorRole,
      });

      await notify.save();

      res.status(201).json({ message: "Notification registered successfully" });
    } catch (e) {
      console.log("Inside Catch block");
      console.log(e);
    }
  }
});

router.get("/getNotification", authentication, async (req, res) => {
  console.log("getting Notification");

  const role = req.rootUser.role;
  let notification;
  if (role == "student") {
    notification = await Notification.find({ students: true });
  } else if (role == "placement") {
    notification = await Notification.find({
      $or: [{ placementCoordinators: true }, { creatorRole: "placement" }],
    });
  } else if (role == "company") {
    notification = await Notification.find({ companies: true });
  } else if (role == "admin") {
    notification = await Notification.find({ creatorRole: "admin" });
  }

  res.send(notification);
});

module.exports = router;
