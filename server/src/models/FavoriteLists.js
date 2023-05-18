"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    class FavoriteList extends Model {
        static associate(models) {
        }
    }
    FavoriteList.init(
        {
            userId: {
                allowNull: false,
                primaryKey: true,
                type: DataTypes.INTEGER,
                references: {
                    model: 'Users',
                    key: 'id',
                },
            },
            participantId: {
                allowNull: false,
                type: DataTypes.INTEGER,
                references: {
                    model: 'Users',
                    key: 'id',
                },
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