# mini-wp

An app for posting and sharing articles with the world

#### Base URL : `http://localhost:3000`

#### Prerequisites : 
- NodeJS
- NPM
- Parcel-bundler for client side
- run `npm run dev` on server and `parcel index.html` on client to start both localhost servers

#### Endpoints : 
- ##### Users : 
    - ###### Register
        - URL : `/user/register/`
        - Register a new user
        - Method : `POST`
        - Body : 
            - email : `String`
            - password : `String`
        - On Success : 
            - Status Code : `201`
            - Response : returns a jsonwebtoken
                ````
                "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImpvdmlhYmNAbWFpbC5jb20iLCJwYXNzd29yZCI6IjEyMzQiLCJpYXQiOjE1Nzk0NzM0Mjl9.8hkUzVZNQEFHEFnrsDyQybMz9OmdJ_RXxuvOR4CE8ks"
                ````
        - On Fail : 
            - Cause : email/password is required
                - Status Code : `400`
                - Response : 
                    ````
                    {
                        "message": "Bad request",
                        "err": {
                            "errors": {
                                "password": {
                                    "message": "Path `password` is required.",
                                    "name": "ValidatorError",
                                    "properties": {
                                        "message": "Path `password` is required.",
                                        "type": "required",
                                        "path": "password",
                                        "value": ""
                                    },
                                    "kind": "required",
                                    "path": "password",
                                    "value": ""
                                }
                            },
                            "_message": "User validation failed",
                            "message": "User validation failed: password: Path `password` is required.",
                            "name": "ValidationError"
                        }
                    }
                    ````

            - Cause : email is registered
                - Status Code : `400`
                - Response : 
                    ````
                    {
                        "message": "Bad request",
                        "err": {
                            "errors": {
                                "password": {
                                    "message": "Path `password` is required.",
                                    "name": "ValidatorError",
                                    "properties": {
                                        "message": "Path `password` is required.",
                                        "type": "required",
                                        "path": "password",
                                        "value": ""
                                    },
                                    "kind": "required",
                                    "path": "password",
                                    "value": ""
                                }
                            },
                            "_message": "User validation failed",
                            "message": "User validation failed: password: Path `password` is required.",
                            "name": "ValidationError"
                        }
                    }
                    ````
    - ###### Login
        - URL : `/user/login/`
        - Register a new user
        - Method : `POST`
        - Body : 
            - email : `String`
            - password : `String`
        - On Success : 
            - Status Code : `200`
            - Response : returns a jsonwebtoken
                ````
                "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImpvdmlhYmNAbWFpbC5jb20iLCJwYXNzd29yZCI6IjEyMzQiLCJpYXQiOjE1Nzk0NzM0Mjl9.8hkUzVZNQEFHEFnrsDyQybMz9OmdJ_RXxuvOR4CE8ks"
                ````
        - On Fail : 
            - Cause : email is not registered
                - Status Code : `400`
                - Response : 
                    ````
                    {
                        "message": "user is not registered"
                    }
                    ````

            - Cause : email/password is invalid
                - Status Code : `400`
                - Response : 
                    ````
                    {
                        "message": "user is not registered"
                    }
                    ````
    - ###### Login with Google OAuth
        - URL : `/user/google/`
        - Register a new user
        - Method : `POST`
        - Body : 
            - Google_Id : `String`
        - On Success : 
            - Status Code : `200`
            - Response : returns a jsonwebtoken and author
                ````
                {
                    token : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImpvdmlhYmNAbWFpbC5jb20iLCJwYXNzd29yZCI6IjEyMzQiLCJpYXQiOjE1Nzk0NzM0Mjl9.8hkUzVZNQEFHEFnrsDyQybMz9OmdJ_RXxuvOR4CE8ks",
                    author : "jovipetraratulangi@gmail.com"
                }
                ```` 
    
