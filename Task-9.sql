SELECT role, count(*) 
FROM "Users"
GROUP BY role



SELECT json_object_agg(role, count) as countRole
FROM (
  SELECT role, COUNT(*) as count
  FROM "Users"
  GROUP BY role
) query