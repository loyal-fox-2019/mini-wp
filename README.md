# mini-wp

**BASE URL**

```javascript
http://localhost:3000/
```

**DEPLOY**

```tex
wordpress.sukmabrahmantya.com
```



## USER REGISTER

- **URL's**

  ```json
  /users/register
  ```

- **URL Params**

  - Require : `none`
  - Optional : `none`

- **Data Params**

  - Require : `username: [string]` , `email: [string]` , `password: [string]`

- **Headers**

  - Require : `none`

- **HTTP Method**

  `POST`

- **Success Response**

  - Code	: 201 OK

  - Content :

    ```json
    {
        "username": "sukmabrahmantya",
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVlMjMxZjllZTRiZTllMDUzNjZiMTA3YiIsImlhdCI6MTU3OTM2MTAwMH0.GZ-Yr-YHVO-19D_H6V8MZ1FsX1Vhn0-n0BKGJeCXUrs"
    }
    ```

- **Error Response**

  - Validation Username

    - Code	: 400 Bad Request

    - Content :

      ```json
      {
          "message": [
              "Username cannot be empty"
          ]
      }
      ```

  - Validation Password

    - Code	: 400 Bad Request

    - Content :

      ```json
      {
          "message": [
            "Password cannot be empty"
          ]
      }
      ```

  - Validation Email

    - Code	: 400 Bad Request

    - Content :

      ```json
      {
          "message": [
            "Email cannot be empty"
          ]
      }
      ```

  - Validation Unique Email

    - Code	: 400 Bad Request

    - Content :

      ```json
      {
          "message": [
              "Email is already in use"
          ]
      }
      ```

  - Validation Unique Username

    - Code	: 400 Bad Request

    - Content :

      ```json
      {
          "message": [
              "Username is already in use"
          ]
      }
      ```

  - Validation Username, Password, and Email

    - Code	: 400 Bad Request

    - Content :

      ```json
      {
          "message": [
              "Username cannot be empty",
              "Email cannot be empty",
              "Password cannot be empty"
          ]
      }
      ```

  - **Sample Call**

  ```javascript
  
  ```




## USER LOGIN

- **URL's**

  ```json
  /users/login
  ```

- **URL Params**

  - Require : `none`
  - Optional : `none`

- **Data Params**

  - Require : `email: [string]` , `password: [string]`
  - Optional : `none`

- **Headers**

  - Require : `none`

- **HTTP Method**

  `POST`

- **Success Response**

  - Code	: 200 OK

  - Content :

    ```json
    {
        "username": "sukmabrahmantya",
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVlMjMxZjllZTRiZTllMDUzNjZiMTA3YiIsImlhdCI6MTU3OTM2MTAwMH0.GZ-Yr-YHVO-19D_H6V8MZ1FsX1Vhn0-n0BKGJeCXUrs"
    }
    ```

- **Error Response**

  - Validation Email Not Register

    - Code	: 400 Bad Request

    - Content :

      ```json
      {
          "message": "Your email is not registered"
      }
      ```

  - Validation Passwords and Users do not Match

    - Code	: 400 Bad Request

    - Content :

      ```json
      {
          "message": "Your email/password is wrong"
      }
      ```

  - **Sample Call**

  ```javascript
  
  ```




## ARTICLE CREATE

- **URL's**

  ```json
  /articles/
  ```

- **URL Params**

  - Require : `none`
  - Optional : `none`

- **Data Params**

  - Require : `title: [string]` ,   `content: [string]` ,   `featured_image: [string]` ,   `tags: [array]` 

- **Headers**

  - Require : `token: [string]`

- **HTTP Method**

  `POST`

- **Success Response**

  - Code	: 201 Created

  - Content :

    ```json
    {
        "message": "Success to create new article"
    }
    ```

- **Error Response**

  - Validation Title

    - Code	: 400 Bad Request

    - Content :

      ```json
      {
          "message": [
              "Title cannot be empty"
          ]
      }
      ```

  - Validation Content

    - Code	: 400 Bad Request

    - Content :

      ```json
      {
          "message": [
              "Content cannot be empty"
          ]
      }
      ```

  - Validation Title and Content

    - Code	: 400 Bad Request

    - Content :

      ```json
      {
          "message": [
              "Title cannot be empty",
              "Content cannot be empty"
          ]
      }
      ```

  - Authentication User

    - Code	: 401 Unauthorized

    - Content :

      ```json
      {
          "message": "Invalid Access Token"
      }
      ```

- **Sample Call**

  ```javascript
  
  ```



## ARTICLE READ ALL

- **URL's**

  ```json
  /articles/
  ```

- **URL Params**

  - Require : `none`
  - Optional : `none`

- **Data Params**

  - Require : `none`
  - Optional : `none`

- **Headers**

  - Require : `token: [string]`

- **HTTP Method**

  `GET`

