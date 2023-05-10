module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('FavoriteLists', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
                references: {
                    model: 'Users',
                    key: 'id',
                },
            },
            FavoritUserId: {
                allowNull: false,
                type: Sequelize.INTEGER,
                references: {
                    model: 'Users',
                    key: 'id',
                },
            },

        });
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable('FavoriteLists');
    },
};