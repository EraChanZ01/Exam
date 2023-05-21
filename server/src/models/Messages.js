"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    class Messages extends Model {
        static associate(models) {
            Messages.belongsTo(models.Users, {
                foreignKey: 'sender', sourceKey: 'id'
            });
            Messages.belongsTo(models.Conversations, {
                foreignKey: 'conversationId', sourceKey: 'id'
            });
        }
    }
    Messages.init(
        {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: DataTypes.INTEGER
            },
            sender: {
                allowNull: false,
                type: DataTypes.INTEGER
            },
            body: {
                allowNull: false,
                type: DataTypes.STRING
            },
            conversationId: {
                allowNull: false,
                type: DataTypes.INTEGER
            }
        },
        {
            sequelize,
            modelName: "Messages",
            timestamps: true
        }
    )
    return Messages
};