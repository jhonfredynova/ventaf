# About

Firebase web application with server side rendering + Google cloud function configuration

# Configuration

In order to run the application you need to add the following configuration files with your app data:

-   env.development.local
    -   NEXT_PUBLIC_SERVER_URL=https://localhost:3001
    -   NODE_TLS_REJECT_UNAUTHORIZED=0
-   env.production.local
    -   NEXT_PUBLIC_API_URL=http://yourdomain.com
-   .env.local
    -   FIREBASE_AUTH_DOMAIN=XXX
    -   FIREBASE_KEY=XXX
    -   FIREBASE_PROJECT_ID=XXX
    -   FIREBASE_STG_POST_UPLOADS=XXX
    -   FIREBASE_STG_PROFILE_UPLOADS=XXX
    -   GOOGLE_ANALITYCS_KEY=XXX
    -   GOOGLE_APPLICATION_CREDENTIALS=./XXX.json
    -   GOOGLE_MAPS_KEY=XXX
    -   REST_COUNTRIES_URL=https://restcountries.eu/rest/v2
    -   SENDGRID_KEY=XXX
    -   SENDGRID_TEMPLATE_GENERAL=XXX
-   service-account.json

# Features

-   Code linter
-   Code splitting
-   Server side rendering

# Technologies

-   Javascript (React, Node, Nextjs)
-   CSS (css-in-js)
-   HTML

# Tools

-   Eslint
-   Prettier
-   Nextjs

# Scripts

In the project directory, you can run:

### `npm install`

Runs this command to install node dependencies of the project.

### `npm start`

Runs the app in production mode.

### `npm run dev`

Runs the app in development mode. Open [https://localhost:3001](https://localhost:3001)

### `npm run build`

Generate a bundle with the production version
