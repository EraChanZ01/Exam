UPDATE "Users"
SET "balance" = "balance" + "cashback"
FROM (
        SELECT id,
            sum(prize * quantity) * 0.1 as "cashback"
        FROM(
                SELECT "Users".id,
                    "Contests".prize,
                    count(*) as quantity
                FROM "Users"
                    JOIN "Contests" ON "Contests"."userId" = "Users".id
                WHERE "Contests"."createdAt" BETWEEN '2022-12-25' AND '2023-01-14'
                GROUP BY "Users".id,
                    "Contests".prize
            ) as quantity_Contests_Users
        GROUP BY id
    ) as "contests_cashback"
WHERE "Users".id = "contests_cashback".id