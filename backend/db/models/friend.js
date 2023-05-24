'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Friend extends Model {

    static associate(models) {
      // define association here
      Friend.belongsTo(models.User, { foreignKey: 'userId', as: "RequestingUser" });
      Friend.belongsTo(models.User, { foreignKey: 'friendId', as: "ReceivingUser" });
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
      type: DataTypes.ENUM('pending', 'accepted', 'rejected'),
      defaultValue: 'pending',
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