- **Success Response**

  - Code	: 200 OK

  - Content :

    ```json
    [
        {
            "tags": [
                "sample",
                "article"
            ],
            "_id": "5e23f7b557b5a442bf5b5771",
            "title": "sukmabrahmantya article2",
            "content": "this is a content sample",
            "featured_image": "http://image.uhuyy.com",
            "author": {
                "_id": "5e231f9ee4be9e05366b107b",
                "username": "sukmabrahmantya",
                "email": "brahmantyasukma@gmail.com",
                "__v": 0
            },
            "createdAt": "2020-01-19T06:31:18.000Z",
            "updatedAt": "2020-01-19T06:31:18.000Z",
            "__v": 0
        },
        {
            "tags": [
                "sample",
                "article"
            ],
            "_id": "5e23f18eed9d0a3ccb9ac746",
            "title": "sukmabrahmantya article",
            "content": "this is a content sample",
            "featured_image": "http://image.uhuyy.com",
            "author": {
                "_id": "5e231f9ee4be9e05366b107b",
                "username": "sukmabrahmantya",
                "email": "brahmantyasukma@gmail.com",
                "__v": 0
            },
            "createdAt": "2020-01-19T06:05:02.214Z",
            "updatedAt": "2020-01-19T06:05:02.214Z",
            "__v": 0
        },
        {
            "tags": [
                "sample",
                "article"
            ],
            "_id": "5e232bf498cb8e10365612cc",
            "title": "brahmantya article",
            "content": "this is a content article",
            "featured_image": "http://image.uhuyy.com",
            "author": {
                "_id": "5e232a453b4acd0f631c052a",
                "username": "brahmantya",
                "email": "brahmantya@gmail.com",
                "__v": 0
            },
            "createdAt": "2020-01-18T16:01:56.151Z",
            "updatedAt": "2020-01-19T06:23:06.437Z",
            "__v": 0
        }
    ]
    ```

- **Error Response**

  - Authentication User

    - Code	: 401 Unauthorized

    - Content :

      ```json
      {
          "message": "Invalid Access Token"
      }
      
      ```

- **Sample Call**

  ```javascript
  
  ```



## ARTICLE READ ONE

- **URL's**

  ```json
  /articles/:id
  
  ```

- **URL Params**

  - Require : `id: [string]`
  - Optional : `none`

- **Data Params**

  - Require : `none`
  - Optional : `none`

- **Headers**

  - Require : `token: [string]`

- **HTTP Method**

  `GET`

- **Success Response**

  - Code	: 200 OK

  - Content :

    ```json
    {
        "tags": [
            "sample",
            "article"
        ],
        "_id": "5e23f7b557b5a442bf5b5771",
        "title": "sukmabrahmantya article2",
        "content": "this is a content sample",
        "featured_image": "http://image.uhuyy.com",
        "author": {
            "_id": "5e231f9ee4be9e05366b107b",
            "username": "sukmabrahmantya",
            "email": "brahmantyasukma@gmail.com",
            "__v": 0
        },
        "createdAt": "2020-01-19T06:31:18.000Z",
        "updatedAt": "2020-01-19T06:31:18.000Z",
        "__v": 0
    }
    
    ```

- **Error Response**

  - Authentication User

    - Code	: 401 Unauthorized

    - Content :

      ```json
      {
          "message": "Invalid Access Token"
      }
      
      ```

- **Sample Call**

  ```javascript
  
  ```



## ARTICLE UPDATE

- **URL's**

  ```json
  /articles/:id
  
  ```

- **URL Params**

  - Require : `id: [string]`
  - Optional : `none`

- **Data Params**

  - Require : `none`
  - Optional :  `title: [string]` ,   `content: [string]` ,   `featured_image: [string]` ,   `tags: [array]` 

- **Headers**

  - Require : `token: [string]`

- **HTTP Method**

  `PUT`

- **Success Response**

  - Code	: 200 OK

  - Content :

    ```json
    {
        "tags": [
            "sample",
            "article"
        ],
        "_id": "5e232bf498cb8e10365612cc",
        "title": "brahmantya article",
        "content": "this is a content article",
        "featured_image": "http://image.uhuyy.com",
        "author": "5e232a453b4acd0f631c052a",
        "createdAt": "2020-01-18T16:01:56.151Z",
        "updatedAt": "2020-01-19T06:23:06.437Z",
        "__v": 0
    }
    
    ```

- **Error Response**

  - Authentication User

    - Code	: 401 Unauthorized

    - Content :

      ```json
      {
          "message": "Invalid Access Token"
      }
      
      ```

  - Authorization User

    - Code	: 401 Unauthorized

    - Content :

      ```json
      {
          "message": "You dont have permission to do action"
      }
      
      ```

- **Sample Call**

  ```javascript
  
  ```



## ARTICLE DELETE

- **URL's**

  ```json
  /articles/:id
  
  ```

- **URL Params**

  - Require : `id: [string]`
  - Optional : `none`

- **Data Params**

  - Require : `none`
  - Optional : `none`

- **Headers**

  - Require : `token: [string]`

- **HTTP Method**

  `DELETE`

- **Success Response**

  - Code	: 200 OK

  - Content :

    ```json
    {
        "message": "Success to delete article"
    }
    
    ```

- **Error Response**

  - Authentication User

    - Code	: 401 Unauthorized

    - Content :

      ```json
      {
          "message": "Invalid Access Token"
      }
      
      ```

  - - Authorization User

      - Code	: 401 Unauthorized

      - Content :

        ```json
        {
            "message": "You dont have permission to do action"
        }
        
        ```

- **Sample Call**

  ```javascript
  
  ```