
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('BlackList', {
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
            blockedUserId: {
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
        return queryInterface.dropTable('BlackList');
    },
};