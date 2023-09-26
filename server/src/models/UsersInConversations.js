"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    class UsersInConversation extends Model {
        static associate(models) {
            UsersInConversation.belongsTo(models.Conversations, {
                foreignKey: "conversationId",
            });

            UsersInConversation.belongsTo(models.Users, {
                foreignKey: "userId",
            });
        }
    }
    UsersInConversation.init(
        {
            userId: {
                allowNull: false,
                type: DataTypes.INTEGER,
                primaryKey: true,
            },
            conversationId: {
                allowNull: false,
                type: DataTypes.INTEGER,
                primaryKey: true,
            },
            blackList: {
                type: DataTypes.BOOLEAN,
            },
            favoriteList: {
                type: DataTypes.BOOLEAN,
            },
        },
        {
            sequelize,
            modelName: "UsersInConversations",
            timestamps: true
        }
    )
    return UsersInConversation
};