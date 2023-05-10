"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    class Conversation extends Model {
        static associate(models) {
            Conversation.belongsToMany(models.Catalogs, {
                through: 'ConversationsInCatalogs'
            })
            Conversation.belongsToMany(models.Users, {
                through: 'UsersInConversations'
            })
            Conversation.hasMany(models.Messages, {
                foreignKey: 'conversationId', sourceKey: 'id'
            });
        }
    }
    Conversation.init(
        {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: DataTypes.INTEGER,
            }
        },
        {
            sequelize,
            modelName: "Conversations",
            timestamps: true
        }
    )
    return Conversation
};