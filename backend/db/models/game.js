'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Game extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Game.init({
    user1Id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    user2Id: {
      type: DataTypes.INTEGER
    },
    gameOver: {
      type: DataTypes.BOOLEAN
    },
    datetime: {
      type: DataTypes.DATE
    }
  }, {
    sequelize,
    modelName: 'Game',
  });
  return Game;
};
