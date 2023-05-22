'use strict';
const bcrypt = require('bcryptjs');
const {
  Model, Validator
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {

    static associate(models) {
      // define association here
      User.hasMany(models.Game, { foreignKey: 'user1Id', as: "GamesStarted", onDelete: 'CASCADE', hooks: true });
      User.hasMany(models.Game, { foreignKey: 'user2Id', as: "GamesJoined", onDelete: 'CASCADE', hooks: true });
    }
  }
  User.init({
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        len: [4, 30],
        notEmail(value) {
          if (Validator.isEmail(value)) {
            throw new Error('Cannot be an email')
          }
        }
      }
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false, validate: {
        len: [3, 256]
      }
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        len: [3, 256]
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [3, 256],
        isEmail: true
      }
    },
    hashedPassword: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [50, 72]
      }
    },
  }, {
    sequelize,
    modelName: 'User',
    defaultScope: {
      attributes: {
        exclude: ['hashedPassword', 'email', 'createdAt', 'updatedAt', 'deletedAt']
      }
    },
    scopes: {
      currentUser: {
        attributes: { exclude: ['hashedPassword', 'createdAt', 'updatedAt', 'deletedAt'] }
      }
    }
  });
  return User;
};
