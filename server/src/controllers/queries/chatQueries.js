const db = require('../../models');
const ServerError = require('../../errors/ServerError');

module.exports.checkList = async (userId, participant2, dbName) => {
    const userList = await db[dbName].findOne({
        where: {
            userId: userId,
            participantId: participant2
        }
    })
    const participantList = await db[dbName].findOne({
        where: {
            userId: participant2,
            participantId: userId
        }
    })
    const List = [!!userList, !!participantList]
    return List
}
