
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('BlackLists', {
            userId: {
                allowNull: false,
                primaryKey: true,
                type: Sequelize.INTEGER,
                references: {
                    model: 'Users',
                    key: 'id',
                },
            },
            participantId: {
                allowNull: false,
                primaryKey: true,
                type: Sequelize.INTEGER,
                references: {
                    model: 'Users',
                    key: 'id',
                },
            },

        });
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable('BlackLists');
    },
};