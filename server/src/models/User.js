"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.hasMany(models.Messages, {
        foreignKey: 'sender', sourceKey: 'id'
      });
      User.belongsToMany(models.Conversations, {
        through: 'UsersInConversations'
      })
      User.hasMany(models.Catalogs, {
        foreignKey: 'userId', sourceKey: 'id'
      });
      User.hasMany(models.BlackLists, {
        foreignKey: 'userId', targetKey: 'id'
      });
      User.hasMany(models.BlackLists, {
        foreignKey: 'blockedUserId', targetKey: 'id'
      });
      User.hasMany(models.FavoriteLists, {
        foreignKey: 'userId', sourceKey: 'id'
      });
      User.hasMany(models.FavoriteLists, {
        foreignKey: 'FavoritUserId', sourceKey: 'id'
      });
      User.hasMany(models.Ratings, {
        foreignKey: 'userId', targetKey: 'id'
      });
      User.hasMany(models.Contests, {
        foreignKey: 'userId', targetKey: 'id'
      });
      User.hasMany(models.Offers, {
        foreignKey: 'userId', targetKey: 'id'
      });

    }
  }
  User.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      displayName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      avatar: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'anon.png',
      },
      role: {
        type: DataTypes.ENUM('customer', 'creator'),
        allowNull: false,
      },
      balance: {
        type: DataTypes.DECIMAL,
        allowNull: false,
        defaultValue: 0,
        validate: {
          min: 0,
        },
      },
      accessToken: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      rating: {
        type: DataTypes.FLOAT,
        allowNull: false,
        defaultValue: 0,
      },
    },
    {
      sequelize,
      modelName: "Users",
      timestamps: false
    }
  )

  return User;
};
