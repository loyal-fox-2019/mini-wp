# mini-wp
---
### Link Deploy
#### http://miniwp-h8.s3-website-ap-southeast-1.amazonaws.com/

**BASE URL**
> http://localhost:3000

router.use('/', userRoutes)
router.use('/imageResult', imageResultRoutes)
router.use('/trippy', authenticate, trippyRoutes)

**END POINTS**

No  | Route               | HTTP   | Authentication | Authorization
----|---------------------|--------|----------------|---------------
 1  | /register           | POST   | No             | No
 2  | /login              | POST   | No             | No
 3  | /articles           | POST   | Yes            | No
 4  | /articles           | GET    | Yes            | No
 5  | /articles/:id       | GET    | Yes            | No
 6  | /articles/:id       | PUT    | Yes            | Yes
 7  | /articles/:id       | DELETE | Yes            | Yes

---
### 1. POST /register
  > Add new user to users collections and returns JSON of token

* **URL**

  /register

* **Method:**

  `POST`

* **Data Params**
  name: [string] <_required_>
  email: [string] <_required_>
  password: [string] <_required_>

* **Success Response:**

  * **Code:** 201 CREATED
    **Content:** 
    ```javascript
    {
      "name": "jane doe",
      "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6InRoaXMgdG9rZW4gaXMgZm9yIGFwaSBkb2N1bWVudCBvbmx5IiwiaWF0IjoxNTE2MjM5MDIyfQ.X5ErI_61TUnECess_qkg5T7fHZ8J547E20ftQY7qfsc"
    }
    ```
 
* **Error Response:**

  * **Code:** 400 BAD REQUEST
    **Content:** 
    ```javascript
    {
      "code": 400,
      "message": [
          "Name cannot be empty",
          "Email cannot be empty",
          "Email already registered",
          "Password cannot be empty"
      ]
    }
    ```

* **Sample Call:**

  ```javascript
    axios({
      url: "/register",
      type : "POST",
      data: {
        name: "jane doe",
        email: 'janedoe@mail.com',
        password: '123456'
      }
    })
      .then(result => {
        console.log(result)
      })
      .catch(error => {
        console.log(error)
      })
  ```

### 2. POST /login
  > Check users collections and returns JSON of token when user found

* **URL**

  /login

* **Method:**

  `POST`

* **Data Params**
  email: [string] <_required_>
  password: [string] <_required_>

* **Success Response:**

  * **Code:** 200 OK
    **Content:** 
    ```javascript
    {
      "name": "jane doe",
      "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6InRoaXMgdG9rZW4gaXMgZm9yIGFwaSBkb2N1bWVudCBvbmx5IiwiaWF0IjoxNTE2MjM5MDIyfQ.X5ErI_61TUnECess_qkg5T7fHZ8J547E20ftQY7qfsc"
    }
    ```
 
* **Error Response:**

  * **Code:** 404 NOT FOUND
    **Content:** 
    ```javascript
    {
      {
          "code": 404,
          "message": "Invalid Email or Password"
      }
    }
    ```

* **Sample Call:**

  ```javascript
    axios({
      url: "/login",
      type : "POST",
      data: {
        email: 'janedoe@mail.com',
        password: '123456'
      }
    })
      .then(result => {
        console.log(result)
      })
      .catch(error => {
        console.log(error)
      })
  ```

### 3. POST /articles/
  > Create articles with authenticated user as its owner and returns JSON of articles

* **URL**

  /articles

* **Method:**

  `POST`

* **Data Params**

  image: [string] 
  title: [String] <_required_>
  content: [String] <_required_>
  tags: [array]

  
* **Header Params**

  token: [String] <_required_>

* **Success Response:**

  * **Code:** 201 SUCCESS
    **Content:** 
    ```javascript
    {
      "image": "https://storage.googleapis.com/mini-wp-images-h8/1579434387519-eberhard-grossgasteiger-9wwF-VmSOrY-unsplash (1).jpg",
      "_id": "5e1a8d3c0f3b5b11115f2247",
      "title": "New Article",
      "content": "This is the content of new article",
      "author": "5e19dd336927961133d5e199",
      "createdAt": "2020-01-12T03:06:36.442Z",
      "updatedAt": "2020-01-12T03:06:36.442Z",
      "__v": 0
    }
    ```
 
