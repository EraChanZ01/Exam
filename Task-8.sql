CREATE TABLE "Conversations" (
    id bigserial NOT NULL,
    createdAt date NOT NULL,
    updatedAt date NOT NULL,
    PRIMARY KEY (id)
);
CREATE TABLE "UsersInConversations" (
    userId int NOT NULL,
    ConversationId int NOT NULL,
    PRIMARY KEY (userId, ConversationId),
    FOREIGN KEY (userId) REFERENCES public."Users"(id),
    FOREIGN KEY (ConversationId) REFERENCES public."Conversations"(id)
);
CREATE TABLE "Catalogs" (
    id bigserial NOT NULL,
    userId int NOT NULL,
    catalogName varchar(64) NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (userId) REFERENCES public."Users"(id)
);
CREATE TABLE "ConversationsInCatalogs"(
    CatalogId int NOT NULL,
    ConversationId int NOT NULL,
    PRIMARY KEY (CatalogId, ConversationId),
    FOREIGN KEY (CatalogId) REFERENCES public."Catalogs"(id),
    FOREIGN KEY (ConversationId) REFERENCES public."Conversations"(id)
);
CREATE TABLE "BlackLists" (
    userId int NOT NULL,
    blockedUserId int NOT NULL,
    PRIMARY KEY (userId),
    FOREIGN KEY (userId) REFERENCES  public."Users"(id),
    FOREIGN KEY (blockedUserId) REFERENCES  public."Users"(id)
);
CREATE TABLE "FavoriteLists" (
    userId int NOT NULL,
    FavoritUserId int NOT NULL,
    PRIMARY KEY (userId),
    FOREIGN KEY (userId) REFERENCES  public."Users"(id),
    FOREIGN KEY (FavoritUserId) REFERENCES  public."Users"(id)
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

