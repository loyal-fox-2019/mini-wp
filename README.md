# mini World Press

This is a simple application for recording articles

## Installation

Use the package.json 

```bash
npm i axios bcrypt cors dotenv express google-auth-library jsonwebtoken mongoose
```

## Routes

| Route       | HTTP | Header(s) | Body                                                       | Description              |
| ----------- | ---- | --------- | ---------------------------------------------------------- | ------------------------ | 
| /users/signup  | POST  | null      | {email, password}                                                       |Login & get token |
| /user/signin | POST | null      | {first_name, last_name,email,password}              | Create Account
| /articles  | GET | {token}      | Null                     | Get all user articles   
| /articles  | POST | {token}      | {title, content, tags, image file}                     | Create a articles   
| /articles/:id  | DELETE | {token}      | Null                     | Delete a articles               |
| /articles/:id  | PUT | {token}      | {title, contante,tags, image file}                     | Update a articles               |


## Deployment

```bash
npm run dev (on folder server)
npm run dev (on folder client) => open on your browser "http://localhost:1234"
```

## Required
you need make file env and fill with:

GOOGLE = [info](https://developers.google.com/identity/sign-in/web/sign-in)

SECRET = 

GENPASS =


## License
Riko Orlando