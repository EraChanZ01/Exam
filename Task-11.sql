UPDATE "Users"
SET "balance" = "balance" + 10
FROM(
        SELECT id,
            sum(rating)
        FROM "Users"
        WHERE role = 'creator'
        GROUP BY id
        ORDER BY sum DESC
        LIMIT 3
    ) as filter_rating
WHERE "Users".id = filter_rating.id