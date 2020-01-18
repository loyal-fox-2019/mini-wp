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
          "msg": "User not registered"
      }
  ```
  - Status: **404**
  ```
      {
          "msg": "Incorrect username or password"
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
          "msg": <"Email your@mail.com already exist" | "First_name required" | "Username required" | "Email required" | "Password required">
      }
  ```
