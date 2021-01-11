# mini-wp

### User
| Routes | Method | Function | Result |
| :-------: | :------: | :-----: | :-----: |
| localhost:3000/user/login | POST | Login to page | Get token |
| localhost:3000/user/register | POST | Regist a new account | Go to login, get token |
| localhost:3000/user/google | POST | Login/Register using google account | Get token by using google account |

### Article
| Routes | Method | Function | Result |
| :-------: | :------: | :-----: | :-----: |
| localhost:3000/article/:id| GET | Get all user's article | All articles data |
| localhost:3000/article | POST | Create new article | Status 201 and message |
| localhost:3000/article/:id | PUT | Edit article data | Get payload article data |
| localhost:3000/article/:id | DELETE | Delete single data | Success message |

### Instalation
```
npm install
```
```
npm run dev
```

--------------

Not deployed, yet
Use
```
npm run dev
```
on client side
and the server use PORT 3000