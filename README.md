# mini-wp

<!-- link deploy -->

---

**Create a User**

- **URL**
  <_/users/register_>

- **Method:**
  `POST`

- **URL Params** <br />
  `None`

- **Data Params**
  **Required:**

  `name=[string]` <br />
  `email=[string]` <br />
  `password=[string]`

  **Optional:**
  `image=[string]`
  
- **Sample Request:**
```javascript
    axios({
        "method": "POST",
        "url": "http://{HOST}.com/users/register",
        "data": {
            "name": "John Doe",
            "email": "john@mail.com",
            "password": "PASSWORD"
        }
    })
```

- **Success Response:**
  - **Code:** 201 <br />
    **Content:**
    ```javascript
        {
            "_id": "5e1d913661b76e27891d5170",
            "name": "John Doe",
            "email": "john@mail.com",
            "image": "https://ui-avatars.com/api/?name=John Doe&size=512",
            "createdAt": "2020-01-14T10:00:22.669Z",
            "updatedAt": "2020-01-14T10:00:22.669Z"
        }
    ```

- **Error Response:**
  - **Code:** 400 Bad Request <br />
    **Content:** `{ error : "This email john@mail.com has already been used!" }`
  - **Code:** 500 Internal Server Error <br />
    **Content:** `{ error : "" }`

---

**Log In**

- **URL**
  <_/users/login_>

- **Method:**
  `POST`

- **URL Params** <br />
  `None`

- **Data Params**
  **Required:**

  `email=[string]` <br />
  `password=[string]`

- **Sample Request:**

  ```javascript
      axios({
          "method": "POST",
          "url": "http://{HOST}.com/users/login",
          "data": {
              "email": "jane@mail.com",
              "password": "PASSWORD"
          }
      })
  ```

- **Success Response:**
  - **Code:** 200 <br />
    **Content:**
    ```javascript
    {
        "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVlMWQ5MWE3NjFiNzZlMjc4OTFkNTE3MSIsImVtYWlsIjoiamFuZUBtYWlsLmNvbSIsImlhdCI6MTU3ODk5NjE0NCwiZXhwIjoxNTc4OTk5NzQ0fQ.mc6_-Bq1JK2j7S7bDk0HDleJ9bzwT-sZhbAdy2q-uyU"
    }
    ```

- **Error Response:**
  - **Code:** 400 Bad Request <br />
    **Content:** `{ error : "Email and/or password incorrect" }`
  - **Code:** 500 Internal Server Error <br />
    **Content:** `{ error : error }`

---

**Find user by ID**

- **URL**
  <_/users/{ID}_>

- **Method:**
  `GET`

- **URL Params** <br />
  `email=[string]`

- **Request Headers** <br />
  **Required:**
  `access_token=[string]`

- **Data Params** <br />
  `None`

- **Sample Request:**
  ```javascript
      axios({
          "method": "GET",
          "url": "http://{HOST}.com/users/5e186c14af790e1a58535cdd",
          "headers": {
              "access_token": "YOUR_ACCESS_TOKEN"
          }
      })
  ```

- **Success Response:**
  - **Code:** 200 <br />
    **Content:**
    ```javascript
    {
        "_id": "5e15fe2ed406f210996d4f6a",
        "name": "John Doe",
        "email": "john@mail.com",
        "image": "http://s3-eu-west-1.amazonaws.com/diy-magazine//diy/Artists/G/Girl-In-red/Girl-in-Red_-by-Chris-Almeida-1.png",
        "createdAt": "2020-01-08T16:07:10.388Z",
        "updatedAt": "2020-01-08T16:07:10.388Z"
    }
    ```

- **Error Response:**
  - **Code:** 400 Bad Request <br />
    **Content:** `{ error : "Invalid Access" }`
  - **Code:** 401 Unauthorized <br />
    **Content:** `{ error : "You must log in first" }`
  - **Code:** 404 Not Found <br />
    **Content:** `{ error : "User not found" }`
  - **Code:** 500 Internal Server Error <br />
    **Content:** `{ error : error }`

---

**Get all articles in database**

- **URL**
  <_/articles_>

- **Method:**
  `GET`

- **URL Params** <br />
  `None`

- **Request Headers** <br />
  **Required:**
  `access_token=[string]`

- **Data Params** <br />
  `None`

- **Sample Request:**
```javascript
    axios({
        "method": "GET",
        "url": "http://{HOST}.com/articles",
        "headers": {
            "access_token": "YOUR_ACCESS_TOKEN"
        }
    })
```

