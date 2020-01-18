# mini-wp

### Web Url : http://miniwp.mputong.com/

### api-Documentation : 
``` API-BASE-URL: http://35.184.99.60:3000 ```
### https://documenter.getpostman.com/view/6308027/SWE58KR8?version=latest

List of available endpoints:
#### Articles
- `POST /articles`
- `GET /articles`
- `GET /articles/:title`
- `DELETE /articles/:id`
- `PUT /articles/:id`

#### Authors
- `POST /authors`
- `POST /authors/login`
- `POST /authors/login/oauth/:googleToken`
- `GET /authors`

Error response format:
```json
{
  "message": "..."
}
```

## POST /articles
- Request Header(s):
  - `Content-Type`: `application/x-www-form-urlencoded`
  - `Authorization`: `token {jwt token}` 
- Request Body:
  - `title: {
                type: String,
                required: true,
                unique: true,
                minlength: 10,
                maxlength: 100
            }`
  - `tags: [{
                 type: String,
                 required: true,
                 minlength: 3,
                 maxlength: 15
             }],`
  - `content: {
                 type: String/ html,
                 required: true,
                 minlength: 100,
                 maxlength: 50000
             }`
  - `featured_image: {
                 file
             }`          
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
