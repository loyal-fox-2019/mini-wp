# mini-wp

# Usage

## First thing to do

Clone this repository to your local computer by using this command

```
git clone https://github.com/harfialpharaby/mini-wp.git
```

## Server side

Go to folder `server` and do all steps below :

1. Type command in terminal

```
npm i
```

2. Make a new file `.env` or rename `.env_template` and add this lines

```
CLIENT_ID=YOUR-CLIENT-ID-FROM-GOOGLE-OAUTH-FOR-localhost:5500
CLIENT_SECRET=YOUR-CLIENT-SECRET-FROM-GOOGLE-OAUTH-FOR-localhost:5500
```

3. You are ready to go, type command in terminal

```
npm run dev
```

## Client side

Go to folder `client` and type command below :
```
parcel index.html
```
Wait until all loadings finishes and open `http://localhost:1234`

# Documentation

## User

### Login

- Route: `/user/login`
- Method: `POST`
- Body: `{username: input_username_or_email, password: input_password}`
- Output:
  - Status: **200**
  ```
  {
      "token": <YOUR TOKEN>
  }
  ```
- Error Handler:
  - Status: **403**
  ```
      {
          "message": "User not registered"
      }
  ```
  - Status: **404**
  ```
      {
          "message": "Incorrect username or password"
      }
  ```

### Register

- Route: `/user/register`
- Method: `POST`
- Body: `{username: input_username, email: input_email, password: input_password}`
- Output:
  - Status: **201**
  ```
  {
      "user": <registered user data, password excluded>,
      "message": "Registration Success"
  }
  ```
- Error Handler:
  - Status: **403**
  ```
      {
          "message": <"Email your@mail.com already exist" | "First_name required" | "Username required" | "Email required" | "Password required">
      }
  ```

## Article

### Get all articles

- Route: `/articles/`
- Method: `GET`
- Headers: `token`
- Output:
  - Status: **200**
  ```
  {
    "articles": [
      {
        "tags": [
          "panjang",
          "article",
          "sejarah",
          "minivipi"
        ],
        "_id": "5e23d8dee54a84330ee565a9",
        "title": "article selanjutnya",
        "content": "ini adalah artikel kedua di website ini",
        "author": "5e23b37520e39b09d0b4355e",
        "featured_image": "https://images.unsplash.com/photo-1472577938094-84871b72ccac?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1352&q=80",
        "status": "draft",
        "slug": "article-selanjutnya",
        "created_at": "2020-01-19T04:19:42.865Z",
        "__v": 0
      }
    ]
  }
  ```
- Error Handler:
  - Status: **400**
  ```
    {
      "message": "Invalid token"
    }
  ```
  - Status: **401**
  ```
    {
      "message": "You are not authorized accessing this data"
    }
  ```
  - Status: **404**
  ```
    {
      "message": "Article not found"
    }
  ```

### Post an article

- Route: `/articles/`
- Method: `POST`
- Headers: `token`
- Body:
  ```
  {
    "tags": ["list", "of", "tags"],
    "title": "title of article",
    "content": "article content",
    "featured_image": "http://imagelink.com/image.jpg",
    "status": "publish" | "draft"
  }
  ```
- Output:
  - Status: **201**
  ```
  {
    "newArticle": {
        "tags": [
            "panjang",
            "article",
            "sejarah",
            "minivipi"
        ],
        "_id": "5e23dffffb553b3b2c9174c8",
        "title": "article selanjutnya",
        "content": "ini adalah artikel kedua di website ini",
        "author": "5e23b37520e39b09d0b4355e",
        "featured_image": "https://images.unsplash.com/photo-1472577938094-84871b72ccac?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1352&q=80",
        "status": "publish",
        "slug": "article-selanjutnya",
        "created_at": "2020-01-19T04:50:07.174Z",
        "__v": 0
    }
  }
  ```
- Error Handler:
  - Status: **400**
  ```
    {
      "message": "Invalid token"
    }
  ```
  - Status: **401**
  ```
    {
      "message": "You are not authorized accessing this data"
    }
  ```
