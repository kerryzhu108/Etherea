To connect to localhost backend server from android phone

Enable usb debugging, connect phone to computer
Install adb so it can be accesed from command line
run: adb start-server
run: adb reverse tcp:3000 tcp:3000
set headers.js domain to 'http://{IPaddress}:3000/'
run: expo start
Click "Run on android device/Emulator"

Or dm Zach for easier way

Questions for TA: 
Best way to store userid? Currently using AsyncStorage but it is.. async
Current views navigation by putting them all in App.js optimal?