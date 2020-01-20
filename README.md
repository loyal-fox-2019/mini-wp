# Mini Wp

### Getting Started

If you want to used this API & Client you need to run this in your terminal

```
//install dependencies
$ npm install

//install dev dependencies for dotenv
$ npm install -D dotenv

// running the server
$ npm run dev
```

Access the API via `http://localhost:3000/`

##### POST  `/users/register`

```json
url : '//localhost:3000/users/register',
body : {
    name : usertest,
    password : password,
    email : usertest@mail.com
},
response : 
 "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVlMjUyYWVlYTY4ZDAwNjg0NjQzNzVjZiIsIm5hbWUiOiJBbmRhcmEgTWlzdW8iLCJlbWFpbCI6ImFuZGFyYUBtYWlsLmNvbSIsImlhdCI6MTU3OTQ5NDEyNn0.baWoMUMo-HRejSn18eQW4iHEeySBixGIBYAiT7zYKzI"
```

##### POST  `/users/login`

```json
url : '//localhost:3000/users/register',
body : {
    email : usertest,
    password : password,
}
response: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI1ZTFiY2Q1MWQ0N2I0NTBhNWQ1NmM2OGEiLCJ1c2VybmFtZSI6InVzZXJuYW1lMTAxIiwiaWF0IjoxNTc4ODgwNDg4fQ.I0E3TnxdECuYr2Ao-4pZ-R7LL_liFvvVVjtbQYge9SY"
```

##### GET  `/articles/`

```json
url : '//localhost:3000/articles/',
headers: {token}
response : [
    {
        "created": "2020-01-19T10:57:08.847Z",
        "_id": "5e243d14db77414439a5324f",
        "title": "Coba Upload Gambar 9:16",
        "content": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce finibus dignissim consectetur. Aliquam erat volutpat. Proin tincidunt justo erat, vel euismod odio ornare ut. Quisque eget egestas quam. Etiam non dui eleifend, suscipit massa in, vulputate urna. Maecenas eget tincidunt leo, quis auctor nulla. Nunc pellentesque mi ex, quis mollis odio aliquet vitae. Pellentesque pretium aliquam lacus eu tincidunt. Maecenas dictum mauris sed turpis dictum, eu imperdiet tellus hendrerit. Etiam a elit id lorem vestibulum pharetra vitae sit amet sapien. Cras eget justo maximus, iaculis ligula eget, molestie elit.",
        "thumbnail": "https://storage.googleapis.com/miniwp-upload/1579433235144-photo-1576562492346-af59df6a1504.jpeg",
        "author": {
            "_id": "5e241d0549a5046325be0521",
            "name": "Helga Hinaya"
        },
        "__v": 0
    }]
```

##### POST  `/articles/`

```json
url : '//localhost:3000/articles/',
headers: {token}
body : {
    title : 'Article Title',
    content : 'Description of content',
  	thumbnail: File
}


response:
    {
    "created": "2020-01-20T04:07:33.651Z",
    "_id": "5e252ce1a68d0068464375d0",
    "title": "Article Title",
    "content": "Description of content",
    "thumbnail": "https://storage.googleapis.com/miniwp-upload/1579494625126-header-graphic.png",
    "author": "5e241d0549a5046325be0521",
    "__v": 0
}
```

##### GET `/articles/{id}`

```json
url : '//localhost:3000/articles/5e252ce1a68d0068464375d0',
headers: {token}
response : {
    "created": "2020-01-20T04:07:33.651Z",
    "_id": "5e252ce1a68d0068464375d0",
    "title": "Article Title",
    "content": "Description of content",
    "thumbnail": "https://storage.googleapis.com/miniwp-upload/1579494625126-header-graphic.png",
    "author": {
        "_id": "5e241d0549a5046325be0521",
        "name": "Helga Hinaya"
    },
    "__v": 0
}
```

##### PUT  `/articles/{id}`

```json
response : {
    "message": "Article Successfully Updated"
}
```



### Error Handling

------

- ##### 400

  ```
  {
  	message:'Invalid Token'
  }
  ```

- ##### 403

  ```
  {
  	code: 403,
      status: 'Forbidden',
      message: 'You Don\'t have access to this Articles'
  }
  ```

- ##### 404

  ```
  {
  	code: 404,
  	status: 'Not Found',
  	message: 'Cannot find Articles'
  
  }
  ```

  

- ##### 500

  ```
  {
  	message : 'Internal Sever Error'
  }
  ```

  