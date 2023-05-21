CREATE TABLE "Conversations" (
    id bigserial NOT NULL,
    createdAt date NOT NULL,
    updatedAt date NOT NULL,
    PRIMARY KEY (id)
);
CREATE TABLE "UsersInConversations" (
    userId int NOT NULL,
    conversationId int NOT NULL,
    createdAt date NOT NULL,
    updatedAt date NOT NULL,
    PRIMARY KEY (userId, conversationId),
    FOREIGN KEY (userId) REFERENCES public."Users"(id),
    FOREIGN KEY (conversationId) REFERENCES public."Conversations"(id)
);
CREATE TABLE "Catalogs" (
    id bigserial NOT NULL,
    userId int NOT NULL,
    catalogName varchar(64) NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (userId) REFERENCES public."Users"(id)
);
CREATE TABLE "ConversationsInCatalogs"(
    catalogId int NOT NULL,
    conversationId int NOT NULL,
    PRIMARY KEY (catalogId, conversationId),
    FOREIGN KEY (CatalogId) REFERENCES public."Catalogs"(id),
    FOREIGN KEY (conversationId) REFERENCES public."Conversations"(id) ON DELETE CASCADE
);
CREATE TABLE "BlackLists" (
    userId int NOT NULL,
    participantId int NOT NULL,
    PRIMARY KEY (userId, participantId),
    FOREIGN KEY (userId) REFERENCES public."Users"(id),
    FOREIGN KEY (participantId) REFERENCES public."Users"(id)
);
CREATE TABLE "FavoriteLists" (
    userId int NOT NULL,
    participantId int NOT NULL,
    PRIMARY KEY (userId, participantId),
    FOREIGN KEY (userId) REFERENCES public."Users"(id),
    FOREIGN KEY (participantId) REFERENCES public."Users"(id)
);
CREATE TABLE "Messages" (
    id bigserial NOT NULL,
    sender int NOT NULL,
    body text NOT NULL,
    conversationId int NOT NULL,
    createdAt date NOT NULL,
    updatedAt date NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (sender) REFERENCES public."Users"(id),
    FOREIGN KEY (conversationId) REFERENCES public."Conversations"(id)
);