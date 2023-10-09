DELETE FROM "UsersInConversations" WHERE "conversationId" = 7;
DELETE FROM "Messages" WHERE "conversationId" = 7;
DELETE FROM "Conversations" WHERE id = 7;


INSERT INTO "Conversations" VALUES
(15,'2023-05-14T14:22:38.857Z','2023-05-14T14:22:38.857Z')


INSERT INTO "UsersInConversations" VALUES
(1,15, false, true,'2023-05-14T14:22:38.857Z','2023-05-14T14:22:38.857Z')

INSERT INTO "Messages" VALUES
(34,2,'333',15,'2023-05-17T14:22:38.857Z','2023-05-17T14:22:38.857Z')

DELETE FROM "Catalogs" WHERE id = 5


INSERT INTO "ConversationsInCatalogs" VALUES
(8,15,'2023-05-14T14:22:38.857Z','2023-05-14T14:22:38.857Z'),
(8,6,'2023-05-14T14:22:38.857Z','2023-05-14T14:22:38.857Z')


DELETE FROM "UsersInConversations" WHERE "userId" = 2



UPDATE "Banks"
SET "expiry" = '11/22'
WHERE "name" = 'SquadHelp'
