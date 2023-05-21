ALTER TYPE "enum_Users_role" ADD VALUE 'moderator'

UPDATE "Users"
SET role = 'moderator'
WHERE "firstName" = 'Moder'