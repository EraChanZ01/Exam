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

    const conversation = await await db.Conversations.findOne({
      where: {
        id: req.body.conversationId
      },
      include: [
        {
          model: db.Users,
        },
      ],
    })
    const participants = new Array(2)
    conversation.Users.forEach(user => {
      if (user.id === req.body.recipient) participants[1] = user
      else {
        participants[0] = user
      }
    })
    const preview = {
      sender: user.id,
      text: req.body.messageBody,
      participants: [req.tokenData.userId, req.body.recipient],
      blackList: [participants[0].UsersInConversations.blackList, participants[1].UsersInConversations.blackList],
      favoriteList: [participants[0].UsersInConversations.favoriteList, participants[1].UsersInConversations.favoriteList],
    };
    if (conversation) {
      message = await db.Messages.create({
        conversationId: conversation.id,
        body: req.body.messageBody,
        sender: user.id
      })
      Object.assign(preview, { conversationId: conversation.id, createAt: message.createdAt })

    } else {

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
    message.dataValues.participants = [req.body.recipient, req.tokenData.userId]
    controller.getChatController().emitNewMessage(req.body.recipient, {
      message,
      preview: {
        id: preview.conversationId,
        sender: req.tokenData.userId,
        text: req.body.messageBody,
        createAt: message.createdAt,
        participants: [req.body.recipient, req.tokenData.userId],
        blackList: preview.blackList,
        favoriteList: preview.favoriteList,
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

    res.send({
      message: { ...message.dataValues, participants: [req.tokenData.userId, req.body.recipient], },
      preview: Object.assign(preview, { interlocutor: req.body.interlocutor })
    })

  } catch (err) {
    next(err)
  }
}

module.exports.getChat = async (req, res, next) => {
  try {
    let messages = []
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
    next(err)
  }
}

module.exports.getPreview = async (req, res, next) => {
  try {

    const conversations = await db.Conversations.findAll({
      include: [
        {
          model: db.Users,
          attributes: {
            exclude: ['password', 'role', 'balance', 'accessToken', 'rating']
          }
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
      const participants = conver.Users[0].id === req.tokenData.userId ? [conver.Users[0], conver.Users[1]] : [conver.Users[1], conver.Users[0]]
      messages[0].dataValues.interlocutor = participants[1]
      messages[0].dataValues.blackList = [participants[0].UsersInConversations.blackList, participants[1].UsersInConversations.blackList]
      messages[0].dataValues.favoriteList = [participants[0].UsersInConversations.favoriteList, participants[1].UsersInConversations.favoriteList]
      messages[0].dataValues.participants = [participants[0].id, participants[1].id]
      return messages[0]
    })
    const lastMessages = await Promise.all(lastMessagesPromis)
    res.send(lastMessages)
  } catch (err) {
    next(err)
  }
}

module.exports.blackList = async (req, res, next) => {
  try {
    const conversation = await db.Conversations.findOne({
      where: { id: req.body.conversationId }
    })
    await db.UsersInConversations.update(
      {
        blackList: req.body.blackListFlag
      },
      {
        where: {
          conversationId: conversation.id,
          userId: req.tokenData.userId
        }
      }
    )
    const user = await db.UsersInConversations.findAll({
      where: {
        userId: {
          [Sequelize.Op.in]: req.body.participants
        },
        conversationId: conversation.id
      },
      limit: 2
    })
    const participants = user[0].userId === req.tokenData.userId ? [user[0], user[1]] : [user[1], user[0]]
    const blackList = [participants[0].blackList, participants[1].blackList]
    const favoriteList = [participants[0].favoriteList, participants[1].favoriteList]

    controller.getChatController().emitChangeBlockStatus(participants[0].userId, {
      conversationId: conversation.id,
      participants: [participants[0].userId, participants[1].userId],
      blackList,
      favoriteList
    });

    res.send({
      conversationId: conversation.id,
      participants: [participants[0].userId, participants[1].userId],
      blackList,
      favoriteList
    })
  } catch (err) {
    next(err)
  }
}

module.exports.favoriteChat = async (req, res, next) => {
  try {
    const conversation = await db.Conversations.findOne({
      where: { id: req.body.conversationId }
    })

    await db.UsersInConversations.update(
      {
        favoriteList: req.body.favoriteFlag
      },
      {
        where: {
          conversationId: conversation.id,
          userId: req.tokenData.userId
        }
      }
    )

    const user = await db.UsersInConversations.findAll({
      where: {
        userId: {
          [Sequelize.Op.in]: req.body.participants
        },
        conversationId: conversation.id
      },
      limit: 2
    })
    const participants = user[0].userId === req.tokenData.userId ? [user[0], user[1]] : [user[1], user[0]]
    const blackList = [participants[0].blackList, participants[1].blackList]
    const favoriteList = [participants[0].favoriteList, participants[1].favoriteList]
    res.send({
      conversationId: conversation.id,
      participants: [participants[0].userId, participants[1].userId],
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