- **Success Response:**

  - **Code:** 200 <br />
    **Content:**
    ```javascript
    [
        {
            "image": "https://lp-cms-production.imgix.net/2019-06/GettyImages-149353949_high.jpg?fit=crop&q=40&sharp=10&vib=20&auto=format&ixlib=react-8.6.4",
            "tags": [],
            "likes": [],
            "comments": [],
            "_id": "5e1d9dcd6eb4423d8a9f8c39",
            "title": "My Trip to Himachal Pradesh",
            "content": "Life has several moments of impact in stock. The last and the most tremendous of all those moments are considerably our last one. I would beg to differ. A recent study shows that the human brain remains active for seven minutes after the heart stops, going through its most precious keepsake: the memory bag.\n\nTHAT for me will be seven minutes filled with impacts. That is what I decided I would live my life for, collecting as many memories, as many moments, as many feelings in as many places as I possibly can, all for those last seven minutes.",
            "author": {
                "_id": "5e1d913661b76e27891d5170",
                "name": "John Doe",
                "email": "john@mail.com",
                "image": "https://ui-avatars.com/api/?name=John Doe&size=512"
            },
            "createdAt": "2020-01-14T10:54:05.444Z",
            "updatedAt": "2020-01-14T10:54:05.444Z"
        },
        {
            "image": "https://japanstartshere.com/wp-content/uploads/2019/09/Okinawa-Japan-Day-Trip.jpg",
            "tags": [],
            "likes": [],
            "comments": [],
            "_id": "5e1d9e716eb4423d8a9f8c3a",
            "title": "Summer in Osaka",
            "content": "Osaka can be a neon nightmare on a hot, sunny day—and sometimes the last thing you want is to find yourself on packed, sweaty city streets. Luckily the hub has plenty of stunning spots you can escape to, from beaches to forest-covered mountains, all within perfect reach of the day-tripper. There are waterfall hikes, canalside towns and abandoned railway tracks that all deserve a visit, so grab your supplies and get exploring on these summer day trips from Osaka.",
            "author": {
                "_id": "5e1d913661b76e27891d5170",
                "name": "John Doe",
                "email": "john@mail.com",
                "image": "https://ui-avatars.com/api/?name=John Doe&size=512"
            },
            "createdAt": "2020-01-14T10:56:49.911Z",
            "updatedAt": "2020-01-14T10:56:49.911Z"
        }
    ]
    ```

- **Error Response:**
  - **Code:** 401 Unauthorized <br />
    **Content:** `{ error : "You must log in first" }`
  - **Code:** 500 Internal Server Error <br />
    **Content:** `{ error : error }`

---

**Get all logged in user's articles**

- **URL**
  <_/articles/all/own_>

- **Method:**
  `GET`

- **URL Params** <br />
  `None`

- **Request Headers** <br />
  **Required:**
  `access_token=[string]`

- **Data Params** <br />
  `None`

- **Sample Request:**
```javascript
    axios({
        "method": "GET",
        "url": "http://{HOST}.com/articles/all/own",
        "headers": {
            "access_token": "YOUR_ACCESS_TOKEN"
        }
    })
```

- **Success Response:**

  - **Code:** 200 <br />
    **Content:**
    ```javascript
    [
        {
            "image": "https://japanstartshere.com/wp-content/uploads/2019/09/Okinawa-Japan-Day-Trip.jpg",
            "tags": [],
            "likes": [],
            "comments": [],
            "_id": "5e1d9e716eb4423d8a9f8c3a",
            "title": "Summer in Osaka",
            "content": "Osaka can be a neon nightmare on a hot, sunny day—and sometimes the last thing you want is to find yourself on packed, sweaty city streets. Luckily the hub has plenty of stunning spots you can escape to, from beaches to forest-covered mountains, all within perfect reach of the day-tripper. There are waterfall hikes, canalside towns and abandoned railway tracks that all deserve a visit, so grab your supplies and get exploring on these summer day trips from Osaka.",
            "author": {
                "_id": "5e1d913661b76e27891d5170",
                "name": "John Doe",
                "email": "john@mail.com",
                "image": "https://ui-avatars.com/api/?name=John Doe&size=512"
            },
            "createdAt": "2020-01-14T10:56:49.911Z",
            "updatedAt": "2020-01-14T10:56:49.911Z"
        }
    ]
    ```

- **Error Response:**
  - **Code:** 401 Unauthorized <br />
    **Content:** `{ error : "You must log in first" }`
  - **Code:** 500 Internal Server Error <br />
    **Content:** `{ error : error }`

