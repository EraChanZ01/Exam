"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    class BlackList extends Model {
        static associate(models) {
            BlackList.belongsTo(models.Users, {
                foreignKey: 'userId', sourceKey: 'id'
            });
            BlackList.belongsTo(models.Users, {
                foreignKey: 'blockedUserId', sourceKey: 'id'
            });
        }
    }
    BlackList.init(
        {
            userId: {
                allowNull: false,
                primaryKey: true,
                type: DataTypes.INTEGER,
            },
            blockedUserId: {
                allowNull: false,
                type: DataTypes.INTEGER,
            },
        },
        {
            sequelize,
            modelName: "BlackLists",
            timestamps: false
        }
    )
    return BlackList
};