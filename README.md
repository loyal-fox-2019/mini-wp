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
