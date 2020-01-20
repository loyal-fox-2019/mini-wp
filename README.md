# mini-wp
MiniWP is a platform that enables their user to make articles

- Built with Vue.js (Single File Components) and SPA (Single Page Application) on the client side
 - Built with rest API
 - Data storage is in mongo atlas utilizing mongoose
# Usage
Make sure to install all dependencies on both client and server side
> npm install

# Routes
| Route | HTTP | Request | Response | Description|
| ----------- | ----------- |----------- |----------- | ----------- |
| /google | POST |idToken, firtName|201(Created), 500(Internal Server Error)|Sign in with google|
| /register | POST |firstName, lastName, email, password|201(Created), 500(Internal Server Error)|Register to the website|
| /login | POST |email, password|200(OK),500(Internal Server Error) |Log in to the Website
| /title/:title| GET |null|200(OK),500(Internal Server Error) |Search article by title
| /publish| POST |title, content, file|201(Created), 500(Internal Server Error), 401(Unauthorized)|Publish article (Authenticated and Authorized)
| /myArticles| GET |null|200(OK),500(Internal Server Error) |See all of User's posts (authenticated)
| /allArticles| GET |null|200(OK),500(Internal Server Error) |Get all of the articles in the database
| /article/:id| GET |null|200(OK),500(Internal Server Error) |Get article by id
| /editArticle/:id| PUT |null|200(OK),401(Unauthorized),500(Internal Server Error) |Edit article by id (Authenticated and Authorized)
| /delete/:id| DELETE |null|200(OK),401(Unauthorized),500(Internal Server Error) |Edit article by id (Authenticated and Authorized)

## Environment
The following variable are the needed environment to be set before running the program
> BUCKET_NAME=
    KEY_FILE_NAME=
    PORT=
    JWT_SECRET=
    CLIENT_ID=
    MONGO_URL=
>   USERPASSWORD=