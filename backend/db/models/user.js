'use strict';
const bcrypt = require('bcryptjs');
const {
  Model, Validator
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
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
