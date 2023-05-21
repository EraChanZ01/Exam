const db = require('../models');
const userQueries = require('./queries/userQueries');
const chatQueries = require('./queries/chatQueries')
const controller = require('../socketInit');
const _ = require('lodash');
const Sequelize = require('sequelize');


module.exports.addMessage = async (req, res, next) => {
  try {
    let message
    const user = await db.Users.findOne({
      where: { id: req.tokenData.userId },
    });
    const blackList = await chatQueries.checkList(req.tokenData.userId, req.body.recipient, "BlackLists")
    const favoriteList = await chatQueries.checkList(req.tokenData.userId, req.body.recipient, "FavoriteLists")
    const conversation = await db.Conversations.findOne({
      include: [
        {
          model: db.Users,
          where: {
            id: {
              [Sequelize.Op.in]: [req.tokenData.userId, req.body.recipient]
            },
          },
        },
      ],
    });
    const preview = {
      sender: req.tokenData.userId,
      text: req.body.messageBody,
      participants: [req.tokenData.userId, req.body.recipient],
      blackList,
      favoriteList,
    };
    if (conversation && conversation.Users.length === 2) {
      message = await db.Messages.create({
        conversationId: conversation.id,
        body: req.body.messageBody,
        sender: user.id
      })
      Object.assign(preview, { conversationId: conversation.id, createAt: message.createdAt })
    }
    else if (!conversation || conversation && conversation.Users.length != 2) {
      const recipient = await db.Users.findOne({ where: { id: req.body.recipient } })
      const newConversation = await db.Conversations.create()
      await newConversation.addUsers([user, recipient])
      message = await db.Messages.create({
        conversationId: newConversation.id,
        body: req.body.messageBody,
        sender: user.id
      })
      Object.assign(preview, {
        conversationId: newConversation.id,
        createAt: message.createdAt,
        interlocutor: req.body.interlocutor
      })
    }
    message.dataValues.participants = [req.tokenData.userId, req.body.recipient]
    controller.getChatController().emitNewMessage(req.body.recipient, {
      message,
      preview: {
        _id: preview.conversationId,
        sender: req.tokenData.userId,
        text: req.body.messageBody,
        createAt: message.createdAt,
        participants: [req.tokenData.userId, req.body.recipient],
        blackList: blackList,
        favoriteList: favoriteList,
        interlocutor: {
          id: req.tokenData.userId,
          firstName: req.tokenData.firstName,
          lastName: req.tokenData.lastName,
          displayName: req.tokenData.displayName,
          avatar: req.tokenData.avatar,
          email: req.tokenData.email,
        },
      },
    });
    res.send({ message, preview: Object.assign(preview, { interlocutor: req.body.interlocutor }) })
  } catch (err) {
    next(err)
  }
}

module.exports.getChat = async (req, res, next) => {
  try {
    let messages = []
    console.log(req.tokenData.userId, req.body)
    const conversations = await db.Conversations.findAll({
      include: [
        {
          model: db.Users,
          where: {
            id: {
              [Sequelize.Op.in]: [req.tokenData.userId, req.body.interlocutorId]
            },
          },
        },
      ],
    });
    const interlocutor = await userQueries.findUser(req.body.interlocutorId);
    if (conversations) {
      for (let i = 0; i < conversations.length; i++) {
        if (conversations[i].Users.length === 2) {
          messages = await db.Messages.findAll({
            where: {
              conversationId: conversations[i].id
            }
          })
        }
      }
    }
    res.send({
      messages,
      interlocutor: {
        firstName: interlocutor.firstName,
        lastName: interlocutor.lastName,
        displayName: interlocutor.displayName,
        id: interlocutor.id,
        avatar: interlocutor.avatar,
      },
    })
  } catch (err) {
    console.log(err)
    next(err)
  }
}
module.exports.getPreview = async (req, res, next) => {
  try {
    const conversations = await db.Conversations.findAll({
      include: [
        {
          model: db.Users,
          where: { id: req.tokenData.userId }
        }
      ]
    });
    const lastMessagesPromis = conversations.map(async conver => {
      const messages = await db.Messages.findAll({
        where: { conversationId: conver.id },
        order: [['createdAt', 'DESC']],
        attributes: [['body', 'text'], "id", "sender", "conversationId", ["createdAt", "createAt"]],
        limit: 1
      })
      return messages[0]
    })
    const lastMessages = await Promise.all(lastMessagesPromis)
    for (let p = 0; p < lastMessages.length; p++) {
      const users = await db.Users.findAll({
        include: [
          {
            model: db.Conversations,
            where: { id: lastMessages[p].conversationId }
          }
        ]
      })
      const participants = []
      for (let i = 0; i < users.length; i++) {
        if (users[i].id != req.tokenData.userId) {
          lastMessages[p].dataValues.blackList = await chatQueries.checkList(req.tokenData.userId, users[i].id, "BlackLists")
          lastMessages[p].dataValues.favoriteList = await chatQueries.checkList(req.tokenData.userId, users[i].id, "FavoriteLists")
          lastMessages[p].dataValues.interlocutor = {
            id: users[i].dataValues.id,
            firstName: users[i].dataValues.firstName,
            lastName: users[i].dataValues.lastName,
            displayName: users[i].dataValues.displayName,
            avatar: users[i].dataValues.avatar,
          }
          participants.push(users[i].id)
        } else {
          participants.unshift(users[i].id)
        }
      }
      lastMessages[p].dataValues.participants = participants
    }
    res.send(lastMessages)
  } catch (err) {
    next(err)
  }
}

