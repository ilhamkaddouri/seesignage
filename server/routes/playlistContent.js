const {
  updatePriority,
  createOrUpdateObject,
  getOrder,
} = require("../controllers/utils");
const db = require("../db/index");
const PlaylistContent = db.PlaylistContent;
const router = require("express").Router();

module.exports = (app) => {
  router.put("/", async function (req, res) {
    try {
      if (!req.body.url || !req.body.type || !req.body.playlistId) {
        res.status(404).send({
          message: "Some error occurred while creating the Tutorial.",
        });
      }

      await updatePriority(req, PlaylistContent);
      const content = await createOrUpdateObject(req, PlaylistContent);
      const contentId = req.body.id || content.id;
      const updatedContent = await PlaylistContent.findOne({
        where: {
          id: contentId,
        },
        order: getOrder(req.query.sort),
      });
      return res.send(updatedContent);
    } catch (err) {
      res.status(500).send({
        message: err.message,
      });
    }
  });

  router.put("/api/playlistContentPosition", async function (req, res) {
    try {
      const contentIds = req.body.contentIds;
      if (!contentIds || !Array.isArray(contentIds)) {
        res.status(304).send("error");
      }
      const existingContentIds = (
        await PlaylistContent.findAll({
          attributes: ["id"],
        })
      ).map((content) => content.id);
      const restContentIds = existingContentIds.filter(
        (id) => !contentIds.includes(id)
      );
      const allContentIds = contentIds
        .filter((id) => existingContentIds.includes(id))
        .concat(restContentIds);
      await allContentIds.reduce(
        (acc, cur, index) =>
          acc.then(() =>
            PlaylistContent.update(
              {
                position: index + 1,
              },
              {
                where: {
                  id: cur,
                },
              }
            )
          ),
        Promise.resolve()
      );
      res.sendStatus(200);
    } catch (err) {
      res.sendStatus(500);
    }
  });

  router.get("/playlist/:id", async (req, res) => {
    try {
      const id = req.params.id;
      const data = await PlaylistContent.findAll({
        where: {
          playlistId: id,
        },
      });
      return res.send(data);
    } catch (err) {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving playlists.",
      });
    }
  });
  router.get("/", async (req, res) => {
    try {
      const data = await PlaylistContent.findAll();
      return res.send(data);
    } catch (err) {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving playlists.",
      });
    }
  });

  router.get("/:id", async (req, res) => {
    try{
      const id = req.params.id;
      const data = await PlaylistContent.findByPk(id);
      return res.send(data);
    } catch(err) {
      res.status(500).send({
        message: "Error retrieving Playlist with id=" + id
      });
    }
  });

  router.delete("/playlist/:id/content/:contentId", async (req, res) => {
    try {
      const playlistId = req.params.id;
      const conentId = req.params.contentId;
      await PlaylistContent.destroy({
        where: {
          id: conentId,
          playlistId,
        },
      });
      return res.status(200).send({
        message: "Playlist was deleted successfully!",
      });
    } catch (err) {
      res.status(500).send({
        message: "Could not delete Playlist with id=" + id,
      });
    }
  });

  app.use("/api/paylistsContent", router);
};
