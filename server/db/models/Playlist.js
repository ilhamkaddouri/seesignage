const {  DataTypes } = require("sequelize");
module.exports = (sequelize) => {
    const model = sequelize.define("Playlist", {
      id: {
        field: 'PlaylistSN',
        type: DataTypes.BIGINT,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
      },
      name: {
        field: 'PlaylistName',
        type: DataTypes.STRING(30),
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
      tableName: 'Playlist',
    });
    model.associate = (models) => {
        model.hasMany(models.PlaylistContent, {
          as: 'playlistContent',
          foreignKey: 'playlistId',
          sourceKey: 'id'
        })
      }
    return model;
  };