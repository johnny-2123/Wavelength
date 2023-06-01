'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Round extends Model {

    static associate(models) {
      // define association here
      Round.belongsTo(models.Game, { foreignKey: 'gameId' });
      Round.hasMany(models.Word, { foreignKey: 'roundId', onDelete: 'CASCADE', hooks: true });
    }
  }
  Round.init({
    gameId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    user1Agrees: {
      type: DataTypes.BOOLEAN,
      defaultValue: null
    },
    user2Agrees: {
      type: DataTypes.BOOLEAN,
      defaultValue: null
    },
    user1Ready: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    user2Ready: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  }, {
    sequelize,
    modelName: 'Round',
  });
  return Round;
};
