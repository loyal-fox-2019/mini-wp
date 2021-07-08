# mini-wp
A simple wordpress like app.
Use [NodeJs](https://nodejs.org/en/) as back-end, and [MongoDB](https://www.mongodb.com') as database.

## Base URL
By default, base url is at `http://localhost:3000`  
But you can change it by setting the [environment](# Setting up environment)

## Setting up environment
Make a file called `.env` and fill it with necessary environment such as:
* PORT
* MONGODB_URI
* JWT_SECRET
* GOOGLE_CLIENT_ID
* KEY_FILENAME
* BUCKET_NAME
* GITHUB_CLIENT_ID
* GITHUB_CLIENT_SECRET

and put it on server folder.  
For references, check out [`.env-template file`](https://github.com/didadadida93/mini-wp-1/blob/master/server/.env.template)

# Routes
#### `POST /login`
Route for user login.

Authenticate | Authorized
------- | ----------------
No  | No

body request :
* `email type: String` **required**
* `password type: String` **required**

response :
```js
// success
{
    "token": <token>,
    "username": <username>,
    "email": <email>
}

// error with status code 400
{
    "errors": [
        "Email or password is wrong"
    ]
}
```

#### `POST /register`
Route for user register.

Authenticate | Authorized
------- | ----------------
No  | No

body request :
* `username type: String` **required**
* `email type: String` **required**
* `password type: String mininum 6 character` **required**

response :
```js
// success
{
    "token": <token>,
    "username": <username>,
    "email": <email>
}

// error with status code 400
{
    "errors": [
        "Email already registered"
    ]
}
```

#### `GET /users/articles`
Route for user get their articles.

Authenticate | Authorized
------- | ----------------
Yes  | No

headers request :
* `token type: String` **required**

response :
```js
// success
{
  articles: [
      {
          "_id": <id>,
          "title": <title>,
          "content": <content>,
          "author": <author>,
          "featuredImage": <featured image>,
          "tags": <tags>,
          "status": "status"
          "__v": 0
      },
      {
          "_id": <id>,
          "title": <title>,
          "content": <content>,
          "author": <author>,
          "featuredImage": <featured image>,
          "tags": <tags>,
          "status": "status"
          "__v": 0
      }
  ]
}

// error with status code 400
{
    "errors": [
        "Token is missing"
    ]
}
```

#### `GET /articles`
Route for get all published articles.

Authenticate | Authorized
------- | ----------------
No  | No

response :
```js
// success
{
  articles: [
      {
          "_id": <id>,
          "title": <title>,
          "content": <content>,
          "author": <author>,
          "featuredImage": <featured image>,
          "tags": <tags>,
          "status": "status"
          "__v": 0
      },
      {
          "_id": <id>,
          "title": <title>,
          "content": <content>,
          "author": <author>,
          "featuredImage": <featured image>,
          "tags": <tags>,
          "status": "status"
          "__v": 0
      }
  ]
}
```

#### `POST /articles`
Route for user create new article for their own.

Authenticate | Authorized
------- | ----------------
Yes  | No

headers request :
* `token type: String` **required**

body request :
* `title type: String` **required**
* `content type: String` **required**
* `featuredImage type: String`
* `tags type: Array`

response :
```js
// success
{
    "_id": <id>,
    "title": <title>,
    "content": <content>,
    "author": <author>,
    "featuredImage": <featured image>,
    "tags": <tags>,
    "status": "status"
    "__v": 0
}

// error with status code 400
{
    "errors": [
        "title is required"
    ]
}
```

#### `PATCH /articles/<:articleId>`
Route for user edit their article.

Authenticate | Authorized
------- | ----------------
Yes  | Yes

headers request :
* `token type: String` **required**

params request :
* `articleId type: String` **required**

body request :
* `title type: String`
* `content type: String`
* `featuredImage type: String`
* `tags type: Array`
* `status type: String` *enum: 'draft', 'published'*

response :
```js
// success
{
    "message": "Article edited"
}

// error with status code 404
{
    "errors": [
        "Article not found"
    ]
}
```

#### `DELETE /articles/<:article>`
Route for user delete their article.

Authenticate | Authorized
------- | ----------------
Yes  | Yes

headers request :
* `token type: String` **required**

params request :
* `articleId type: String` **required**

response :
```js
// success
{
    "message": "Article deleted"
}

// error with status 404
{
    "errors": [
        "Article not found"
    ]
}
```

# Error Response
* **Status code: 400** : mostly because request from user is not complete. Like their forget to put one of required field in their body request.
* **Status code: 401** : it happen because user trying to access resources not for him.
* **Status code: 404** : this error usually happen because when user trying to get resources but that resources didn't exists on server.
* **Status code: 500** : this error happen because there is some error on server side.
