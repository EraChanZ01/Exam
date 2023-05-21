'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {

    await queryInterface.createTable('ConversationsInCatalogs', {
      catalogId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        primaryKey: true,
        references: {
          model: {
            tableName: "Catalogs",
            key: "id"
          }
        },
        onDelete: 'CASCADE'
      },
      conversationId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        primaryKey: true,
        references: {
          model: {
            tableName: "Conversations",
            key: "id"
          }
        },
        onDelete: 'CASCADE'
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      }

    }, {
      timestamps: false
    },);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('ConversationsInCatalogs');

  }
};