module.exports.blackList = async (req, res, next) => {
  try {
    const blackList = await chatQueries.checkList(req.tokenData.userId, req.body.participants[1], "BlackLists")
    const favoriteList = await chatQueries.checkList(req.tokenData.userId, req.body.participants[1], "FavoriteLists")
    if (req.body.blackListFlag) {
      await db.BlackLists.create({
        userId: req.tokenData.userId,
        participantId: req.body.participants[1]
      })
      blackList[0] = req.body.blackListFlag
    }
    else {
      const userBlackList = await db.BlackLists.findOne({
        where: { userId: req.tokenData.userId, participantId: req.body.participants[1] }
      })
      if (userBlackList) {
        await db.BlackLists.destroy({
          where: { userId: userBlackList.userId }
        })
        blackList[0] = false
      }
    }
    res.send({
      participants: req.body.participants,
      blackList,
      favoriteList
    })
  } catch (err) {
    next(err)
  }
}
module.exports.favoriteChat = async (req, res, next) => {
  try {
    const blackList = await chatQueries.checkList(req.tokenData.userId, req.body.participants[1], "BlackLists")
    const favoriteList = await chatQueries.checkList(req.tokenData.userId, req.body.participants[1], "FavoriteLists")
    if (req.body.favoriteFlag) {
      await db.FavoriteLists.create({
        userId: req.tokenData.userId,
        participantId: req.body.participants[1]
      })
      favoriteList[0] = req.body.favoriteFlag
    }
    else {
      const userfavoriteList = await db.FavoriteLists.findOne({
        where: { userId: req.tokenData.userId, participantId: req.body.participants[1] }
      })
      if (userfavoriteList) {
        await db.FavoriteLists.destroy({
          where: ({ userId: userfavoriteList.userId })
        })
      }

      favoriteList[0] = false
    }
    res.send({
      participants: req.body.participants,
      blackList,
      favoriteList
    })
  } catch (err) {
    next(err)
  }
}
module.exports.createCatalog = async (req, res, next) => {
  try {
    const conversation = await db.Conversations.findOne({
      where: { id: req.body.chatId }
    })
    const catalog = await db.Catalogs.create({
      userId: req.tokenData.userId,
      catalogName: req.body.catalogName,
    })
    await conversation.addCatalogs(catalog)
    res.send(Object.assign(catalog.dataValues, {
      chats: [conversation.id],
      conversationId: conversation.id
    }))
  } catch (err) {
    next(err)
  }
}

module.exports.updateNameCatalog = async (req, res, next) => {
  try {
    const [_, catalog] = await db.Catalogs.update(
      { catalogName: req.body.catalogName },
      {
        where: {
          id: req.body.catalogId,
          userId: req.tokenData.userId
        },
        returning: true,
      })
    res.send(catalog[0]);
  } catch (err) {
    next(err);
  }
};

module.exports.addNewChatToCatalog = async (req, res, next) => {
  try {
    const catalog = await db.Catalogs.findOne({
      where: { id: req.body.catalogId, userId: req.tokenData.userId }
    })
    const conversation = await db.Conversations.findOne({
      where: { id: req.body.chatId }
    })
    await catalog.addConversations(conversation)
    const chats = await db.Conversations.findAll({
      include: [
        {
          model: db.Catalogs,
          where: { id: req.body.catalogId },
          attributes: []
        }
      ],
      attributes: ['id']
    })
    catalog.dataValues.chats = chats
    res.send(catalog);
  } catch (err) {
    next(err);
  }
};
module.exports.removeChatFromCatalog = async (req, res, next) => {
  try {
    const catalog = await db.Catalogs.findOne({
      where: { id: req.body.catalogId, userId: req.tokenData.userId }
    })
    const conversation = await db.Conversations.findOne({
      where: { id: req.body.chatId }
    })
    await catalog.removeConversations(conversation)
    const chats = await db.Conversations.findAll({
      include: [
        {
          model: db.Catalogs,
          where: { id: req.body.catalogId },
          attributes: []
        }
      ],
      attributes: ['id']
    })
    catalog.dataValues.chats = chats.map(chat => chat.id);
    res.send(catalog);
  } catch (err) {
    next(err);
  }
};
module.exports.deleteCatalog = async (req, res, next) => {
  try {
    const catalog = await db.Catalogs.findOne({
      where: { id: req.body.catalogId, userId: req.tokenData.userId }
    })
    await catalog.destroy()
    res.send(catalog);
  } catch (err) {
    next(err)
  }
}
module.exports.getCatalogs = async (req, res, next) => {
  try {
    const catalogs = await db.Catalogs.findAll({
      include: [
        {
          model: db.Users,
          where: { id: req.tokenData.userId },
          attributes: []
        },
        {
          model: db.Conversations,
        }
      ],
      attributes: ['id', 'catalogName'],
    })
    for (let i = 0; i < catalogs.length; i++) {
      catalogs[i].dataValues.chats = []
      for (let p = 0; p < catalogs[i].dataValues.Conversations.length; p++) {
        catalogs[i].dataValues.chats.push(catalogs[i].dataValues.Conversations[p].id)
      }
      delete catalogs[i].dataValues.Conversations
    }
    res.send(catalogs);
  } catch (err) {
    next(err)
  }
}
