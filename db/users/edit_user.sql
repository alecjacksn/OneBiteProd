UPDATE users
SET user_name = $1, email = $2, phone = $3, company = $4, website = $5
WHERE authid = $6