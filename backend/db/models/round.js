'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Round extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Round.belongsTo(models.Game, { foreignKey: 'game_id', onDelete: 'CASCADE', hooks: true });
    }
  }
  Round.init({
    round_number: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    game_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    word1_id: {
      type: DataTypes.INTEGER
    },
    word2_id: {
      type: DataTypes.INTEGER
    },
    user1_agrees: {
      type: DataTypes.BOOLEAN
    },
    user2_agrees: {
      type: DataTypes.BOOLEAN
    }
  }, {
    sequelize,
    modelName: 'Round',
  });
  return Round;
};
