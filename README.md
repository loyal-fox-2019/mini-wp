# mini-wp

**Base URL:**

**User Routes:**

| Routes              | Method | Description                    |
|---------------------|--------|--------------------------------|
| /users/login        | POST   | Sign in / login User           |
| /users/register     | POST   | Sign Up / Register new user    |
| /users/loginGoogle  | POST   | Sign in using OAuth 2.0 Google |

**Articles Routes:**

| Routes            | Method | Description                          |
|-------------------|--------|--------------------------------------|
| /articles         | GET    | Find all article user                |
| /articles/:id     | GET    | Find one article user                |
| /articles         | POST   | Add new article                      |
| /articles/:id     | DELETE | Delete one article with id           |
| /articles/:id     | PUT    | Update article with id todo          |
| /articles/:id     | PATCH  | Update status from draft to publish  |



**Errors:**

| Code | Name                          | Description                    |
|------|-------------------------------|--------------------------------|
| 401  | ValidationError               | error by validation database   |
| 401  | UnAuthorise                   | user not autorised             |
| 400  | CastError / JsonWebTokenError | error about token              |
| 404  | Not found                     | data not found                 |
| 500  | internal server error         | error by server                |

## **Register User**
- **URL:** `/users/register`
- **Method:** `POST`
- **URL Params:** `None` 
- **Data Body:** 
    -`name: user`
    -`email: user@mail.com`
    -`password: 123456`
- **Success Respone:**
    - **Status:**`200`**Content:**
    ```
  {
    "message": "login succesfully",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjVlMjU1MmNkZmM2YjY4NjYyZWM4ZmQwNCIsIm5hbWUiOiJ0aW5hIiwiZW1haWwiOiJ0aW5hQG1haWwuY29tIiwicGFzc3dvcmQiOiIkMmEkMTAkRkVmQVR5RHE2ZWZ0UGRJWDdaNzBHdU9yd2pVdVBUWWZ2Sk1WcnlpWHJYYzNJOUwzdUNsNi4iLCJfX3YiOjB9LCJpYXQiOjE1Nzk1MDQzMzN9.rNL8H5XvdZtGbjcDrYAMzBbjIBwYu5CZS0Pv3HBqivM",
    "user": {
        "email": "user@mail.com",
        "_id": "5e2552cdfc6b68662ec8fd04",
        "name": "user"
    }
}
    ```
- **Error Respone:**
    - **Status:**`500`**Content:**
    ```
        [
            'message' : 'internal server error'
        ]
    ```
    - **Status:**`401`**Content:**
    ```
        [
            'message' : 'Validation Error'
        ]
    ```

## **Login User**
- **URL:** `/users/login`
- **Method:** `POST`
- **URL Params:** `None` 
- **Data Body:** 
    -`email: user@mail.com`
    -`password: 123456`
- **Success Respone:**
    - **Status:**`200`**Content:**
    ```
   {
    "message": "login succesfully",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjVlMjFlYzVkYjk5ZTIyMWE1MTNjNDIxZSIsIm5hbWUiOiJ0ZXN0IiwiZW1haWwiOiJ0ZXN0QG1haWwuY29tIiwicGFzc3dvcmQiOiIkMmEkMTAkZVhBZjZ4TDhvMHlDRkFWa0VDV21MTy5BcU1DY1ZuY1pCSFlsZ0VmempUSEFvS0p3aFg0WGUiLCJfX3YiOjB9LCJpYXQiOjE1Nzk1MDQyOTZ9.-HPvoj-nYjahSYE8qqA1ErHGUlOEQQPjpfLVBby30WM",
    "user": {
        "email": "user@mail.com",
        "_id": "5e21ec5db99e221a513c421e",
        "name": "user"
    }
}
    ```
- **Error Respone:**
    - **Status:**`500`**Content:**
    ```
        [
            'message' : 'internal server error'
        ]
    ```
    - **Status:**`404`**Content:**
    ```
        [
            'message' : 'not found'
        ]
    ```

## **Google Login User**
- **URL:** `/users/login-google`
- **Method:** `POST`
- **URL Params:** `None` 
- **Headers:** 
    -`id_token: ( token from google )`
