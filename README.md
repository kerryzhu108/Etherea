# Etherea

## Description 

Our app encourages Sustainable Development Goals such as preventing pollution and human-induced climate change. The app aims to make individuals live more sustainably by setting monthly themes with goals they can check off daily and a leaderboard for people to share and compete against and a calculator that quantifies their impact. Users who wants to minimize their carbon footprint, but don't have the motivation to or users who want to improve their lifestyles, but are ignorant on how to make that happen would find value in this app. The application solves this problem because it encourages users meet Sustainable Development Goals by informing users about the impact they are making and allowing them to compete through a leaderboard.

## Key Features
- **User registration/login**: Users can create accounts and sign into those accounts from the application. Passwords are hashed and salted using bcrypt before being stored in the database.
- **JWT authentication**: The backend REST API uses JWT authentication to ensure requests sent to the API cannot be forged as another user.
- **Leaderboard**: A global leaderboard that displays the top users for a month's theme based on their gathered amount of points.

## Instructions
### Accessing the Application
1. Install the Expo Go app on an Android device. The application can be accessed from the following website: <TODO: Add deployment website here>
- Note: The backend API is deployed to [https://etherea-dev.herokuapp.com/]() and calls can be made to the REST API there.

### Using the application
1. Initially, no users are created. You will be prompted with a login and sign up button to create your profile.
2. Tap the sign up button and enter the required information.
3. Once signed up, login using the credentials provided during the registration process.
 
 ## Development requirements
- Local development requires `node`, `npm` and `expo-cli` as well as a postgresql database.
- To test the the application on an Android device, ensure that the Expo Go app is installed.
### Backend Setup
1. A `.env` file is required for environment variables and requires the following variables to be defined. Note that this file must be placed in the backend root directory `backend/.env`
```bash
DB_HOST= # IP address for postgresql database
DB_USER= # User for database
DB_NAME= # Database name
DB_PASS= # Password for database user
DB_PORT= # Database port
TOKEN_SECRET= # A 128 character random hex string (for handling JWT)
PORT= # The local port the backend server will run on
NODE_ENV= # Either development or production
IP= # The IP the backend server will bind to
```
2. Install the required libraries from `npm` using `npm install` in the backend directory.
3. Run the backend using `npm start`.

### Frontend Application Setup
1. Ensure `expo-cli` is installed.
2. In the frontend folder, install necessary libraries using `npm install`.
3. Start the frontend application using `npm start`.
4. Scan the generated QR code in the Expo Go app to test the application on your Android phone.
 
 ## Deployment and Github Workflow

Describe your Git / GitHub workflow. Essentially, we want to understand how your team members shares a codebase, avoid conflicts and deploys the application.

 * Be concise, yet precise. For example, "we use pull-requests" is not a precise statement since it leaves too many open questions - Pull-requests from where to where? Who reviews the pull-requests? Who is responsible for merging them? etc.
 * If applicable, specify any naming conventions or standards you decide to adopt.
 * Describe your overall deployment process from writing code to viewing a live applicatioon
 * What deployment tool(s) are you using and how
 * Don't forget to **briefly explain why** you chose this workflow or particular aspects of it!

 ## Licenses 

 Keep this section as brief as possible. You may read this [Github article](https://help.github.com/en/github/creating-cloning-and-archiving-repositories/licensing-a-repository) for a start.

 * What type of license will you apply to your codebase?
 * What affect does it have on the development and use of your codebase?
 * Why did you or your partner make this choice?
