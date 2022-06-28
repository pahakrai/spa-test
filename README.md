# SPA AJAX

Response to test
Can update and point to different mongo server, stripe key from .env
If separate mongo server used can mongorestore the data in the folder dump to the connected server with following command
`mongorestore --uri mongodb+srv://<USERNAME>:<PASSWORD>@cluster0.7l2k8.mongodb.net`

### Instructions

Give code a test run:

1. Install Node.js
2. Navigate to the project folder and run the following from a terminal:
   - `npm install` (to install dependencies)
   - `npm run start` (to run the server)
3. Open `localhost` in a web browser, using the port specified in `.env` currently `http://localhost:8080/`
