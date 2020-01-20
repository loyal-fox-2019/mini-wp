# mini-wp

#### This app was build by Express and Mongoose

#### All routes must initially be given _http://localhost:3000_

List of user routes:

Route | HTTP | Header(s) | Body | Description
------|------|-----------|------|-------------
_user/register_ | **POST** | none | email, password | Create new user
_user/privateAuth_ | **POST** | none | email, password | Login with private Authentication to dashboard page
_user/openAuth_ | **POST"** | none | id_token | Login with open(google) Authentication to dashboard page
 
List of article routes: 

Route | HTTP | Header(s) | Body | Description
------|------|-----------|------|-------------
_/article_ | **GET**| usertoken | none | Get all list articles
_/article_ | **POST** | usertoken | image,title(*required*),content(*required*) | Create new Article
_/article/:id_  | **PUT**  | usertoken | title(*required*),content(*required*) | Edit Article
_/article/:id_   | **DELETE** | usertoken | article_id | Delete one article
_/article/findOne/:id_ | **GET**| usertoken | none | Get one articles



Make sure you have Node.js and npm installed in your computer, and then run these commands:

* $ npm install
* $ npm start
* $ npm run dev