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

## Tables

### Entities

| Entity         | Attributes             | Description                                                    |
| -------------- | ---------------------- | -------------------------------------------------------------- |
| User           | `UID`                  | Main user class. Can view events and create comments.          |
| SuperAdmins    | `UID`                  | Can create events and organizations. Inherited from User.      |
| Admins         | `UID`                  | Can create events. Inherited from User.                        |
| Location       | `name, Loc_ID`         | Location of events.                                            |
| Events         | `Event_ID, Time, Desc` | Main event class.                                              |
| RSO_Events     | `Event_ID`             | Registered Student Organization events. Inherited from Events. |
| Private_Events | `Event_ID`             | Private events. Inherited from Events.                         |
| Public_Events  | `Event_ID`             | Public events. Inherited from Events.                          |
| RSOs           | `RSO_ID`               | Registered Student organization. Can be created by admins.     |

### Relationships

| Relationships | Attributes                               | Description                               |
| ------------- | ---------------------------------------- | ----------------------------------------- |
| Comments      | `UID, text, rating, timestamp, Event_ID` | Comments that belong to a user and event. |
| Owns          | `Event_ID, RSO_ID`                       | An RSO owns an RSO_Event.                 |
| Join          | `UID, RSO_ID`                            | A user joins an RSO.                      |
| At            | `Loc_ID, Event_ID`                       | An event is at a location.                |
| Creates       |                                          |
| Creates       |                                          |
| Creates       |                                          |
