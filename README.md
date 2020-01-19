# mini-wp

### Web : http://miniwp.kennys.my.id/

## Routes

### API Access

`API URL: http://35.240.160.186:3000`

---
## User

### Register User

* **Route**

    `POST /user/register`

* **Data body**

    - `name: { type: String, required: true }`
    - `email: { type: String, required: true, unique: true }`
    - `password: { type: String, required: true, minlength: 8 }`

* **Response**

    ```
    {
        token: "..."
    }
    ```

### Login User

* **Route**

    `POST /user/login`

* **Data body**

    - `email: { type: String, required: true, unique: true }`
    - `password: { type: String, required: true, minlength: 8 }`

* **Response**

    ```
    {
        token: "..."
    }
    ```

### Google Login User

* **Route**

    `POST /user/glogin/:id_token`

* **Response**

    ```
    {
        token: "..."
    }
    ```
---
## Articles

### Get Logged In User's Articles

* **Route**

    `GET /articles`

* **Data headers**

    ```
    {
        token: "..."
    }
    ```

* **Response**

    ```
    [
        {
            _id: "...",
            title: "...",
            content: "...",
            created_at: "...",
            picture: "...",
            userId: "..."
        }
    ]
    ```

### Get Article From Article's _id

* **Route**

    `GET /articles/:id`

* **Data headers**

    ```
    {
        token: "..."
    }
    ```

* **Response**

    ```
    {
        _id: "...",
        title: "...",
        content: "...",
        created_at: "...",
        picture: "...",
        userId: "..."
    }
    ```

### Create Article

* **Route**

    `POST /articles`

* **Data headers**

    ```
    {
        Content-Type: 'multipart/form-data'
        token: "..."
    }
    ```
* **Data body**

    - `title: { type: String }`
    - `content: { type: String }`
    - `picture: { file }`

* **Response**

    ```
    {
        _id: "...",
        title: "...",
        content: "...",
        created_at: "...",
        picture: "...",
        userId: "..."
    }
    ```

### Update Article

* **Route**

    `PATCH /articles/:id`

* **Data headers**

    ```
    {
        Content-Type: 'multipart/form-data'
        token: "..."
    }
    ```
* **Data body**

    - `title: { type: String }`
    - `content: { type: String }`
    - `picture: { file }`


### Delete Article

* **Route**

    `DELETE /articles/:id`

* **Data headers**

    ```
    {
        token: "..."
    }
    ```

* **Response**

    ```
    {
        _id: "...",
        title: "...",
        content: "...",
        created_at: "...",
        picture: "...",
        userId: "..."
    }
    ```