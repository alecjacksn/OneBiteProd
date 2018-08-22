INSERT INTO users
(user_name, authid, profpic, email)
VALUES 
($1, $2, $3, $4)
RETURNING *;