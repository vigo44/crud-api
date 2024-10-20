# Simple CRUD API  
## Description  
Use 22.x.x version (22.9.0 or upper) of Node.js
## How to install  
Clone and install packages
```
git clone https://github.com/vigo44/crud-api.git
npm i
```
## How to run  
Run the application in development mode
```
npm run start:dev
```
Run the application in production mode
```
npm run start:prod
```
## Endpoints  
**GET** `api/users` - to get all users  
**GET** `api/users/${userId}` - to get user by id  
**POST** `api/users` - to create user   
**PUT** `api/users/${userId}` - to update user   
**DELETE** `api/users/${userId}` - to delete user 

## User objects into database 
```
{
  id: string // unique identifier (uuid) generated on server side
  username: string //user's name (required)
  age: number //user's age (required)
  hobbies: [] | string[] //user's hobbies (required)
}
```
