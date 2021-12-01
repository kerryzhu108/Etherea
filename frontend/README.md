# Getting started
Install the Expo cli: https://docs.expo.dev/workflow/expo-cli/
Install the Expo app on mobile device
cd frontend
npm install
expo start
Scan the QR code with the expo app
# To connect to localhost backend server from phone

Enable usb debugging, connect phone to computer
Install adb so it can be accesed from command line
run: adb start-server
run: adb reverse tcp:3000 tcp:3000
set headers.js domain to 'http://{IPaddress}:3000/'
run: expo start
Click "Run on android device/Emulator"

# Publish
running "expo publish" in the terminal will generate a link with the qr code to the deployed app