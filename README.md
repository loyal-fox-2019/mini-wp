# mini-wp

## Client deploy link
http://zoe-new-mini-wp.s3-website-ap-southeast-1.amazonaws.com/

## Server deploy link
http://18.219.119.178:55555

<hr>

## author
Author module has 4 endpoints.

## login and register

## URLs
### login: POST /author/login
### register: POST /author/register

### body
username: string (only for register)
email: string (email format)
password: string

### success response for both login and register:
```
{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdXRob3JJZCI6IjVlMjUyODhjNDQyMWE2NDBmM2Q4MWE1OSIsImlhdCI6MTU3OTQ5MzUxNn0.dV8U4336M9WPFZuA4fQVcrh3yYtJJQDQfuGvSibIGig",
    "authorId": "5e25288c4421a640f3d81a59"
}
```

### error response for both login and register:
Depending on what the user forgets to put, the error message will show all required fields that need to be filled. The errors are separated by "\n"

Example:
```
{
    "message": "password: Must insert password\n username: Must insert username"
}
```

## Add a tag to author's watched tags, and fetch author's watched tags

### URLs
### add watched tags: PATCH /author/:id
### get user's watched tags: GET /author/:id

### params (for both update and get watched tags)
id: id of the author

### body (for update watched tags endpoint)
tags: a string of 1 tag. Example: "tag1"

### authentication
token: a jsonwebtoken string from logging in or register

### success response for add watched tags
```
{
    "results": {
        "n": 1,
        "nModified": 1,
        "opTime": {
            "ts": "6783881761492303873",
            "t": 4
        },
        "electionId": "7fffffff0000000000000004",
        "ok": 1,
        "$clusterTime": {
            "clusterTime": "6783881761492303873",
            "signature": {
                "hash": "k7hUuhklYZhoHy307Wn8nqjQ42A=",
                "keyId": "6781586672703242242"
            }
        },
        "operationTime": "6783881761492303873"
    }
}
```

### common error response for both add watched tags and get watched tags
No token error

```
{
    "message": "Need token for authentication"
}
```

Send token but not the same as the user id getting sent through parameter

```
{
    "message": "You are not authorized to update watched-tags of this author"
}
```

<hr>

## article

Error responses will be summarized in the end of this section

### create article

#### url
POST /article

#### header
token

#### body
title: string - required
content: string - required
featured_image: string - required
tags: array of strings
audience: string-> 'public' or 'private'

#### success response
```
{
    "article": {
        "tags": [
            "satu",
            "dua"
        ],
        "audience": "private",
        "_id": "5e254dad4421a640f3d81a5f",
        "author": "5e254c654421a640f3d81a5e",
        "title": "title1",
        "content": "content1",
        "featured_image": "https://zoezachary.s3.ap-southeast-1.amazonaws.com/Screenshot%20from%202020-01-13%2005-03-42.png",
        "createdAt": "2020-01-20T06:50:21.588Z",
        "updatedAt": "2020-01-20T06:50:21.588Z",
        "__v": 0
    }
}
```

### get articles
This endpoint will return current author logging in private articles and public articles

#### url
GET /article

#### header
token

#### success response
```
{
    "articles": [
        {
            "tags": [
                "satu",
                "dua"
            ],
            "audience": "private",
            "_id": "5e254dad4421a640f3d81a5f",
            "author": "5e254c654421a640f3d81a5e",
            "title": "title1",
            "content": "content1",
            "featured_image": "https://zoezachary.s3.ap-southeast-1.amazonaws.com/Screenshot%20from%202020-01-13%2005-03-42.png",
            "createdAt": "2020-01-20T06:50:21.588Z",
            "updatedAt": "2020-01-20T06:50:21.588Z",
            "__v": 0
        },
        {
            "tags": [
                "test"
            ],
            "audience": "public",
            "_id": "5e2540004421a640f3d81a5b",
            "author": "5e2504bc96679540a262015b",
            "title": "public article",
            "content": "wdwdawdad",
            "featured_image": "https://zoezachary.s3.ap-southeast-1.amazonaws.com/Screenshot%20from%202019-12-23%2014-47-41.png",
            "createdAt": "2020-01-20T05:52:00.267Z",
            "updatedAt": "2020-01-20T05:52:00.267Z",
            "__v": 0
        }
    ]
}
```

### get one article by id

#### url
GET /article/:id

#### header
token

#### params
id: user id string

#### success response
```
{
    "article": {
        "tags": [
            "test"
        ],
        "audience": "public",
        "_id": "5e2540004421a640f3d81a5b",
        "author": "5e2504bc96679540a262015b",
        "title": "public article",
        "content": "wdwdawdad",
        "featured_image": "https://zoezachary.s3.ap-southeast-1.amazonaws.com/Screenshot%20from%202019-12-23%2014-47-41.png",
        "createdAt": "2020-01-20T05:52:00.267Z",
        "updatedAt": "2020-01-20T05:52:00.267Z",
        "__v": 0
    }
}
```

### get articles by tag

#### url
GET /article/tag/:tag

#### header
token

#### params
tag: string

#### success response
```
{
    "articles": [
        {
            "tags": [
                "test"
            ],
            "audience": "public",
            "_id": "5e2540004421a640f3d81a5b",
            "author": "5e2504bc96679540a262015b",
            "title": "public article",
            "content": "wdwdawdad",
            "featured_image": "https://zoezachary.s3.ap-southeast-1.amazonaws.com/Screenshot%20from%202019-12-23%2014-47-41.png",
            "createdAt": "2020-01-20T05:52:00.267Z",
            "updatedAt": "2020-01-20T05:52:00.267Z",
            "__v": 0
        }
    ]
}
```

### update article by id

#### url
PATCH /article/:id

#### params
id: article id string

#### header
token

#### body
Same as create, however nothing is required, user/author can just update one field and submit.

#### success response
```
{
    "results": {
        "n": 1,
        "nModified": 1,
        "opTime": {
            "ts": "6783924878668989418",
            "t": 4
        },
        "electionId": "7fffffff0000000000000004",
        "ok": 1,
        "$clusterTime": {
            "clusterTime": "6783924878668989418",
            "signature": {
                "hash": "awGu1csJ4+E8oPX06SFm+t0OAo0=",
                "keyId": "6781586672703242242"
            }
        },
        "operationTime": "6783924878668989418"
    }
}
```

### delete an article

#### url
DELETE /article/:id

#### params
id: article id string

#### header
token

#### success response
```
{
    "results": {
        "tags": [
            "satu",
            "dua"
        ],
        "audience": "private",
        "_id": "5e25583f4421a640f3d81a60",
        "author": "5e254c654421a640f3d81a5e",
        "title": "buat delete",
        "content": "content1",
        "featured_image": "https://zoezachary.s3.ap-southeast-1.amazonaws.com/Screenshot%20from%202020-01-13%2005-03-42.png",
        "createdAt": "2020-01-20T07:35:27.994Z",
        "updatedAt": "2020-01-20T07:35:27.994Z",
        "__v": 0
    }
}
```

### Common error responses:
#### All article endpoints:
no token
```
{
    "message": "Need token for authentication"
}
```

get single PRIVATE article but not as an owner
```
{
    "message": "You are not authorized to read this article."
}
```

get single but the article does not exist / deleted
```
{
    "message": "The article does not exist in our server."
}
```

update / delete an article not their own
```
{
    "message": "You are not authorized to perform action to this article."
}
```
