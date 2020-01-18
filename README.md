# mini-wp

### Documentation : 
``` API-BASE-URL: http://35.184.99.60:3000 ```
### https://documenter.getpostman.com/view/6308027/SWE57ez3?version=latest

### Web Url : http://miniwp.mputong.com/

# favorite-shows-app-server

List of available endpoints:
- `POST /register`
- `POST /login`

Manage logged in user data:
- `GET /shows`
- `POST /shows`
- `DELETE /shows/:id`

Error response format:
```json
{
  "errors": [
    "Connection to mongodb error",
    "username required",
    "password required",
    "password minimal 6 characters",
    "username already registered",
    "Internal server error, check the console",
    "title required",
    "title already registered",
    "you don't have authorized to do this action"
  ]
}
```

## POST /register

- Request Header(s):
  - `Content-Type`: `application/x-www-form-urlencoded` or `application/json`
- Request Body:
  - `username`: `String (required, unique)`
  - `password`: `String (required, min length: 6)`
- Response:
  - `status`: `201`
  - `body`:
    ```json
    {
      "_id": "...",
      "username": "...",
      "password": "..."
    }
    ```

## POST /login

- Request Header(s):
  - `Content-Type`: `application/x-www-form-urlencoded` or `application/json`
- Request Body:
  - `username`: `String`
  - `password`: `String`
- Response:
  - `status`: `200`
  - `body`:
    ```json
    {
      "_id": "...",
      "username": "...",
      "token": "...",
    }
    ```

## GET /shows

- Request Header(s):
  - `Authorization`: `token <token>`  
    *replace `<token>` with your actual token from `POST /login` response*
- Request query (Optional):
  - `title`: `String`
    *search shows by `title`*
- Response:
  - `status`: `200`
  - `body`:
    ```json
    [
      {
        "_id": "...",
        "title": "...",
        "description": "...",
        "image": "...",
      }
    ]
    ```

## POST /shows

- Request Header(s):
  - `Authorization`: `token <token>`  
    *replace `<token>` with your actual token from `POST /login` response*
  - `Content-Type`: `application/x-www-form-urlencoded` or `application/json`
- Request Body:
  - `title`: `String (required, unique)`
  - `description`: `String`
  - `image`: `String`
- Response:
  - `status`: `201`
  - `body`:
    ```json
    {
      "_id": "...",
      "title": "...",
      "description": "...",
      "image": "...",
    }
    ```

## DELETE /shows/:id

- Request Header(s):
  - `Authorization`: `token <token>`  
    *replace `<token>` with your actual token from `POST /login` response*
- Request Param(s):
  - `id`: `ObjectId String`
- Response:
  - `status`: `200`
  - `body`:
    ```json
    {
      "_id": "...",
      "title": "...",
      "description": "...",
      "image": "...",
    }
    ```
