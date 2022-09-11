module.exports = app => {
    const paylists = require("../controllers/playlist");
    var router = require("express").Router();
    // Create a new playlist
    router.post("/", paylists.create);
    // Retrieve all paylists
    router.get("/", paylists.findAll);
  
    // Retrieve a single playlist with id
    router.get("/:id", paylists.findOne);
    
    // Delete a playlist with id
    router.delete("/:id", paylists.delete);
  
    app.use('/api/paylists', router);
  };