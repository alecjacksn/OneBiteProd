INSERT INTO users
( authid, profpic, user_name, email)
VALUES 
($1, $2, $3, $4)
RETURNING *;