---

**Get an article**

- **URL**
  <_/articles/{id}_>

- **Method:**
  `GET`

- **URL Params** <br />
  `id=[string]`

- **Request Headers** <br />
  **Required:**
  `access_token=[string]`

- **Data Params** <br />
  `None`

- **Sample Request:**
```javascript
    axios({
        "method": "GET",
        "url": "http://{HOST}.com/articles/5e1d9e716eb4423d8a9f8c3a",
        "headers": {
            "access_token": "YOUR_ACCESS_TOKEN"
        }
    })
```

- **Success Response:**

  - **Code:** 200 <br />
    **Content:**
    ```javascript
    [
        {
            "image": "https://japanstartshere.com/wp-content/uploads/2019/09/Okinawa-Japan-Day-Trip.jpg",
            "tags": [],
            "likes": [],
            "comments": [],
            "_id": "5e1d9e716eb4423d8a9f8c3a",
            "title": "Summer in Osaka",
            "content": "Osaka can be a neon nightmare on a hot, sunny day—and sometimes the last thing you want is to find yourself on packed, sweaty city streets. Luckily the hub has plenty of stunning spots you can escape to, from beaches to forest-covered mountains, all within perfect reach of the day-tripper. There are waterfall hikes, canalside towns and abandoned railway tracks that all deserve a visit, so grab your supplies and get exploring on these summer day trips from Osaka.",
            "author": {
                "_id": "5e1d913661b76e27891d5170",
                "name": "John Doe",
                "email": "john@mail.com",
                "image": "https://ui-avatars.com/api/?name=John Doe&size=512"
            },
            "createdAt": "2020-01-14T10:56:49.911Z",
            "updatedAt": "2020-01-14T10:56:49.911Z"
        }
    ]
    ```

- **Error Response:**
  - **Code:** 401 Unauthorized <br />
    **Content:** `{ error : "You must log in first" }`
  - **Code:** 403 Forbidden <br />
    **Content:** `{ error : "Unauthorized process" }`
  - **Code:** 404 Not Found <br />
    **Content:** `{ error : "Article not found" }`
  - **Code:** 500 Internal Server Error <br />
    **Content:** `{ error : error }`

---

**Create an article**

- **URL**
  <_/articles_>

- **Method:**
  `POST`

- **URL Params** <br />
  `access_token=[string]`

- **Request Headers** <br />
  **Required:**
  `access_token=[string]`

- **Data Params**
  **Required:**
  `title=[string]` <br />
  `content=[string]`

  **Optional:**
  `image=[string]` <br />
  `tags=[array of string]`

- **Sample Request:**
```javascript
    axios({
        "method": "POST",
        "url": "http://{HOST}.com/articles",
        "headers": {
            "access_token": "YOUR_ACCESS_TOKEN"
        },
        "data": {
            "title": "My Trip to Himachal Pradesh",
            "content": "Life has several moments of impact in stock. The last and the most tremendous of all those moments are considerably our last one. I would beg to differ. A recent study shows that the human brain remains active for seven minutes after the heart stops, going through its most precious keepsake: the memory bag. THAT for me will be seven minutes filled with impacts. That is what I decided I would live my life for, collecting as many memories, as many moments, as many feelings in as many places as I possibly can, all for those last seven minutes.",
            "image": "https://lp-cms-production.imgix.net/2019-06/GettyImages-149353949_high.jpg?fit=crop&q=40&sharp=10&vib=20&auto=format&ixlib=react-8.6.4"
        }
    })
```
  
- **Success Response:**
  - **Code:** 201 <br />
    **Content:**
    ```javascript
        {
            "image": "https://lp-cms-production.imgix.net/2019-06/GettyImages-149353949_high.jpg?fit=crop&q=40&sharp=10&vib=20&auto=format&ixlib=react-8.6.4",
            "tags": [],
            "likes": [],
            "comments": [],
            "_id": "5e1d9ced6eb4423d8a9f8c38",
            "title": "My Trip to Himachal Pradesh",
            "content": "Life has several moments of impact in stock. The last and the most tremendous of all those moments are considerably our last one. I would beg to differ. A recent study shows that the human brain remains active for seven minutes after the heart stops, going through its most precious keepsake: the memory bag.\n\nTHAT for me will be seven minutes filled with impacts. That is what I decided I would live my life for, collecting as many memories, as many moments, as many feelings in as many places as I possibly can, all for those last seven minutes.",
            "author": "5e1d913661b76e27891d5170",
            "createdAt": "2020-01-14T10:50:21.694Z",
            "updatedAt": "2020-01-14T10:50:21.694Z"
        }
    ```