### Get all articles by tag name

- Route: `articles/tags/:tagsName`
- Method: `GET`
- Headers: `token`
- Output:
  - Status: **200**
  ```
  {
    "articles": [
        {
            "tags": [
                "panjang",
                "article",
                "sejarah",
                "minivipi"
            ],
            "_id": "5e23d8dee54a84330ee565a9",
            "title": "article selanjutnya",
            "content": "ini adalah artikel kedua di website ini",
            "author": "5e23b37520e39b09d0b4355e",
            "featured_image": "https://images.unsplash.com/photo-1472577938094-84871b72ccac?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1352&q=80",
            "status": "draft",
            "slug": "article-selanjutnya",
            "created_at": "2020-01-19T04:19:42.865Z",
            "__v": 0
        },
        {
            "tags": [
                "panjang",
                "article",
                "sejarah",
                "minivipi"
            ],
            "_id": "5e23dffffb553b3b2c9174c8",
            "title": "article selanjutnya",
            "content": "ini adalah artikel kedua di website ini",
            "author": "5e23b37520e39b09d0b4355e",
            "featured_image": "https://images.unsplash.com/photo-1472577938094-84871b72ccac?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1352&q=80",
            "status": "publish",
            "slug": "article-selanjutnya",
            "created_at": "2020-01-19T04:50:07.174Z",
            "__v": 0
        }
    ]
  }
  ```
- Error Handler:
  - Status: **400**
  ```
    {
      "message": "Invalid token"
    }
  ```
  - Status: **401**
  ```
    {
      "message": "You are not authorized accessing this data"
    }
  ```
  - Status: **404**
  ```
    {
      "message": "Article not found"
    }
  ```
### Get article by title

- Route: `/articles/title/:title`
- Method: `GET`
- Headers: `token`
- Output:
  - Status: **200**
  ```
  {
    "articles": [
      {
        "tags": [
          "tag",
          "pertama",
          "tanpa gambar"
        ],
        "_id": "5e247252014cbb53a2bdfff4",
        "title": "ini judul publish pertama",
        "content": "<p>ini konten pertama tanpa gambar</p>",
        "author": "5e23b39d20e39b09d0b4355f",
        "featured_image": "",
        "status": "publish",
        "slug": "ini-judul-pertama",
        "created_at": "2020-01-19T15:14:26.306Z",
        "__v": 0
      }
    ]
  }
  ```
- Error Handler:
  - Status: **400**
  ```
    {
      "message": "Invalid token"
    }
  ```
  - Status: **401**
  ```
    {
      "message": "You are not authorized accessing this data"
    }
  ```
  - Status: **404**
  ```
    {
      "message": "Article not found"
    }
  ```

### Get article by article id

- Route: `/articles/:articleId`
- Method: `GET`
- Headers: `token`
- Output:
  - Status: **200**
  ```
  {
    "tags": [
        "panjang",
        "article",
        "sejarah",
        "minivipi"
    ],
    "_id": "5e23d8dee54a84330ee565a9",
    "title": "article selanjutnya",
    "content": "ini adalah artikel kedua di website ini",
    "author": "5e23b37520e39b09d0b4355e",
    "featured_image": "https://images.unsplash.com/photo-1472577938094-84871b72ccac?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1352&q=80",
    "status": "draft",
    "slug": "article-selanjutnya",
    "created_at": "2020-01-19T04:19:42.865Z",
    "__v": 0
  }
  ```
- Error Handler:
  - Status: **400**
  ```
    {
      "message": "Invalid token"
    }
  ```
  - Status: **401**
  ```
    {
      "message": "You are not authorized accessing this data"
    }
  ```
  - Status: **404**
  ```
    {
      "message": "Article not found"
    }
  ```
### Update specific article data by article id

