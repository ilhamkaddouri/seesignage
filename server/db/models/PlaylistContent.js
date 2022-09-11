const {  DataTypes } = require("sequelize");
const { PLAYLIST_CONTENT_TYPE } = require("../../constants/constants");
module.exports = (sequelize) => {
    const model = sequelize.define("PlaylistContent", {
      id: {
        field: 'PlaylistContentSN',
        type: DataTypes.BIGINT,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
      },
      playlistId: {
        field: 'PlaylistSN',
        type: DataTypes.BIGINT,
        references: {
          model: 'Playlist',
          key: 'PlaylistSN'
        },
        allowNull: false,
        onDelete: 'cascade'
      },
      url: {
        field: 'URL',
        type: DataTypes.STRING,
        validate: {
          notEmpty: true
        },
        allowNull: false
      },
      type: {
        field: 'Type',
        type: DataTypes.ENUM,
        values: Object.values(PLAYLIST_CONTENT_TYPE),
        validate: {
          notEmpty: true
        },
        allowNull: false
      },
      position: {
        field: 'Position',
        type: DataTypes.INTEGER,
        validate: {
          notEmpty: true
        },
        allowNull: false
      },
      createdOn: {
        type: DataTypes.DATE,
        field: 'CreatedOn',
        defaultValue: new Date(),
        allowNull: false
      },
      changedOn: {
        type: DataTypes.DATE,
        field: 'ChangeddOn',
        defaultValue: new Date(),
        allowNull: false
      }
    },
    {
      createdAt: 'createdOn',
      updatedAt: 'changedOn',
      timestamps: true,
      tableName: 'PlaylistContent',
    }
    );
    model.associate = (models) => {
      model.belongsTo(models.Playlist, {
        as: 'playlist',
        foreignKey: 'playlistSN',
      })
    }
    return model;
  };