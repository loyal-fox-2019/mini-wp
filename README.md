# Mini-WP_Okka Linardi

Blog-Center Website



Deploy Link: 

```
http://blog-center.lieprojects.com
```



#### Before you do anything else..

```
$ npm install
```



## 3rd Party APIs

- Google Authenticator



## .ENV Tempelates

```
MONGO_ATLAS= <your mongo atlas network>
GOOGLE_CLIENT_ID= <your Google Client ID>
DEFAULT_PASSWORD= <your preferred default password secret>
JWT_SECRET= <your preferred JWT secret>
```



## Database and ODM

- MongoDB (Mongo Atlas)
- Mongoose ODM



## Main Routes

|    Routes     |
| :-----------: |
|   /articles   |
|    /signIn    |
| /googleSignIn |



## Articles Route

| Route       | Method | Body                                                         | query | Result                       |
| ----------- | ------ | ------------------------------------------------------------ | ----- | ---------------------------- |
| /           | get    |                                                              |       | returns all articles(public) |
| /           | post   | title:article title,<br />content:article contents<br />image_url:article thumbnail image<br />created_at:created article Date<br />authorID: author userID<br />tags: article tags<br />status: public/private |       | creates article by Owner     |
| /myArticles | get    |                                                              |       | returns owner's articles     |
| /:id        | delete |                                                              |       | deletes owner's article      |
| /:id        | put    | title:article title,<br />content:article contents<br />image_url:article thumbnail image<br />created_at:created article Date<br />authorID: author userID<br />tags: article tags<br />status: public/private |       | updates owner's article      |



## Other Routes

| Routes        | Method | Body                                                         | Query | Result                                            |
| ------------- | ------ | ------------------------------------------------------------ | ----- | ------------------------------------------------- |
| /             | post   | name:user's name<br />email:user's email<br />password: user's password |       | Creates an ID and database spot for user          |
| /googleSignIn | post   |                                                              |       | Generates token and database,ID(for first timers) |
| /signIn       | post   | email:user's email<br />password:user's password             |       | Generates token                                   |



# Middlewares

This app uses 2 middlewares **Authentication**, **Google Cloud Storage Upload** and **ErrorHandler**



### Authentication:

​		Decrypts JWT token

### Google Cloud Storage Upload:

​		Uploads articles thumbnail Images to Google Cloud Storage

### ErrorHandler:

​		Handles all errors

