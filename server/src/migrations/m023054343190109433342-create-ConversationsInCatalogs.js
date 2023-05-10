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
        }
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
        }
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('ConversationsInCatalogs');

  }
};
