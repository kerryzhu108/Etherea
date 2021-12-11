# Frontend
## Running the frontend locally

### A few things before running the frontend:
Ensure that the backend server is running on the IP address of your machine. For example, if the backend is running on a machine with the local IP address 192.168.0.21, ensure that the backend server is configured to run on this address.

After this is finished and the backend is up and running, navigate to `frontend/apis/headers.js` to configure the frontend to properly connect to the backend. Set `const domain` to the appropriate IP address (which, in this example case, would be `const domain = "http://192.168.0.21:3000"`).

1. Install the Expo cli: https://docs.expo.dev/workflow/expo-cli/
2. Install the Expo app on a mobile device
3. Run the following commands to install and run the frontend using expo.

```bash
cd frontend
npm install
expo start
```

4. Scan the provided QR code with the Expo Go app

## Publishing
To publish an app with Expo, ensure that you have the Expo CLI installed and that you have an Expo account.

To publish the app, run the following in the `frontend` directory.
```bash
expo publish
```

Doing so will generate a QR code with a link to your published app.
