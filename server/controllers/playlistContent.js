const db = require("../db/index");
const PlaylistContent = db.PlaylistContent;
const Op = db.Sequelize.Op;


// Retrieve all Tutorials from the database.
exports.findAll = async (req, res) => {
    try{
        const id = req.params.id;
        const data = await PlaylistContent.findAll({
            where: {
                playlistId: id
            }
        })
        return res.send(data);
      } catch(err) {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving playlists."
        });
      }
};
// Find a single Tutorial with an id
exports.findOne = (req, res) => {
  
};
// Update a Tutorial by the id in the request
exports.update = (req, res) => {
  
};
// Delete a Tutorial with the specified id in the request
exports.delete = (req, res) => {
  
};
// Delete all Tutorials from the database.
exports.deleteAll = (req, res) => {
  
};
// Find all published Tutorials
exports.findAllPublished = (req, res) => {
  
};