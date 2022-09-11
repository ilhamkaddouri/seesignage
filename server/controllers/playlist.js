const db = require("../db/index");
const Playlist = db.Playlists;
const PlaylistContent = db.PlaylistContent;
const Op = db.Sequelize.Op;

exports.create = async (req, res) => {
  try{
    if (!req.body.name) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
      return;
    }
    const playlist = {
      name: req.body.name,
    };
    // Save Playlist in the database
    const data = await Playlist.create(playlist);
    res.send(data);
  } catch(err) {
    res.status(500).send({
      message:
        err.message || "Some error occurred while creating the Playlist."
    });
  }
};

// Retrieve all Playlists from the database.
exports.findAll = async (req, res) => {
  try{
    const name = req.query.name;
    var condition = name ? { name: { [Op.like]: `%${name}%` } } : null;
    const data = await Playlist.findAll({
      where: condition
    })
    return res.send(data);
  } catch(err) {
    res.status(500).send({
      message:
        err.message || "Some error occurred while retrieving playlists."
    });
  }
};
// Find a single Playlist with an id
exports.findOne = async (req, res) => {
  try{
    const id = req.params.id;
    const data = await Playlist.findByPk(id);
    return res.send(data);
  } catch(err) {
    res.status(500).send({
      message: "Error retrieving Playlist with id=" + id
    });
  }
};

// Delete a Playlist with the specified id in the request
exports.delete = async (req, res) => {
  try{
    const id = req.params.id;
    await Playlist.destroy({
      where: { id }
    });
    return res.status(200).send({
      message: "Playlist was deleted successfully!"
    });
  } catch(err) {
    res.status(500).send({
      message: "Could not delete Playlist with id=" + id
    });
  }
};
