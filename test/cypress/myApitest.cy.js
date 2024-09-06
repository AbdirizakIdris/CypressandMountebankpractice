const mountebankUrl  = 'http://localhost:2525/imposters'
const axios = require('axios')

const imposter = {
    "port": 8000,
    "protocol": "http",
    "stubs": [{
      "predicates": [{
        "equals": {
          "path": "/data",
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

describe('My api call', () => {
       it('should return name', () => {
        cy.task('clearStubs', imposter)
        cy.task('setupStubs', imposter)  
        cy.visit('/')
        cy.get('body').should('contain', 'Hello World and Hey John')
   })
})
    
