'use strict';
const bcrypt = require('bcryptjs');
const {
  Model, Validator
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {

    toSafeObject() {
      const { id, username, email, firstName, lastName } = this;
      return { id, username, email, firstName, lastName };
    };

    validatePassword(password) {
      return bcrypt.compareSync(password, this.hashedPassword.toString());
    }
    static getCurrentUserById(id) {
      return User.scope('currentUser').findByPk(id);
    }
    static async login({ credential, password }) {
      const { Op } = require('sequelize');

      const user = await User.scope('loginUser').findOne({
        where: {
          [Op.or]: {
            username: credential,
            email: credential
          }
        }
      });

      if (user && user.validatePassword(password)) {
        return await User.scope('currentUser').findByPk(user.id);
      };
    }

    static async signup({ username, email, password, firstName, lastName }) {
      const hashedPassword = bcrypt.hashSync(password);
      const user = await User.create({
        username,
        firstName,
        lastName,
        email,
        hashedPassword
      });

      return await User.scope('currentUser').findByPk(user.id);

    }

    static associate(models) {
      User.hasMany(models.Game, { foreignKey: 'user1Id', as: "GamesStarted", onDelete: 'CASCADE', hooks: true });
      User.hasMany(models.Game, { foreignKey: 'user2Id', as: "GamesJoined", onDelete: 'CASCADE', hooks: true });
      User.belongsToMany(models.User, {
        as: "Friends",
        through: models.Friend,
        foreignKey: "userId",
        otherKey: "friendId"
      })
      User.hasMany(models.Word, { foreignKey: 'userId', as: 'Word', onDelete: 'CASCADE', hooks: true });
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
    guid: {
      type: DataTypes.UUID,
      defaultValue: null,
      allowNull: true,
      unique: true,
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
