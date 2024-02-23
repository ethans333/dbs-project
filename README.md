# Database Systems Project

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

_Note: Make sure WAMP server is running, that runs the SQL database!_

## Api Endpoints

| Endpoint      | Method | Description                           | Body                          |
| ------------- | ------ | ------------------------------------- | ----------------------------- |
| `/api/events` | `POST` | Adds a new event to the events table. | `event_id, time, description` |
| `/api/events` | `GET`  | Gets ALL events from the event table. | `None`                        |

## User Privileges

| User Type   | Privileges                                 |
| ----------- | ------------------------------------------ |
| Super Admin | Creates a profile for the university.      |
| Admin       | Owns an RSO and may post events.           |
| Student     | Use application to look up various events. |
