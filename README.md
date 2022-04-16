# About

Firebase web application with server side rendering + Google cloud function configuration

# Environment

Install the following tools

-   Git
-   Nodejs (v14.19.1)
-   Visua Studio Code with the following extentions:
    -   ESLint
    -   Prettier

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

# Scripts

In the project directory, you can run:

### `npm install`

Runs this command to install node dependencies of the project.

### `npm start`

Runs the app in production mode.

### `npm run dev`

Runs the app in development mode. Open [https://localhost:3001](https://localhost:3001).

### `npm run build`

Generate a bundle with the production version.

### `npm post build`

Generate the sitemap and robots.txt for static and server pages.

### `npm run lint`

Lint the project code to analyze bugs and bad practices.

### `npm run test`

Runs code fiels to funtional tests.
