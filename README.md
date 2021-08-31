# About

Firebase web application with server side rendering + Google cloud function configuration

# Configuration

In order to run the application you need to add the following configuration files with your app data:
- env.development.local
  - NEXT_PUBLIC_API_URL=http://localhost:3000/api
- env.production.local
  - NEXT_PUBLIC_API_URL=http://yourdomain.com/api
- .env.local
  - FIREBASE_AUTH_DOMAIN=XXX
  - FIREBASE_KEY=XXX
  - FIREBASE_PROJECT_ID=XXX
  - FIREBASE_STG_POST_UPLOADS=XXX
  - FIREBASE_STG_PROFILE_UPLOADS=XXX
  - GOOGLE_APPLICATION_CREDENTIALS=./path/service-account.json
  - REST_COUNTRIES_URL=https://restcountries.eu/rest/v2
  - SENDGRID_KEY=XXX
  - SENDGRID_TEMPLATE_GENERAL=XXX
  - NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=XXX
  - NEXT_PUBLIC_FIREBASE_KEY=XXX
  - NEXT_PUBLIC_GOOGLE_ANALITYCS_KEY=XXX
  - NEXT_PUBLIC_GOOGLE_MAPS_KEY=XXX
- service-account.json 

# Features

- Code linter
- Code splitting
- Server side rendering

# Technologies

- Javascript (React, Node, Nextjs)
- CSS (css-in-js)
- HTML

# Tools

- Eslint
- Webpack

# Scripts

In the project directory, you can run:

### `npm install`

Runs this command to install node dependencies of the project.

### `npm start`

Runs the app in production mode.

### `npm run dev`

Runs the app in development mode. Open [http://localhost:3000](http://localhost:3000)

### `npm run build`

Generate a bundle with the production version