- ##### Users : 
    - All access on this route has to have a valid token in the headers, retrieve a valid token by signing in or signing up
    - Headers : 
        - `token` : `String` __required__
        - On fail :
            ````
            {
                "message": "invalid token"
            }
            ````
    - ###### Create
        - URL : `/user/register/`
        - Creates a new article
        - Method : `POST`
        - Body : 
            - title : `String` __required__
            - content : `String` __required__
            - imgUrl : `Image Form Data`
            - tags : `Array`
        - On Success : 
            - Status Code : `201`
            - Response :
                ````
                {
                    "message": "Article created",
                    "docs": {
                        "created_at": "2020-01-20T01:07:26.440Z",
                        "tags": [],
                        "_id": "5e24fe50fba5e60ff30df7f0",
                        "title": "tester",
                        "content": "tester satu dua tiga empat lima",
                        "__v": 0
                    }
                }
                ````
        - On Fail : 
            - Cause : content/title is required
                - Status Code : `400`
                - Response : 
                    ````
                    {
                        "message": "Bad request",
                        "err": {
                            "errors": {
                                "content": {
                                    "message": "Path `content` is required.",
                                    "name": "ValidatorError",
                                    "properties": {
                                        "message": "Path `content` is required.",
                                        "type": "required",
                                        "path": "content"
                                    },
                                    "kind": "required",
                                    "path": "content"
                                }
                            },
                            "_message": "Article validation failed",
                            "message": "Article validation failed: content: Path `content` is required.",
                            "name": "ValidationError"
                        }
                    }
                    ````

    - ###### Get All Published Articles
        - URL : `/article/`
        - Get All Published Articles
        - Method : `GET`
        - On Success : 
            - Status Code : `200`
            - Response : returns a jsonwebtoken
                ````
                {
                    "docs": [
                        {
                            "created_at": "2020-01-19T17:26:08.407Z",
                            "tags": [
                                "test",
                                "satu",
                                "dua",
                                "tigs"
                            ],
                            "_id": "5e249229d8921f2fd18442cb",
                            "title": "Tester jovi",
                            "content": "<div>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.</div><div> Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim qui <b>blandit praesen</b>t</div><div> luptatum zzril delenit augue duis dolore te feugait nulla facilisi. Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. </div>",
                            "imgUrl": "https://storage.googleapis.com/miniwp-images-jovi/1579455016369-undraw_by_my_car_ttge.png",
                            "author": "jovi@mail.com",
                            "status": true,
                            "__v": 0
                        },
                        {
                            "created_at": "2020-01-19T22:16:22.825Z",
                            "tags": [
                                "googel",
                                "google",
                                "oauth",
                                "phew"
                            ],
                            "_id": "5e24d5c8a3232f2abd2b0da9",
                            "title": "Hi ini punya google oauth",
                            "content": "<div>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum <br></div><div><br></div><div>dolor sit amet. Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim qui blandit praesent luptatum zzril delenit augue duis dolore te feugait nulla facilisi. Lorem ipsum dolor sit amet, <br></div><div><br></div><div>consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. </div>",
                            "imgUrl": "https://storage.googleapis.com/miniwp-images-jovi/1579472327957-published-rubber-stamp-grunge-seal-260nw-1455507557.jpg",
                            "author": "",
                            "status": true,
                            "__v": 0
                        },
                        {
                            "created_at": "2020-01-19T22:21:04.719Z",
                            "tags": [
                                "test",
                                "satu",
                                "tiga",
                                "empat"
                            ],
                            "_id": "5e24d6bdcd01dd2c73807d6f",
                            "title": "punya jovipetraratulangi@gmail.com",
                            "content": "<div>Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat. Nam liber tempor cum soluta nobis eleifend option congue nihil imperdiet doming id quod mazim placerat facer possim assum. Lorem ipsum <br></div><div><br></div><div>dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua</div><div><br></div><div>. At vero eos et accusam et justo duo dolores et ea rebum. </div><div>Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim qui blandit prae</div><div><br></div><div>sent luptatum zzril delenit augue duis dolore te feugait nulla facilisi. </div>",
                            "imgUrl": "https://storage.googleapis.com/miniwp-images-jovi/1579472572120-1200px-2014_Toyota_Avanza_1.3_E_wagon_(F651RM;_01-28-2019),_South_Tangerang.jpg",
                            "author": "jovipetraratulangi@gmail.com",
                            "status": true,
                            "__v": 0
                        }
                    ],
                    "user": {
                        "email": "jovi@12.com",
                        "password": "1234",
                        "iat": 1579431154
                    }
                }
                ````
    - ###### Get All Drafted Articles
        - URL : `/article/drafts`
        - Get All Drafted Articles
        - Method : `POST`
        - Body : 
            - author : `String`
        - On Success : 
            - Status Code : `200`
            - Response :
                ````
                {
                    "docs": [
                        {
                            "created_at": "2020-01-19T17:26:08.407Z",
                            "tags": [
                                "test",
                                "satu",
                                "dua",
                                "tigs"
                            ],
                            "_id": "5e249229d8921f2fd18442cb",
                            "title": "Tester jovi",
                            "content": "<div>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.</div><div> Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim qui <b>blandit praesen</b>t</div><div> luptatum zzril delenit augue duis dolore te feugait nulla facilisi. Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. </div>",
                            "imgUrl": "https://storage.googleapis.com/miniwp-images-jovi/1579455016369-undraw_by_my_car_ttge.png",
                            "author": "jovi@mail.com",
                            "status": false,
                            "__v": 0
                    ],
                }
                ````
    - ###### Get An Article Based on Id
        - URL : `/article/:id`
        - Get An Article Based on Id
        - Method : `GET`
        - Params : 
            - id : `String`
        - On Success : 
            - Status Code : `200`
            - Response :
                ````
                {
                    "created_at": "2020-01-19T17:26:08.407Z",
                    "tags": [
                        "test",
                        "satu",
                        "dua",
                        "tigs"
                    ],
                    "_id": "5e249229d8921f2fd18442cb",
                    "title": "Tester jovi",
                    "content": "<div>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.</div><div> Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim qui <b>blandit praesen</b>t</div><div> luptatum zzril delenit augue duis dolore te feugait nulla facilisi. Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. </div>",
                    "imgUrl": "https://storage.googleapis.com/miniwp-images-jovi/1579455016369-undraw_by_my_car_ttge.png",
                    "author": "jovi@mail.com",
                    "status": false,
                    "__v": 0
                }
                ````
    - ###### Get An Article Based on Title
        - URL : `/article/:title`
        - Get An Article Based on Title
        - Method : `GET`
        - Params : 
            - title : `String`
        - On Success : 
            - Status Code : `200`
            - Response :
                ````
                {
                    "created_at": "2020-01-19T17:26:08.407Z",
                    "tags": [
                        "test",
                        "satu",
                        "dua",
                        "tigs"
                    ],
                    "_id": "5e249229d8921f2fd18442cb",
                    "title": "Tester jovi",
                    "content": "<div>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.</div><div> Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim qui <b>blandit praesen</b>t</div><div> luptatum zzril delenit augue duis dolore te feugait nulla facilisi. Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. </div>",
                    "imgUrl": "https://storage.googleapis.com/miniwp-images-jovi/1579455016369-undraw_by_my_car_ttge.png",
                    "author": "jovi@mail.com",
                    "status": false,
                    "__v": 0
                }
                ````
    - ###### Update
        - URL : `/article/:id`
        - Updates an article
        - Method : `PUT`
        - Params : 
            - id : `String`
        - Body : 
            - title : `String` __required__
            - content : `String` __required__
            - imgUrl : `Image Form Data`
            - tags : `Array`
        - On Success : 
            - Status Code : `200`
            - Response :
                ````
                {
                    "message": "updated",
                    "docs": {
                        "n": 1,
                        "nModified": 1,
                        "opTime": {
                            "ts": "6783831896921997313",
                            "t": 6
                        },
                        "electionId": "7fffffff0000000000000006",
                        "ok": 1,
                        "$clusterTime": {
                            "clusterTime": "6783831896921997313",
                            "signature": {
                                "hash": "tv+5Vs6RzN4YR5lFgm2jbVa62dQ=",
                                "keyId": "6771312780218728450"
                            }
                        },
                        "operationTime": "6783831896921997313"
                    }
                }
                ````
    - ###### Delete
        - URL : `/article/:id`
        - Deletes an article
        - Method : `DELETE`
        - Params : 
            - id : `String`
        - On Success : 
            - Status Code : `200`
            - Response :
                ````
                {
                    "message": "deleted",
                    "docs": {
                        "created_at": "2020-01-19T17:26:08.407Z",
                        "tags": null,
                        "_id": "5e249229d8921f2fd18442cb",
                        "title": null,
                        "content": "content updated 2",
                        "imgUrl": "lskdfmsldkfm",
                        "author": "jovi@mail.com",
                        "status": null,
                        "__v": 0
                    }
                }
                ````
    
    