# Launching the application:
## Backend
The application uses Pocketbase as the backend (not included in this repository)
- You have to deploy a Pocketbase service (see [Deploying Pocketbase with Docker in production](https://pocketbase.io/docs/going-to-production/#using-docker)
  - If you want to run the application in local, see [Running Pocktbase in local machine](https://pocketbase.io/docs/)

For now, the frontend doesn't manage authentification or collection creation, so you need to modify it directly in Pocketbase:
- Once the server is running, go to the Pocketbase url
- Connect as superuser (create one if it doesn't exist)
- In "Collections" section, create a new collection named `messages`, with the following:
  - Fields:
    - `source` (string) 
    - `emitter` (string)
    - `message` (string)
  
  - API Rules:
    - Click the padlock icon on all rules to disable authentication for the API endpoints
  
  - Finally, click "Create" button to save the changes

## Frontend (this)

`npm install
npm run dev`

If needed, update the `BASE_URL` and the `COLLECTION` variables (related to Pocketbase) in `config.js` file
