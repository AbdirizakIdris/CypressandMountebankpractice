const { defineConfig } = require('cypress')

const mountebankUrl  = 'http://localhost:2525/imposters'
const axios = require('axios')

module.exports = defineConfig({
  e2e: {
    baseUrl: 'http://localhost:4000',
    fileServerFolder: './test/cypress',
    specPattern: './test/cypress/*.cy.{js,jsx,ts,tsx}',
    supportFile: false,
    setupNodeEvents(on, config) {
      on('task', {
        setupStubs (imposter) {
         return axios.post(mountebankUrl, imposter)
          .then(response => {
            return true
          })
          .catch(error => {
              console.error(`Error adding imposter: ${error.message}`)
              return false
          })
        },
        clearStubs() {
          return axios.delete(mountebankUrl)
            .then(response => {
              return true
            })
            .catch(error => {
            console.error(error)
            return false
            })
          }
      })
    }
  }
})
