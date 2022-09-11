const dbConfig = require("./db.config");
const Sequelize = require("sequelize");
// Code here! It works!
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});
const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.Playlists = require("./models/Playlist")(sequelize);
db.PlaylistContent = require("./models/PlaylistContent")(sequelize);
module.exports = db;