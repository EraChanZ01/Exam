"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    class Catalog extends Model {
        static associate(models) {
            Catalog.belongsTo(models.Users, {
                foreignKey: 'userId', sourceKey: 'id'
            });
            Catalog.belongsToMany(models.Conversations, {
                through: 'ConversationsInCatalogs'
            })
        }
    }
    Catalog.init(
        {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: DataTypes.INTEGER,
            },
            userId: {
                allowNull: false,
                type: DataTypes.INTEGER,
            },
            catalogName: {
                type: DataTypes.STRING,
                allowNull: false,
            }
        },
        {
            sequelize,
            modelName: "Catalogs",
            timestamps: false
        }
    )
    return Catalog
};