* **Error Response:**

  * **Code:** 400 BAD REQUEST
    **Content:** 
    ```javascript
    {
      "code": 400,
      "message": [
        "Title cannot be empty",
        "Content cannot be empty"
      ]
    }
    ```
  * **Code:** 401 UNAUTHORIZED
    **Content:** 
    ```javascript
    {
      "code": 401,
      "message": "You must login to do that!"
    }
    ```

* **Sample Call:**

  ```javascript
    axios({
      url: "/articles/",
      type : "POST",
      data: formData,
      headers: {
        "Content-Type": "multipart/form-data",
        token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6InRoaXMgdG9rZW4gaXMgZm9yIGFwaSBkb2N1bWVudCBvbmx5IiwiaWF0IjoxNTE2MjM5MDIyfQ.X5ErI_61TUnECess_qkg5T7fHZ8J547E20ftQY7qfsc"
      }
    })
      .then(result => {
        console.log(result)
      })
      .catch(error => {
        console.log(error)
      })
  ```

### 4. GET /articles/
  > Get all articles with authenticated user as its owner and returns JSON of articles

* **URL**

  /articles/

* **Method:**

  `GET`
  
* **Header Params**

  token: [String] <_required_>

* **Success Response:**

  * **Code:** 200 OK
    **Content:** 
    ```javascript
    [
      {
        "image": "https://storage.googleapis.com/mini-wp-images-h8/1579434387519-eberhard-grossgasteiger-9wwF-VmSOrY-unsplash (1).jpg",
        "_id": "5e1a8d3c0f3b5b11115f2247",
        "title": "New Article",
        "content": "This is the content of new article",
        "author": "5e19dd336927961133d5e199",
        "createdAt": "2020-01-12T03:06:36.442Z",
        "updatedAt": "2020-01-12T03:06:36.442Z",
        "__v": 0
      },
      {
        "image": "https://storage.googleapis.com/mini-wp-images-h8/1579434387519-eberhard-grossgasteiger-9wwF-VmSOrY-unsplash (1).jpg",
        "_id": "5e1a8d3c0f3b5b11115f2247",
        "title": "Second Article",
        "content": "This is the content of second article",
        "author": "5e19dd336927961133d5e199",
        "createdAt": "2020-01-12T03:06:36.442Z",
        "updatedAt": "2020-01-12T03:06:36.442Z",
        "__v": 0
      }
    ]
    ```
 
* **Error Response:**

  * **Code:** 401 UNAUTHORIZED
    **Content:** 
    ```javascript
    {
      "code": 401,
      "message": "You must login to do that!"
    }
    ```

* **Sample Call:**

  ```javascript
    axios({
      url: "/articles/",
      type : "GET",
      headers: {
        token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6InRoaXMgdG9rZW4gaXMgZm9yIGFwaSBkb2N1bWVudCBvbmx5IiwiaWF0IjoxNTE2MjM5MDIyfQ.X5ErI_61TUnECess_qkg5T7fHZ8J547E20ftQY7qfsc"
      }
    })
      .then(result => {
        console.log(result)
      })
      .catch(error => {
        console.log(error)
      })
  ```

### 5. GET /articles/:id
  > Get specific article based on its id with authenticated user as its owner and returns JSON of article

* **URL**

  /articles/:id

* **Method:**

  `GET`
  
* **Header Params**

  token: [String] <_required_>

* **Success Response:**

  * **Code:** 200 OK
    **Content:** 
    ```javascript
    {
      "image": "https://storage.googleapis.com/mini-wp-images-h8/1579434387519-eberhard-grossgasteiger-9wwF-VmSOrY-unsplash (1).jpg",
      "_id": "5e1a8d3c0f3b5b11115f2247",
      "title": "New Article",
      "content": "This is the content of new article",
      "author": "5e19dd336927961133d5e199",
      "createdAt": "2020-01-12T03:06:36.442Z",
      "updatedAt": "2020-01-12T03:06:36.442Z",
      "__v": 0
    }
    ```
 
* **Error Response:**

  * **Code:** 404 NOT FOUND
    **Content:** 
    ```javascript
    {
      "code": 404,
      "message": "Article is not found!"
    }
    ```

  * **Code:** 401 UNAUTHORIZED
    **Content:** 
    ```javascript
    {
      "code": 401,
      "message": "You must login to do that!"
    }
    ```

