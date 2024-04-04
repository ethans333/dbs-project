# Database Systems Project

## To Do
- [x] Admins & Super Admins creating private events. [broken]
- [ ] When you first login it doesnt update your user type. (Just refresh the page)
- [x] Comment voting.
- [x] Events at location.
- [x] Admins create rsos
- [ ] Set up create table exercise to team can implement triggers.

## To Run

### Frontend

`cd frontend`

_Only required intially:_
`npm install`

`npm run dev`

### Backend

`cd backend`

_Only required intially:_
`npm install`

`node index.js`

### Running Wamp

* Start WAMP
* Go to the url `localhost`
* Under Your Aliases select `PhpMyAdmin`
* Login with username being `root` and password is *blank*

## User Privileges

| User Type   | Privileges                                 |
| ----------- | ------------------------------------------ |
| Super Admin | Creates a profile for the university.      |
| Admin       | Owns an RSO and may post events.           |
| Student     | Use application to look up various events. |

