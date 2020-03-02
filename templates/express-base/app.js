const express = require('express')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const routes = require('./routes/index')
const errorHandlers = require('./handlers/errorHandlers')

// create our Express app
const app = express()

// view engine setup
// const path = require('path')
// app.set('views', path.join(__dirname, 'views'))
// app.set('view engine', 'pug')

// serves up static files from the public folder. Anything in public/ will just be served up as the file it is
// app.use(express.static(path.join(__dirname, 'public')))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// populates req.cookies with any cookies that came along with the request
app.use(cookieParser())

app.use('/', routes)

app.use(errorHandlers.notFound)

if (app.get('env') === 'development') {
  app.use(errorHandlers.developmentErrors)
}

app.use(errorHandlers.productionErrors)

module.exports = app
