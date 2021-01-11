# mini-wp

# Mini-WP API Documentation

Dokumentasi API Mini WP.

### environment variabeles

```PORT = 
PORT =
MONGO_URI = 
KEY_FILENAME = 
BUCKET_NAME =
JWT_SECRET = 
CLIENT_ID_GOOGLE = 
```

## USAGE

```text
javascript
npm install
npm run dev
```

## BASE URL

```
http://localhost:3000/
```

##  ACCESS

```````text
Access server port: 3000
Access client port: 1234
```````



## USER ROUTES

| Routing             | HTTP | Header(s) | Body                                                         | Response                                                  | Description       |
| ------------------- | ---- | --------- | ------------------------------------------------------------ | --------------------------------------------------------- | ----------------- |
| /users              | POST | none      | username : String (***required***), email : String (***required***), password : String (***required***) | Error: Internal server error Success: add new user        | Create new user   |
| /users/login        | POST | none      | email : String (***required***), password : String (***required***) | Error: Internal server error Success: login user          | normal user login |
| /users/login/google | POST | none      | email : String (***required***), password : String (***required***) | Error: Internal server error Success: login google member | google user login |



## ARTICLES ROUTE

| Routing       | HTTP   | Headers(s) | Body                                                         | Response                                                     | Description               |
| ------------- | ------ | ---------- | ------------------------------------------------------------ | ------------------------------------------------------------ | ------------------------- |
| /articles     | GET    | token      | none                                                         | Error: Internal server error, Success: Show all articles     | Show all articles to user |
| /articles     | POST   | token      | title: STRING (***required***)(max length 50), content: STRING (***required***), featured_image: STRING,(***required***) | Error: Internal server error, Validation error, Success: create new article | create new articles       |
| /articles/:id | PATCH  | token      | title: STRING, content: STRING, featured_image: STRING       | Error: Internal server error, Success: change title & content & featured_image | update article            |
| /articles/:id | DELETE | token      | none                                                         | Error: Internal server error, Success: delete data article   | delete article            |