## How the Project Works

This project consists of a simple microservice built with Express.js and a main server that interacts with the microservice. The goal is to test API responses using Cypress for end-to-end (E2E) testing, with mock API responses provided by Mountebank.

- **Microservice** (`microservice.js`): Serves a JSON response with student data (`name`, `age`, `subject`) when the `/data` endpoint is hit.
- **Main Server** (`index.js`): Sends a GET request to the microservice endpoint and displays a message using the student's name.

## How the E2E Test Works

Cypress is used to test the interaction between the main server and the microservice. Mountebank is utilised to mock the microservice responses, allowing us to test different scenarios without needing the actual service running.

### Test Process:
1. **Clear Existing Stubs**: All previously created mock responses (imposters) are cleared.
2. **Set Up New Stubs**: Mountebank is used to mock responses for a specific endpoint.
3. **Test API Response**: Cypress visits the main server's root URL and checks if the response contains the expected text (e.g., `Hello World and Hey John`).

The test file sets up these conditions and validates the correct functioning of the mocked API.

## How the Stubs Work

Mountebank stubs allow you to simulate API responses by creating **imposters**. The stubs in this project are defined in the Cypress configuration (`cypress.config.js`), where you can set up different mock responses.

### Example Stub:
The imposter listens on port `8000` and responds with a JSON object that includes `name`, `age`, and `subject`. When a **GET** request is made to the root path (`/`), Mountebank returns a response with the status `200` and the mocked data.

```js
const imposter = {
  "port": 8000,
  "protocol": "http",
  "stubs": [{
    "predicates": [{
      "equals": {
        "path": "/",
        "method": "GET"
      }
    }],
    "responses": [{
      "is": {
        "statusCode": 200,
        "headers": { "Content-Type": "application/json" },
        "body": { name: 'John', age: 25, subject: 'History' }
      }
    }]
  }]
}

```
## How to Run

start the microservice:
```
node microservice.js
```

start the server with the production url run:
```
npm start
```
This will point the `index.js` to run in the production url using the `prod.env` file. This is
set in our `package.json `script where it points it to `node --inspect -r dotenv/config index.js dotenv_config_path=prod.env`

To run the cypress server run:
```
npm run cypress:server
```
To run the cypress test runner run:
```
npm run cypress:open
```
