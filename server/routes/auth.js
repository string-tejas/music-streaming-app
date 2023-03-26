const router = require("express").Router();
const admin = require("../config/firebase.config");
const user = require("../models/users");

router.get("/login",  async ( req, res ) => {

    // checks for bearer token in headers and validates it
    if(!req.headers.authorization) {
        return res.status(500).json({message : "Invalid Token"});
    }
    
    //else
    const token = req.headers.authorization.split(" ")[1];
    try {
        const decodedValue = await admin.auth().verifyIdToken(token);
        if(!decodedValue) {
            return res.status(505).json({ message : "Unauthorized"})
        }
        else {
            
            // checks whether user exists in database or not
            const userExists = await user.findOne({ "user_id" : decodedValue.user_id });
            if(!userExists) {
               newUserData(decodedValue, req, res );
            }
            else {
               updateNewUserData(decodedValue, req, res)
            }
        }
    }
    catch (error) {
        return res.status(505).json({ message : error})
    }
})

const newUserData =  async ( decodedValue, req, res ) => {
    const newUser = new user({
        name : decodedValue.name,
        email : decodedValue.email,
        imageURL : decodedValue.picture,
        user_id : decodedValue.user_id,
        email_verified : decodedValue.email_verified,
        role : "member",
        auth_time : decodedValue.auth_time
    })

     try {
        const savedUser =  await newUser.save();
        res.status(200).json({ message : "User added successfully "})
     }
     catch(error ) {
        res.status(400).json({ success :  false, message :  error});
     }
}

const updateNewUserData = async ( decodedValue, req, res ) => {
   const filter = { "user_id" : decodedValue.user_id };
   const options = { upsert :  true , new : true}
   // upsert creates new document if no match is found

   try {
    const result = await user.findOneAndUpdate(
        filter,
        { auth_time : decodedValue.auth_time} ,// updates the current auth time of the user inside db
        options
     )
     res.status(200).json({ user: result });
   }
   catch(error) {
     return res.status(505).json({  success : false, message : error})
   }
}

module.exports = router;