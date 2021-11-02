# Etherea

## Description 

Our app encourages Sustainable Development Goals such as preventing pollution and human-induced climate change. The app aims to make individuals live more sustainably by setting monthly themes with goals they can check off daily and a leaderboard for people to share and compete against and a calculator that quantifies their impact. Users who wants to minimize their carbon footprint, but don't have the motivation to or users who want to improve their lifestyles, but are ignorant on how to make that happen would find value in this app. The application solves this problem because it encourages users meet Sustainable Development Goals by informing users about the impact they are making and allowing them to compete through a leaderboard.

## Key Features
- **User registration/login**: Users can create accounts and sign into those accounts from the application. Passwords are hashed and salted using bcrypt before being stored in the database.
- **JWT authentication**: The backend REST API uses JWT authentication to ensure requests sent to the API cannot be forged as another user.
- **Leaderboard**: A global leaderboard that displays the top users for a month's theme based on their gathered amount of points.
- **Impact Statistics**: Displays statistics on the impact a user has had based on their contributions and completed tasks.
- **Tasks**: Allows a user to choose and check off tasks as they are completed.

## Instructions
### Accessing the Application
1. Install the Expo Go app on an Android device. The application can be accessed from the following Expo project page: [https://expo.io/@ethereadev/eth](https://expo.io/@ethereadev/eth)
- Note: The backend API is deployed to [https://etherea-dev.herokuapp.com/](https://etherea-dev.herokuapp.com/) and calls can be made to the REST API there.

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

 ### Github Workflow
- Although we didn't use many git pulls, we ensured that we worked on our separate files through constant communication to avoid merge conflicts.
- For the backend especially, modular routing ensured that merge conflicts did not occur.

#### Reasons for this workflow
Since our tasks were distributed and understood early on, we ensured that code remained modular. Additionally, we did not want to have to spend too much time reviewing and merging pull requests. This workflow allows our group to freely commit changes without merge conflicts, however, it is up to the individual to ensure that they take responsibility for their piece of code.

### Deployment
- Testing amongst our team was done mostly locally and did not require deployment. Deployment was only done once our team agreed on the current state of the project.
- The backend was deployed using a shared Heroku account which allowed any member of our team to manually deploy once features were added and tested.
- The frontend was deployed using a shared Expo account.

#### Deployment Process
1. The changes get committed and pushed.
2. The backend is manually deployed from the Github branch using the Heroku web application dashboard.
3. The frontend is deployed from the command line using `expo publish`.
4. The frontend is run using the Expo Go app and scanning the provided QR code on the published project's page.

 ## Licenses 

 We will be using the GPLv3 license in our codebase. This allows the code to be modified and shared freely, but requires the source code to be disclosed.

 Our partner has permitted the sharing of anything in our codebase that we have made on our own, but any additional changes made by the partner will be close-sourced and not available to the public.