- **Error Response:**
  - **Code:** 400 Bad Request <br />
    **Content:** `{ error : "Article's name is required" }`
  - **Code:** 403 Forbidden <br />
    **Content:** `{ error : "You must log in first" }`
  - **Code:** 500 Internal Server Error <br />
    **Content:** `{ error : error }`

---

**Filter articles by tag**

- **URL**
  <_/articles/filter/{tag}_>

- **Method:**
  `GET`

- **URL Params** <br />
  `tag=[string]`

- **Request Headers** <br />
  **Required:**
  `access_token=[string]`

- **Data Params** <br />
  `None`

- **Sample Request:**
```javascript
    axios({
        "method": "GET",
        "url": "http://{HOST}.com/articles/filter/travel",
        "headers": {
            "access_token": "YOUR_ACCESS_TOKEN"
        }
    })
```

- **Success Response:**

  - **Code:** 200 <br />
    **Content:**
    ```javascript
    [
        {
            "image": "https://lp-cms-production.imgix.net/2019-06/GettyImages-149353949_high.jpg?fit=crop&q=40&sharp=10&vib=20&auto=format&ixlib=react-8.6.4",
            "tags": ["travel"],
            "likes": [],
            "comments": [],
            "_id": "5e1d9dcd6eb4423d8a9f8c39",
            "title": "My Trip to Himachal Pradesh",
            "content": "Life has several moments of impact in stock. The last and the most tremendous of all those moments are considerably our last one. I would beg to differ. A recent study shows that the human brain remains active for seven minutes after the heart stops, going through its most precious keepsake: the memory bag.\n\nTHAT for me will be seven minutes filled with impacts. That is what I decided I would live my life for, collecting as many memories, as many moments, as many feelings in as many places as I possibly can, all for those last seven minutes.",
            "author": {
                "_id": "5e1d913661b76e27891d5170",
                "name": "John Doe",
                "email": "john@mail.com",
                "image": "https://ui-avatars.com/api/?name=John Doe&size=512"
            },
            "createdAt": "2020-01-14T10:54:05.444Z",
            "updatedAt": "2020-01-14T10:54:05.444Z"
        },
        {
            "image": "https://japanstartshere.com/wp-content/uploads/2019/09/Okinawa-Japan-Day-Trip.jpg",
            "tags": ["travel"],
            "likes": [],
            "comments": [],
            "_id": "5e1d9e716eb4423d8a9f8c3a",
            "title": "Summer in Osaka",
            "content": "Osaka can be a neon nightmare on a hot, sunny day—and sometimes the last thing you want is to find yourself on packed, sweaty city streets. Luckily the hub has plenty of stunning spots you can escape to, from beaches to forest-covered mountains, all within perfect reach of the day-tripper. There are waterfall hikes, canalside towns and abandoned railway tracks that all deserve a visit, so grab your supplies and get exploring on these summer day trips from Osaka.",
            "author": {
                "_id": "5e1d913661b76e27891d5170",
                "name": "John Doe",
                "email": "john@mail.com",
                "image": "https://ui-avatars.com/api/?name=John Doe&size=512"
            },
            "createdAt": "2020-01-14T10:56:49.911Z",
            "updatedAt": "2020-01-14T10:56:49.911Z"
        }
    ]
    ```

- **Error Response:**
  - **Code:** 401 Unauthorized <br />
    **Content:** `{ error : "You must log in first" }`
  - **Code:** 500 Internal Server Error <br />
    **Content:** `{ error : error }`

---

**Search articles by title**

- **URL**
  <_/articles/search/{title}_>

- **Method:**
  `GET`

- **URL Params** <br />
  `title=[string]`

- **Request Headers** <br />
  **Required:**
  `access_token=[string]`

- **Data Params** <br />
  `None`

- **Sample Request:**
```javascript
    axios({
        "method": "GET",
        "url": "http://{HOST}.com/articles/search/sum",
        "headers": {
            "access_token": "YOUR_ACCESS_TOKEN"
        }
    })
```

