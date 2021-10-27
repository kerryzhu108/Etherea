# Etherea Application Backend
REST API to be used as Etherea's backend.

## REST API Documentation
### Endpoints
- [Login](docs/examples/login.md)
- [Register](docs/examples/register.md)

## Running the backend
The backend can be run using the following command:
```
npm install && npm start
```

To ensure proper configuration, ensure that your `.env` file, located in the backend directory root, contains the following information:
```
DB_HOST=<database host>
DB_USER=<username for accessing database>
DB_PASS=<password for accessing database>
DB_PORT=<database port>
TOKEN_SECRET=<random 128 character string for encrypting JWT>
PORT=<the port the backend server should run on>
```