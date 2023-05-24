'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Friend extends Model {

    static associate(models) {
      // define association here
      Friend.belongsTo(models.User, { foreignKey: 'userId', as: "User" });
      Friend.belongsTo(models.User, { foreignKey: 'friendId', as: "Friend" });
    }
  }
  Friend.init({
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    friendId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false
    },
    dateAdded: {
      type: DataTypes.DATE
    }
  }, {
    sequelize,
    modelName: 'Friend',
  });
  return Friend;
};
