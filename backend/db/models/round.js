'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Round extends Model {

    static associate(models) {
      // define association here
      Round.belongsTo(models.Game, { foreignKey: 'gameId', onDelete: 'CASCADE', hooks: true });
      Round.hasMany(models.Word, { foreignKey: 'roundId', onDelete: 'CASCADE', hooks: true });
    }
  }
  Round.init({
    gameId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    // word1Id: {
    //   type: DataTypes.INTEGER
    // },
    // word2Id: {
    //   type: DataTypes.INTEGER
    // },
    user1Agrees: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    user2Agrees: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  }, {
    sequelize,
    modelName: 'Round',
  });
  return Round;
};