- **Data Body:** `None`
- **Success Respone:**
    - **Status:**`200`**Content:**
    ```
    {
    "message": "login succes",
    "token": "OiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVkZmY3MjI4Y2M4ZjVmMTZhODE4ODMyMyIsImlhdCI6MTU3ODg1NzEwOX0.J0fUBa7Om--sn88jbfF-KaBOob-mWnR90z7PyKRPDmw",
    "user": {
        "email": "user@mail.com",
        "_id": "5dff7228cc8f5f16a8188323"
        }
    }
    ```
- **Error Respone:**
    - **Status:**`500`**Content:**
    ```
        [
            'message' : 'internal server error'
        ]
    ```
    - **Status:**`400`**Content:**
    ```
        [
            'message' : 'invalid Token'
        ]
    ```

## **Find All Article**
- **URL:** `/articles`
- **Method:** `GET`
- **URL Params:** `None` 
- **Headers:** 
    -`token: ( token id  )`
- **Data Body:** `None`
- **Success Respone:**
    - **Status:**`200`**Content:**
    ```
        [
            {
                "star": false,
                "image": "https://storage.googleapis.com/azputraupload/1579487171533-1574936248_5ddf9eb801462.jpg",
                "tags": [],
                "_id": "5e250fc44513eb44ace13e77",
                "title": "test",
                "content": "<p>test222222222<u>222222222222222</u><strong><u>22222222222222</u></strong></p>",
                "author": {
                    "_id": "5e21ec5db99e221a513c421e",
                    "name": "test",
                    "email": "test@mail.com",
                    "password": "$2a$10$eXAf6xL8o0yCFAVkECWmLO.AqMCcVncZBHYlgEfzjTHAoKJwhX4Xe",
                    "__v": 0
                },
                "createdAt": "2020-01-20T02:26:12.759Z",
                "updatedAt": "2020-01-20T02:26:12.759Z",
                "__v": 0
            },
            {
                "star": false,
                "image": "null",
                "tags": [
                    "aa",
                    "bb",
                    "cc"
                ],
                "_id": "5e251a0ee59e6849ff34d4de",
                "title": "test",
                "content": "<p>testtttt</p>",
                "author": {
                    "_id": "5e21ec5db99e221a513c421e",
                    "name": "test",
                    "email": "test@mail.com",
                    "password": "$2a$10$eXAf6xL8o0yCFAVkECWmLO.AqMCcVncZBHYlgEfzjTHAoKJwhX4Xe",
                    "__v": 0
                },
                "createdAt": "2020-01-20T03:10:06.500Z",
                "updatedAt": "2020-01-20T03:10:06.500Z",
                "__v": 0
            }
        ]
    ```
- **Error Respone:**
    - **Status:**`500`**Content:**
    ```
        [
            'message' : 'internal server error'
        ]
    ```
    - **Status:**`400`**Content:**
    ```
        [
            'message' : 'invalid Token'
        ]
    ```

## **Create Article**
- **URL:** `/articles`
- **Method:** `POST`
- **URL Params:** `None` 
- **Headers:** 
    -`token: ( token id  )`
- **Data Body:** 
    -`title: test`
    -`content: test content`
    -`description: test description`
    -`image:`**file**
    -`tags:tag1,tag2`
- **Success Respone:**
    - **Status:**`200`**Content:**
    ```
       {
            "star": false,
            "image": "",
            "tags": [
                "tag1",
                "tag2"
            ],
            "_id": "5e255364fc6b68662ec8fd05",
            "title": "test",
            "content": "test content",
            "author": "5e21ec5db99e221a513c421e",
            "createdAt": "2020-01-20T07:14:44.930Z",
            "updatedAt": "2020-01-20T07:14:44.930Z",
            "__v": 0
        }
    ```
- **Error Respone:**
    - **Status:**`500`**Content:**
    ```
        [
            'message' : 'internal server error'
        ]
    ```
    - **Status:**`400`**Content:**
    ```
        [
            'message' : 'invalid Token'
        ]
    ```

    ## **Delete Article**
- **URL:** `/articles`
- **Method:** `DELETE`
- **URL Params:** `id` **id of article** 
- **Headers:** 
    -`token: ( token id  )`
- **Data Body:** `None`
- **Success Respone:**
    - **Status:**`200`**Content:**
    ```
        {
            "n": 1,
            "ok": 1,
            "deletedCount": 1
        }
    ```
- **Error Respone:**
    - **Status:**`500`**Content:**
    ```
        [
            'message' : 'internal server error'
        ]
    ```
    - **Status:**`400`**Content:**
    ```
        [
            'message' : 'invalid Token'
        ]
    ```