- **Success Response:**

  - **Code:** 200 <br />
    **Content:**
    ```javascript
    [
        {
            "image": "https://japanstartshere.com/wp-content/uploads/2019/09/Okinawa-Japan-Day-Trip.jpg",
            "tags": ["travel"],
            "likes": [],
            "comments": [],
            "_id": "5e1d9e716eb4423d8a9f8c3a",
            "title": "Summer in Osaka",
            "content": "Osaka can be a neon nightmare on a hot, sunny day—and sometimes the last thing you want is to find yourself on packed, sweaty city streets. Luckily the hub has plenty of stunning spots you can escape to, from beaches to forest-covered mountains, all within perfect reach of the day-tripper. There are waterfall hikes, canalside towns and abandoned railway tracks that all deserve a visit, so grab your supplies and get exploring on these summer day trips from Osaka.",
            "author": {
                "_id": "5e1d913661b76e27891d5170",
                "name": "John Doe",
                "email": "john@mail.com",
                "image": "https://ui-avatars.com/api/?name=John Doe&size=512"
            },
            "createdAt": "2020-01-14T10:56:49.911Z",
            "updatedAt": "2020-01-14T10:56:49.911Z"
        }
    ]
    ```

- **Error Response:**
  - **Code:** 401 Unauthorized <br />
    **Content:** `{ error : "You must log in first" }`
  - **Code:** 500 Internal Server Error <br />
    **Content:** `{ error : error }`

---

**Edit an article**

- **URL**
  <_/articles/{id}_>

- **Method:**
  `PUT`

- **URL Params** <br />
  `id=[string]`

- **Request Headers** <br />
  **Required:**
  `access_token=[string]`

- **Data Params** <br />
  **Optional:**
  `title=[string]` <br />
  `content=[string]` <br />
  `image=[string]` <br />
  `array of strings=[string]` <br />

- **Sample Request:**
```javascript
    axios({
        "method": "PUT",
        "url": "http://{HOST}.com/articles/5e1d9e716eb4423d8a9f8c3a",
        "headers": {
            "access_token": "YOUR_ACCESS_TOKEN"
        },
        "data": {
            "title": "Osaka Trip"
        }
    })
```

- **Success Response:**

  - **Code:** 200 <br />
    **Content:**
    ```javascript
    {
        "image": "https://japanstartshere.com/wp-content/uploads/2019/09/Okinawa-Japan-Day-Trip.jpg",
        "tags": [],
        "likes": [],
        "comments": [],
        "_id": "5e1d9e716eb4423d8a9f8c3a",
        "title": "Osaka Trip",
        "content": "Osaka can be a neon nightmare on a hot, sunny day—and sometimes the last thing you want is to find yourself on packed, sweaty city streets. Luckily the hub has plenty of stunning spots you can escape to, from beaches to forest-covered mountains, all within perfect reach of the day-tripper. There are waterfall hikes, canalside towns and abandoned railway tracks that all deserve a visit, so grab your supplies and get exploring on these summer day trips from Osaka.",
        "author": {
            "_id": "5e1d913661b76e27891d5170",
            "name": "John Doe",
            "email": "john@mail.com",
            "image": "https://ui-avatars.com/api/?name=John Doe&size=512"
        },
        "createdAt": "2020-01-14T10:56:49.911Z",
        "updatedAt": "2020-01-14T10:56:49.911Z"
    }
    ```

- **Error Response:**
  - **Code:** 401 Unauthorized <br />
    **Content:** `{ error : "You must log in first" }`
  - **Code:** 403 Forbidden <br />
    **Content:** `{ error : "Unauthorized process" }`
  - **Code:** 404 Not Found <br />
    **Content:** `{ error : "Article not found" }`
  - **Code:** 500 Internal Server Error <br />
    **Content:** `{ error : error }`

---

**Delete an article**

- **URL**
  <_/articles/{id}_>

- **Method:**
  `DELETE`

- **URL Params** <br />
  `id=[string]`

- **Request Headers** <br />
  **Required:**
  `access_token=[string]`

- **Data Params** <br />
  `None`

- **Sample Request:**
```javascript
    axios({
        "method": "DELETE",
        "url": "http://{HOST}.com/articles/5e1d9e716eb4423d8a9f8c3a",
        "headers": {
            "access_token": "YOUR_ACCESS_TOKEN"
        }
    })
```

- **Success Response:**

  - **Code:** 200 <br />
    **Content:**
    ```javascript
    {
      "Article with ID 5e1d9e716eb4423d8a9f8c3a successfully deleted"
    }
    ```

- **Error Response:**
  - **Code:** 401 Unauthorized <br />
    **Content:** `{ error : "You must log in first" }`
  - **Code:** 403 Forbidden <br />
    **Content:** `{ error : "Unauthorized process" }`
  - **Code:** 404 Not Found <br />
    **Content:** `{ error : "Article not found" }`
  - **Code:** 500 Internal Server Error <br />
    **Content:** `{ error : error }`

