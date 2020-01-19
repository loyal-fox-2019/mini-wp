### <u>Shema</u>

All API access is over HTTP, and accessed from `http://localhost:8080`.
Deployed link `miniwp.serafimsng.top`.

### <u>Authentication</u>

```
headers: {
  token: UserToken
}
```

# REST API


| Method | URL                          | Headers      | Data                                                                             | Description                                                                                   |
|--------|------------------------------|--------------|----------------------------------------------------------------------------------|-----------------------------------------------------------------------------------------------|
| POST   | /users/register              | None         | username: string<br> email: string<br> password: string                          | Register a new user                                                                           |
| POST   | /users/login                 | None         | email: string<br> password: string                                               | Login an existing user using email                                             |
| POST   | /gsignin            | None         | None                                                                | Login or register using Google OAuth2 service                                                 |
| GET    | /articles                      | token:string | None                                                                             | Get user's personal article                                                                      |
| GET    | /articles/:id            | token:string | None                                                                             | Get specific article                                           |
| POST   | /articles                       | token:string | title:string<br> content:string<br>  picture:string<br> created_date:date<br> author:ObjectId(opt.) | Create a new article |
| PATCH  | /articles/:id                   | token:string | title:string<br> content:string<br>  picture:string<br> |                                   |
| DELETE | /articles/:id                   | token:string | None                                                                             | Delete an articles with the specified id                                                           |


### <u>Register User</u>

*return user name and token*

* **URL**

  /users/register

* **Method**

  `POST`

* **Data params**

  ```
  data: {
   username: string,
   email: email@format.com,
   password: string,
  }
  ```

  

* **Success Response**

    ```
    {
    "token":            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZTI0NmFkYzk4MGY4ODI5NzIwMmZlZjUiLCJ1c2VybmFtZSI6ImlvIiwiZW1haWwiOiJpb0BtYWlsLmNvbSIsImlhdCI6MTU3OTQ0NDk1Nn0.MqJZJvZ4ZfzjkAgQP35gwghodLVgI-4OX2VsN92dCUc",
    "username": "io",
    "email": "io@mail.com"
}
    ```

* **Error Response**

  * Code: 404
    Content:

    ```
    {
        "errors": [
            <Validation error>
        ]
    }
    ```


### <u>Login User</u>

*return user name and token*

* **URL**

  /users/login

* **Method**

  `POST`

* **Data params**

  ```
  data: {
   email: email@format.com,
   password: string,
  }
  ```

* **Data headers**

  ```
  none
  ```

  

* **Success Response**

  * Code: 202
    Content:  

    ```
    {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZTIyZThhZjY2MzhlMjIxNDFjNmY2NTYiLCJ1c2VybmFtZSI6InNlcmEiLCJlbWFpbCI6InNlcmFAbWFpbC5jb20iLCJpYXQiOjE1Nzk0MzExNDF9.qGuqTtpi15tuH0gyM3gtAmd4QURBP5WTcqwe8RHyWxQ",
    "username": "sera",
    "email": "sera@mail.com",
    "picture": "https://storage.googleapis.com/mini-wp-upload/1579346095209-irene-1.jpg"
    }
    ```

* **Error Response**

    ```
    {
        "errors": [
            <Validation error>
        ]
    }
    ```

### <u>Login with Google sign in</u>

*return user name and token*

* **URL**

  /gsignin

* **Method**

  `POST`

* **Data params**

  ```
  none

  ```

* **Data headers**

  ```
  none
  ```

  

* **Success Response**

  * Code: 202
    Content:  

    ```
    {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZTIyZThhZjY2MzhlMjIxNDFjNmY2NTYiLCJ1c2VybmFtZSI6InNlcmEiLCJlbWFpbCI6InNlcmFAbWFpbC5jb20iLCJpYXQiOjE1Nzk0MzExNDF9.qGuqTtpi15tuH0gyM3gtAmd4QURBP5WTcqwe8RHyWxQ",
    "username": "sera",
    "email": "sera@mail.com",
    "picture": "https://storage.googleapis.com/mini-wp-upload/1579346095209-irene-1.jpg"
    }
    ```

* **Error Response**

    ```
    {
        "errors": [
            <Validation error>
        ]
    }
    ```    



### <u>Create article</u>

*return created article's info*

* **URL**

  /articles

* **Method**

  `POST`

* **Data params**


  ```
  data: {
   title: 'How to create API Doc',
   content: 'I have to learn how to make proper api documentation',
   picture: 'img.jpg'
  }
  ```

