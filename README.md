# mini-wp

**Article: Create**
----
  Create article in mini-wp app.

* **URL**

  /article

* **Method:**

  `POST`
  
*  **URL Params**

   **Required:**
 
   None

* **Data Params**

   title: [String],
   content: [String]

* **Success Response:**

  * **Code:** 201 <br />
    **Content:** <br />`{
    "article": {
        "created_At": "2020-01-14T07:35:16.671Z",
        "_id": "5e1d6fd677689e1e3736dbe8",
        "title": "Article1",
        "content": "phase-2 week-2 vue.js",
        "__v": 0
    }
    }`
 
* **Error Response:**

  * **Code:** 404 <br />
    **Content:** `{
}`

**Article: Find**
----
  Find all articles in mini-wp app.

* **URL**

  /article

* **Method:**

  `GET`
  
*  **URL Params**

   **Required:**
 
   None

* **Data Params**

   None

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** <br />`{
        [
            {
                "created_At": "2020-01-14T07:35:16.671Z",
                "_id": "5e1d6fd677689e1e3736dbe8",
                "title": "Article1",
                "content": "phase-2 week-2 vue.js",
                "__v": 0
            }
        ]
    }`
 
* **Error Response:**

  * **Code:** 404 <br />
    **Content:** `{
}`

**Article: FindOne**
----
  Find one article in mini-wp app.

* **URL**

  /article

* **Method:**

  `GET`
  
*  **URL Params**

   **Required:**
 
   id: [String]

* **Data Params**

   None

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** <br />`{
        {
            "created_At": "2020-01-14T09:17:13.435Z",
            "_id": "5e1d8e4411d1cf3f43f3936d",
            "title": "Vue-8",
            "content": "Not yet done",
            "__v": 0
        }
    }`
 
* **Error Response:**

  * **Code:** 404 <br />
    **Content:** `{
}`
