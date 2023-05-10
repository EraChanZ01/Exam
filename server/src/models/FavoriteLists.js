"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    class FavoriteList extends Model {
        static associate(models) {
            FavoriteList.belongsTo(models.Users, {
                foreignKey: 'userId', sourceKey: 'id'
            });
            FavoriteList.belongsTo(models.Users, {
                foreignKey: 'FavoritUserId', sourceKey: 'id'
            });
        }
    }
    FavoriteList.init(
        {
            userId: {
                allowNull: false,
                primaryKey: true,
                type: DataTypes.INTEGER,
            },
            FavoritUserId: {
                allowNull: false,
                type: DataTypes.INTEGER,
            },
        },
        {
            sequelize,
            modelName: "FavoriteLists",
            timestamps: false
        }
    )
    return FavoriteList
};