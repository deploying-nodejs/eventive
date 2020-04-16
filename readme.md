# Case Study - Fullstack events

This case study is a full stack application called `Eventive`. It is slightly different from the others we've studied so far. It has a separate backend API server, and a separate frontend single page application. The backend is built with the [Adonis Js framework](https://adonisjs.com), and the frontend is built with the [React js](https://reactjs.org) framework. The backend exposes a REST API. The backend is powered by a mysql database for permanent data storage and a redis database for queuing.

Again, you do not need to know any of these technologies to be able to deploy this application. [Here's the Git repository](https://github.com/deploying-nodejs/eventive) for the project.

## Project specifications

This project provides a simple interface for creating, fetching and deleting events. It also has a queue working system, that sends a notification to the administrator in the background everytime an event is added or deleted on the site.

The backend exposes a REST API. To run the backend application successfully, follow these instructions:

- Clone the code repository using `git clone https://github.com/deploying-nodejs/eventive.git`.
- The backend is a completely separate npm project, so install the backend npm dependencies by changing directory to the `backend` folder (`cd eventive/backend`) and running `yarn install`.
- Once the dependencies are installed, the next step is to setup environment variables. This is done by creating a `.env` file at the root of the `backend` project folder and adding environment key value pairs to it. To see a sample of all variables required to run the backend correctly, copy the example content from `.env.example` using the command `cp .env.example .env`. The example environment variables are:

```bash
HOST=127.0.0.1
PORT=3333
NODE_ENV=production

APP_NAME=Eventive
APP_URL=http://${HOST}:${PORT}

CACHE_VIEWS=false

APP_KEY=5NURy6uYjmkP72brRzL5BTDshnvkutcc

DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_USER=root
DB_PASSWORD=
DB_DATABASE=eventive

HASH_DRIVER=bcrypt
```

- Mysql is required to correctly run the application. Create a Mysql database and user, and provide the credentials in the environment variables `DB_DATABASE`, `DB_USER` and `DB_PASSWORD`.
- After setting up environment variables, run the command `node ace migrations:run` at the root of the backend project. This command sets up the database tables and fields by running migrations defined in the `backend/database/migrations` folder of the backend project.
- To run the backend REST API use the `yarn start` command. In production this command should be run using a process manager such as PM2.
- When events are created or deleted on the application, a mail notification job is queued to redis. This job notifies the administrator that something happened on the platform. Mail notification jobs are processed in the `backend/workers/mail.js` file. The API pushes the job to a queue on redis, and the mail worker pulls these jobs and processes them. This means to have these notification jobs processed, you need to also run the worker as a mail separate process. You can do this by running the command `yarn start-worker:mail` from the root of the backend project.

The frontend of the application is a single page application created using [Create React App](https://create-react-app.dev). To run the frontend application successfully, follow these instructions:

- The frontend is a completely separate npm project, so install the frontend npm dependencies by changing directory to the `frontend` folder (`cd eventive/frontend`) and running `yarn install`.
- Next, create a file called `.env` and set an environment variable `REACT_APP_API_URL=` which should point to the running backend REST API.
- Finally, create a production build using the `yarn build` command. This will generate the production build in the `/build` folder. You can then serve this build as a single page application.
