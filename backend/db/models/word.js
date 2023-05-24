'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Word extends Model {

    static associate(models) {
      // define association here
      Word.belongsTo(models.Round, { foreignKey: 'roundId', onDelete: 'CASCADE', hooks: true });
      Word.belongsTo(models.User, { foreignKey: 'userId', onDelete: 'CASCADE', hooks: true });
    }
  }
  Word.init({
    roundId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    wordText: {
      type: DataTypes.STRING,
      validate: {
        len: [1, 30]
      }
    }
  }, {
    sequelize,
    modelName: 'Word',
  });
  return Word;
};
