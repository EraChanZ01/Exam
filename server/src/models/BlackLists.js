"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    class BlackList extends Model {
        static associate(models) {
        }
    }
    BlackList.init(
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
            modelName: "BlackLists",
            timestamps: false
        }
    )
    return BlackList
};