* **Sample Call:**

  ```javascript
    axios({
      url: "/articles/5e1a8933ddb1770f66621997",
      type : "GET",
      headers: {
        token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6InRoaXMgdG9rZW4gaXMgZm9yIGFwaSBkb2N1bWVudCBvbmx5IiwiaWF0IjoxNTE2MjM5MDIyfQ.X5ErI_61TUnECess_qkg5T7fHZ8J547E20ftQY7qfsc"
      }
    })
      .then(result => {
        console.log(result)
      })
      .catch(error => {
        console.log(error)
      })
  ```

### 6. PUT /articles/:id
  > Update specific article  based on its id with authenticated user as its owner and returns JSON of article

* **URL**

  /articles/:id

* **Method:**

  `PUT`

* **Data Params:**
  iimage: [string] 
  title: [String] <_required_>
  content: [String] <_required_>
  tags: [array]

* **Header Params**
  Content-Type: <_required_>
  token: [String] <_required_>

* **Success Response:**

  * **Code:** 200 OK
    **Content:** 
    ```javascript
    {
      "image": "https://storage.googleapis.com/mini-wp-images-h8/1579434387519-eberhard-grossgasteiger-9wwF-VmSOrY-unsplash (1).jpg",
      "_id": "5e1a8d3c0f3b5b11115f2247",
      "title": "Second Article",
      "content": "This is the content of second article",
      "author": "5e19dd336927961133d5e199",
      "createdAt": "2020-01-12T03:06:36.442Z",
      "updatedAt": "2020-01-12T03:06:36.442Z",
      "__v": 0
    }
    ```
 
* **Error Response:**

  * **Code:** 404 NOT FOUND
    **Content:** 
    ```javascript
    {
      "code": 404,
      "message": "Article is not found!"
    }
    ```

  * **Code:** 401 UNAUTHORIZED
    **Content:** 
    ```javascript
    {
      "code": 401,
      "message": "You must login to do that!"
    }
    ```

* **Sample Call:**

  ```javascript
    axios({
      url: "/articles/5e1a8933ddb1770f66621997",
      type : "GET",
      headers: {
        "Content-Type": "multipart/form-data",
        token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6InRoaXMgdG9rZW4gaXMgZm9yIGFwaSBkb2N1bWVudCBvbmx5IiwiaWF0IjoxNTE2MjM5MDIyfQ.X5ErI_61TUnECess_qkg5T7fHZ8J547E20ftQY7qfsc"
      }
    })
      .then(result => {
        console.log(result)
      })
      .catch(error => {
        console.log(error)
      })
  ```

### 8. DELETE /articles/:id
  > Delete specific articles and returns JSON of recently deleted articles

* **URL**

  /articles/:id

* **Method:**

  `DELETE`
  
* **Header Params**

  token: [String] <_required_>

* **Success Response:**

  * **Code:** 200 OK
    **Content:** 
    ```javascript
    {
      "image": "https://storage.googleapis.com/mini-wp-images-h8/1579434387519-eberhard-grossgasteiger-9wwF-VmSOrY-unsplash (1).jpg",
      "_id": "5e1a8d3c0f3b5b11115f2247",
      "title": "Deleted Article",
      "content": "This is the content of deleted article",
      "author": "5e19dd336927961133d5e199",
      "createdAt": "2020-01-12T03:06:36.442Z",
      "updatedAt": "2020-01-12T03:06:36.442Z",
      "__v": 0
    }
    ```
 
* **Error Response:**

  * **Code:** 401 UNAUTHORIZED
    **Content:** 
    ```javascript
    {
      "code": 401,
      "message": "You must login to do that!"
    }
    ```

* **Sample Call:**

  ```javascript
    axios({
      url: "/articles/5e1a8933ddb1770f66621997",
      type : "DELETE",
      headers: {
        token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6InRoaXMgdG9rZW4gaXMgZm9yIGFwaSBkb2N1bWVudCBvbmx5IiwiaWF0IjoxNTE2MjM5MDIyfQ.X5ErI_61TUnECess_qkg5T7fHZ8J547E20ftQY7qfsc"
      }
    })
      .then(result => {
        console.log(result)
      })
      .catch(error => {
        console.log(error)
      })
  ```