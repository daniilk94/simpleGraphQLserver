# Simple GraphQL server
This project demonstrates basic GraphQL operations such as `getData`, `addData`, `deleteData`, and `updateData`.
## Installation:

1. Download or clone this repository

2. Open PowerShell in the project folder

3. Install required libraries with: **npm install**

4. Start the server using: **node app.js** or **npm start**

5. Open the GraphQL Sandbox at: http://localhost:4000/
## Login (JWT Authentication):

All API calls require authentication.

### Login steps:

1. Open the GraphQL SandBox at http://localhost:4000/ 

2. Execute the `login` mutation with the following credentials:
 - username: `"jk"`
 - password: `"sala"`

3. Copy the access token from the response.

4. Create a new `Authorization` header and set it to:
```
Bearer <token>
```

## Operations:
- **getAllData** - Returns all data records.

- **getDataById** - Returns a data record by the provided ID.

- **addData** - Creates a new data entry. The ID is automatically set to the next available one.

- **deleteData** - Deletes a data entry by the provided id.

- **updateData** - Creates a new entry if the ID does not exist, or updates the existing one.

- **searchUser** - Returns all users matching the provided forename.

## Testing
Tests are organized into separate files, where each file covers one specific operation.
Some files contain multiple test cases.

Automated tests **do not require real authentication**, because each test injects its own
GraphQL context through `contextValue`, bypassing JWT validation.

Run automated tests using: **npm test**
