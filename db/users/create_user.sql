INSERT INTO users
(user_name, email, authid, profpic)
VALUES 
($1, $2, $3, $4)
RETURNING *;