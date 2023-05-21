
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('Catalogs', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            userId: {
                allowNull: false,
                type: Sequelize.INTEGER,
                references: {
                    model: 'Users',
                    key: 'id',
                },
            },
            catalogName: {
                type: Sequelize.STRING,
                allowNull: false,
            }

        });
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable('Catalogs');
    },
};