- Route: `/articles/:articleId`
- Method: `PUT`
- Headers: `token`
- Body: `one of options below`
  ```
  {
    "tags": ["list", "of", "tags"],
    "title": "title of article",
    "content": "article content",
    "featured_image": "http://imagelink.com/image.jpg",
    "status": "publish" | "draft"
  }
  ```
- Output:
  - Status: **200**
  ```
  {
    "article": {
        "n": 1,
        "nModified": 1,
        "ok": 1
    }
  }
  ```
- Error Handler:
  - Status: **400**
  ```
    {
      "message": "Invalid token"
    }
  ```
  - Status: **401**
  ```
    {
      "message": "You are not authorized accessing this data"
    }
  ```
  - Status: **404**
  ```
    {
      "message": "Article not found"
    }
  ```
### Update entire article data by article id

- Route: `/articles/:articleId`
- Method: `PATCH`
- Headers: `token`
- Body:
  ```
  {
    "tags": ["list", "of", "tags"],
    "title": "title of article",
    "content": "article content",
    "featured_image": "http://imagelink.com/image.jpg",
    "status": "publish" | "draft"
  }
  ```
- Output:
  - Status: **200**
  ```
  {
    "article": {
        "n": 1,
        "nModified": 1,
        "ok": 1
    }
  }
  ```
- Error Handler:
  - Status: **400**
  ```
    {
      "message": "Invalid token"
    }
  ```
  - Status: **401**
  ```
    {
      "message": "You are not authorized accessing this data"
    }
  ```
  - Status: **404**
  ```
    {
      "message": "Article not found"
    }
  ```
### Delete article by article id

- Route: `/articles/:articleId`
- Method: `DELETE`
- Headers: `token`
- Output:
  - Status: **200**
  ```
  {
    "article": {
        "n": 1,
        "ok": 1,
        "deletedCount": 1
    }
  }
  ```
- Error Handler:
  - Status: **400**
  ```
    {
      "message": "Invalid token"
    }
  ```
  - Status: **401**
  ```
    {
      "message": "You are not authorized accessing this data"
    }
  ```
  - Status: **404**
  ```
    {
      "message": "Article not found"
    }
  ```
### Add tag to an article by article id

- Route: `/articles/:articleId/tag`
- Method: `POST`
- Headers: `token`
- Body: `{tagName: 'new tag'}`
- Output:
  - Status: **200**
  ```
  {
    "n": 1,
    "nModified": 1,
    "ok": 1
  }
  ```
- Error Handler:
  - Status: **400**
  ```
    {
      "message": "Invalid token"
    }
  ```
  - Status: **401**
  ```
    {
      "message": "You are not authorized accessing this data"
    }
  ```
  - Status: **404**
  ```
    {
      "message": "Article not found"
    }
  ```
### Delete tag from an article by article id

- Route: `/articles/:articleId/tag`
- Method: `DELETE`
- Headers: `token`
- Body: `{tagName: 'delete tag'}`
- Output:
  - Status: **200**
  ```
  {
    "n": 1,
    "nModified": 1,
    "ok": 1
  }
  ```
- Error Handler:
  - Status: **400**
  ```
    {
      "message": "Invalid token"
    }
  ```
  - Status: **401**
  ```
    {
      "message": "You are not authorized accessing this data"
    }
  ```
  - Status: **404**
  ```
    {
      "message": "Article not found"
    }
  ```
### Upload image for article

- Route: `/articles/image`
- Method: `POST`
- Headers: `token`
- Body: `{file: file path from form}`
- Output:
  - Status: **200**
  ```
  {
    "filename": "https://storage.googleapis.com/minivipi-img.harfialfaraby.com/1579439253215-photo-1488747279002-c8523379faaa.jpeg"
  }
  ```
- Error Handler:
  - Status: **400**
  ```
    {
      "message": "Invalid token"
    }
  ```
  - Status: **401**
  ```
    {
      "message": "You are not authorized accessing this data"
    }
  ```
  - Status: **404**
  ```
    {
      "message": "Article not found"
    }
  ```