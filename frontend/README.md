To connect to localhost backend server from android phone with usb debugging enabled:

Enable usb debugging, connect phone to computer
Install adb so it can be accesed from command line
Navigate to the frontend folder
run: adb start-server
run: adb reverse tcp:3000 tcp:3000
set headers.js domain to 'http://{IPaddress}:3000/'
run: expo start
Click "Run on android device/Emulator"

To connect to localhost backend server from android phone with tunnel:

Install the expo app
Navigate to the frontend folder and run type expo start
Scan the QR code with the expo app