* **Data headers**

  ```
  {
    token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImVtYWlsQGZvcm1hdC5jb20iLCJfaWQiOiI1ZTE1NTZiYzI2ZDM0MzVmMzA2ZGE2OGEiLCJpYXQiOjE1Nzg0NTgzNzB9.k3UOwIDqkhek-52tcUfNgNGO2Osz3V8qYpfGRDgBDhw"
  }
  ```

  

* **Success Response**

  * Code: 201
    Content:  

    ```
    {
    "_id": "5e2435303d78a61f669eaf7b",
    "title": "hello ",
    "content": "server",
    "created_at": "2020-01-19T10:53:36.659Z",
    "picture": "https://storage.googleapis.com/mini-wp-upload/1579431215663-irene-5.jpeg",
    "author": "5e22e8af6638e22141c6f656"
    }
    ```

* **Error Response**

    ```
    {
        "errors": [
            <Validation error>
        ]
    }
    ```

### <u>Get article</u>

*return  articles list*

* **URL**

  /articles

* **Method**

  `GET`

* **Data params**

  none

* **Data headers**

  ```
  {
    token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImVtYWlsQGZvcm1hdC5jb20iLCJfaWQiOiI1ZTE1NTZiYzI2ZDM0MzVmMzA2ZGE2OGEiLCJpYXQiOjE1Nzg0NTgzNzB9.k3UOwIDqkhek-52tcUfNgNGO2Osz3V8qYpfGRDgBDhw"
  }
  ```

  

* **Success Response**

  * Code: 202
    Content:  

    ```
    [
        {
            
            "_id": "5e22e9116638e22141c6f658",
            "title": "red",
            "content": "velvet",
            "created_at": null,
            "picture": "https://storage.googleapis.com/mini-wp-upload/1579431598317-irene-3.jpg",
            "author": {
                "_id": "5e22e8af6638e22141c6f656",
                "username": "sera",
                "email": "sera@mail.com",
                "picture": "https://storage.googleapis.com/mini-wp-upload/1579346095209-irene-1.jpg",
                "__v": 0
            },
            "__v": 0
        }
    ]
    ```

* **Error Response**

    ```
    {
        "errors": [
            <Validation error>
        ]
    }
    

### <u>Delete article</u>

*return delete information*

* **URL**

  /articles/:id

* **Method**

  `DELETE`

* **Data params**

  none

* **Data headers**

  ```
  {
    token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImVtYWlsQGZvcm1hdC5jb20iLCJfaWQiOiI1ZTE1NTZiYzI2ZDM0MzVmMzA2ZGE2OGEiLCJpYXQiOjE1Nzg0NTgzNzB9.k3UOwIDqkhek-52tcUfNgNGO2Osz3V8qYpfGRDgBDhw"
  }
  ```

  

* **Success Response**

  * Code: 200
    Content:  

    ```
    {
        
    "_id": "5e22e8bf6638e22141c6f657",
    "title": "new updated",
    "content": "red velvet",
    "created_at": "2020-01-18T12:00:11.000Z",
    "picture": "https://storage.googleapis.com/mini-wp-upload/1579348811875-irene-3.jpg",
    "author": {
        "_id": "5e22e8af6638e22141c6f656",
        "username": "sera",
        "email": "sera@mail.com",
        "picture": "https://storage.googleapis.com/mini-wp-upload/1579346095209-irene-1.jpg",
        "__v": 0
    }
    }
    ```

* **Error Response**

    ```
    {
        "errors": [
            <Validation error>
        ]
    }
 

### <u>Update article</u>

*return article information*

* **URL**

  /articles/:id

* **Method**

  `PATCH`

* **Data params**


  ```
  data: {
    title: 'new title',
    content: 'new content',
    picture: 'img.jpg',
  }
  ```

* **Data headers**

  ```
  {
    token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImVtYWlsQGZvcm1hdC5jb20iLCJfaWQiOiI1ZTE1NTZiYzI2ZDM0MzVmMzA2ZGE2OGEiLCJpYXQiOjE1Nzg0NTgzNzB9.k3UOwIDqkhek-52tcUfNgNGO2Osz3V8qYpfGRDgBDhw"
  }
  ```

  

* **Success Response**

    ```
    {
       
    "result": {
        "_id": "5e230640d7423b30c76e7b43",
        "title": "red",
        "content": "velvet",
        "created_at": null,
        "picture": "https://storage.googleapis.com/mini-wp-upload/1579431635909-irene-3.jpg",
        "author": {
            "_id": "5e22e8af6638e22141c6f656",
            "username": "sera",
            "email": "sera@mail.com",
            "picture": "https://storage.googleapis.com/mini-wp-upload/1579346095209-irene-1.jpg",
            "__v": 0
        },
        "__v": 0
    }
    }
    ```

* **Error Response**
    ```
    {
        "errors": [
            <Validation error>
        ]
    }
    ```
  