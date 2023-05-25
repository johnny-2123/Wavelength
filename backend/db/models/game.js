'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Game extends Model {

    static associate(models) {
      // define association here
      Game.belongsTo(models.User, { foreignKey: 'user1Id', as: "user1" });
      Game.belongsTo(models.User, { foreignKey: 'user2Id', as: "user2" });

      Game.hasMany(models.Round, {
        foreignKey: 'gameId', as: 'Round', onDelete: 'CASCADE', hooks: true
      });
    }
  }
  Game.init({
    user1Id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    user2Id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    gameOver: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  }, {
    sequelize,
    modelName: 'Game'
  });
  return Game;
};