---

**Like an article**

- **URL**
  <_/articles/{id}/likes_>

- **Method:**
  `PATCH`

- **URL Params** <br />
  `id=[string]`

- **Request Headers** <br />
  **Required:**
  `access_token=[string]`

- **Data Params** <br />
  `None`

- **Sample Request:**
```javascript
    axios({
        "method": "PATCH",
        "url": "http://{HOST}.com/articles/5e1d9e716eb4423d8a9f8c3a/likes",
        "headers": {
            "access_token": "YOUR_ACCESS_TOKEN"
        }
    })
```

- **Success Response:**

  - **Code:** 200 <br />
    **Content:**
    ```javascript
    {
        "image": "https://japanstartshere.com/wp-content/uploads/2019/09/Okinawa-Japan-Day-Trip.jpg",
        "tags": [],
        "likes": ["5e1d913661b76e27891d5170"],
        "comments": [],
        "_id": "5e1d9e716eb4423d8a9f8c3a",
        "title": "Osaka Trip",
        "content": "Osaka can be a neon nightmare on a hot, sunny day—and sometimes the last thing you want is to find yourself on packed, sweaty city streets. Luckily the hub has plenty of stunning spots you can escape to, from beaches to forest-covered mountains, all within perfect reach of the day-tripper. There are waterfall hikes, canalside towns and abandoned railway tracks that all deserve a visit, so grab your supplies and get exploring on these summer day trips from Osaka.",
        "author": {
            "_id": "5e1d913661b76e27891d5170",
            "name": "John Doe",
            "email": "john@mail.com",
            "image": "https://ui-avatars.com/api/?name=John Doe&size=512"
        },
        "createdAt": "2020-01-14T10:56:49.911Z",
        "updatedAt": "2020-01-14T10:56:49.911Z"
    }
    ```

- **Error Response:**
  - **Code:** 401 Unauthorized <br />
    **Content:** `{ error : "You must log in first" }`
  - **Code:** 404 Not Found <br />
    **Content:** `{ error : "Article not found" }`
  - **Code:** 500 Internal Server Error <br />
    **Content:** `{ error : error }`

---

**Comment an article**

- **URL**
  <_/articles/{id}/comments_>

- **Method:**
  `POST`

- **URL Params** <br />
  `id=[string]`

- **Request Headers** <br />
  **Required:**
  `access_token=[string]`

- **Data Params** <br />
  **Required:**
  `comment=[string]`

- **Sample Request:**
```javascript
    axios({
        "method": "POST",
        "url": "http://{HOST}.com/articles/5e1d9e716eb4423d8a9f8c3a/comments",
        "headers": {
            "access_token": "YOUR_ACCESS_TOKEN"
        },
        "data": {
          "comment": "Nice article!"
        }
    })
```

- **Success Response:**

  - **Code:** 200 <br />
    **Content:**
    ```javascript
    {
        "image": "https://japanstartshere.com/wp-content/uploads/2019/09/Okinawa-Japan-Day-Trip.jpg",
        "tags": [],
        "likes": ["5e1d913661b76e27891d5170"],
        "comments": ["Nice article!"],
        "_id": "5e1d9e716eb4423d8a9f8c3a",
        "title": "Osaka Trip",
        "content": "Osaka can be a neon nightmare on a hot, sunny day—and sometimes the last thing you want is to find yourself on packed, sweaty city streets. Luckily the hub has plenty of stunning spots you can escape to, from beaches to forest-covered mountains, all within perfect reach of the day-tripper. There are waterfall hikes, canalside towns and abandoned railway tracks that all deserve a visit, so grab your supplies and get exploring on these summer day trips from Osaka.",
        "author": {
            "_id": "5e1d913661b76e27891d5170",
            "name": "John Doe",
            "email": "john@mail.com",
            "image": "https://ui-avatars.com/api/?name=John Doe&size=512"
        },
        "createdAt": "2020-01-14T10:56:49.911Z",
        "updatedAt": "2020-01-14T10:56:49.911Z"
    }
    ```

- **Error Response:**
  - **Code:** 401 Unauthorized <br />
    **Content:** `{ error : "You must log in first" }`
  - **Code:** 404 Not Found <br />
    **Content:** `{ error : "Article not found" }`
  - **Code:** 500 Internal Server Error <br />
    **Content:** `{ error : error }`