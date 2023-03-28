const router = require("express").Router();
const admin = require("../config/firebase.config");
const user = require("../models/users");

router.get("/login", async (req, res) => {
  // checks for bearer token in headers and validates it
  if (!req.headers.authorization) {
    return res.status(500).json({ message: "Invalid Token" });
  }

  //else
  const token = req.headers.authorization.split(" ")[1];
  try {
    const decodedValue = await admin.auth().verifyIdToken(token);
    if (!decodedValue) {
      return res.status(505).json({ message: "Unauthorized" });
    } else {
      // checks whether user exists in database or not
      const userExists = await user.findOne({ user_id: decodedValue.user_id });
      if (!userExists) {
        if (!decodedValue.name) {
          const detailUser = await admin.auth().getUserByEmail(decodedValue.email);
          decodedValue.name = detailUser.displayName;
        }
        newUserData(decodedValue, req, res);
      } else {
        updateNewUserData(decodedValue, req, res);
      }
    }
  } catch (error) {
    return res.status(505).json({ message: error });
  }
});

const newUserData = async (decodedValue, req, res) => {
  const newUser = new user({
    name: decodedValue.name,
    email: decodedValue.email,
    imageURL: decodedValue.picture,
    user_id: decodedValue.user_id,
    email_verified: decodedValue.email_verified,
    role: "member",
    auth_time: decodedValue.auth_time,
  });

  try {
    const savedUser = await newUser.save();
    res.status(200).json({ message: "User added successfully", user: savedUser });
  } catch (error) {
    res.status(400).json({ success: false, message: error });
  }
};

const updateNewUserData = async (decodedValue, req, res) => {
  const filter = { user_id: decodedValue.user_id };
  const options = { upsert: true, new: true };
  // upsert creates new document if no match is found

  try {
    const result = await user.findOneAndUpdate(
      filter,
      { auth_time: decodedValue.auth_time }, // updates the current auth time of the user inside db
      options
    );
    res.status(200).json({ user: result });
  } catch (error) {
    return res.status(505).json({ success: false, message: error });
  }
};

router.get("/getUsers", async (req, res) => {
  try {
    const options = {
      sort: {
        createdAt: 1,
      },
    };
    const cursor = await user.find({}, null, options);
    if (cursor) {
      res.status(200).json({ success: true, data: cursor });
    } else {
      res.status(404).json({ success: false, message: "No user found" });
    }
  } catch (err) {
    console.log(err);
    return res.sendStatus(500);
  }
});

router.put("/favourites/:userId", async (req, res) => {
  const filter = { _id: req.params.userId };
  const songId = req.query;

  try {
    console.log(filter, songId);
    const result = await user.updateOne(filter, {
      $push: { favourites: songId },
    });
    res.status(200).send({ success: true, msg: "Song added to favourites" });
  } catch (error) {
    res.status(400).send({ success: false, msg: error });
  }
});

router.get("/getUser/:userId", async (req, res) => {
  const filter = { _id: req.params.userId };

  const userExists = await user.findOne({ _id: filter });
  if (!userExists) return res.status(400).send({ success: false, msg: "Invalid User ID" });
  if (userExists.favourites) {
    res.status(200).send({ success: true, data: userExists });
  } else {
    res.status(200).send({ success: false, data: null });
  }
});

router.put("/updateRole/:userId", async (req, res) => {
  console.log(req.body.data.role, req.params.userId);
  const filter = { _id: req.params.userId };
  const role = req.body.data.role;

  const options = {
    upsert: true,
    new: true,
  };

  try {
    const result = await user.findOneAndUpdate(filter, { role: role }, options);
    res.status(200).send({ user: result });
  } catch (err) {
    res.status(400).send({ success: false, msg: err });
  }
});

router.delete("/delete/:userId", async (req, res) => {
  const filter = { _id: req.params.userId };

  const result = await user.deleteOne(filter);
  if (result.deletedCount === 1) {
    res.status(200).send({ success: true, msg: "Data Deleted" });
  } else {
    res.status(200).send({ success: false, msg: "Data Not Found" });
  }
});
router.put("/removeFavourites/:userId", async (req, res) => {
  const filter = { _id: req.params.userId };
  const songId = req.query;

  try {
    console.log(filter, songId);
    const result = await user.updateOne(filter, {
      $pull: { favourites: songId },
    });
    res.status(200).send({ success: true, msg: "Song removed from favourites" });
  } catch (error) {
    res.status(400).send({ success: false, msg: error });
  }
});

module.exports = router;
