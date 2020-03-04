require('dotenv').config({ path: 'variables.env' })

// Start our app!
const app = require('./app')
const PORT = process.env.PORT || 8080

const server = app.listen(PORT, () => {
  console.log(`Express running → PORT ${server.address().port}`)
})
