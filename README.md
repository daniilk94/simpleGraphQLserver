# Simple GraphQL server
This project demonstrates basic operations such as getData, addData, deleteData, updateData built with GraphQL
## Installation:

1. Download or clone this repository

2. Open Powershell in the project folder

3. Install required libraries with: **npm install**

4. Start the server with: **node app.js** or **npm start**

5. Open the homepage in your browser: http://localhost:4000/
## Login (JWT Authentication):

All api calls require authentication

### Login:

1. Go to the sandbox available at http://localhost:4000/ 

2. Execute mutation login with the following credentials: username: "jk", password: "sala"

3. Copy the access token provided in the response body

4. Create new Authorization header and put there: Bearer "insert here provided token"


