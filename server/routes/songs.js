const router = require("express").Router();
const song = require("../models/songs");

router.post("/save", async ( req, res ) => {
   
  const newSong = new song({
      name : req.body.name,
      imageURL : req.body.imageURL,
      songURL : req.body.songURL,
      album : req.body.album,
      artist : req.body.artist,
      language: req.body.language,
      category : req.body.category,
  })

  try {
    const savedSong = await newSong.save();
    return res.status(200).send({ success : true, song : savedSong })
  }
  catch(error) {
    return res.status(400).send({success : false, message : error });
  }
})


router.get("/getSingleSong/:id", async ( req, res ) =>{
     const filters = { _id : req.params.id };
     
     const data = await song.findOne(filters);
     if(data) {
      return res.status(200).send({ success : true, song : data})
     }
     else {
      return res.status(400).send({success : false, message :  "No Song found" })
     }
})

router.get("/getAllSongs", async ( req, res )=> {
  const data = await song.find();
  if(data) {
    return res.status(200).send({ success : true, song : data });
  }
  else {
    return res.status(400).send({ success : false, message : "No Song found"})
  }
})

router.put("/update/:id", async ( req, res )=> {
  const filters = { _id : req.params.id };
  const options = {
    upsert : true,
    new : true
  }
  try{
    const updatedSong = await song.findOneAndUpdate(
      filters,
      {
        name : req.body.name,
        imageURL : req.body.imageURL,
        songURL : req.body.songURL,
        album : req.body.album,
        artist : req.body.artist,
        language: req.body.language,
        category : req.body.category,
      },
      options
    )

    return res.status(200).send({ success : true, song : updatedSong})
  }
  catch(error) {
    return res.status(400).send({success : false, message : error})
  }
})

router.delete("/delete/:id", async(req, res ) => {
  const filter = { _id : req.params.id};
  const result = await song.deleteOne(filter);
  if(result) {
    return res.status(200).send({success : true, message : "Song deleted"});
  }
  else{
    return res.status(400).send({success : false, message : "Failed to delete song"});
  }
})

module.exports = router;
