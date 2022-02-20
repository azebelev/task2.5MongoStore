const express = require('express')
const login = require('./routes/login')
const register = require('./routes/register')
const logout = require('./routes/logout')
const items = require('./routes/items')
const session = require('express-session')
const mongoose = require('mongoose')
const MongoStore = require('connect-mongodb-session')(session)

const app = express()
const PORT = 8080
const MONGODB_URI = 'mongodb+srv://password.fi69x.mongodb.net/problemBook'
const store = new MongoStore({
  collection: 'sessions',
  uri: MONGODB_URI
})


app.use(express.static('public'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(session({
  secret: 'some secret value',
  resave: false,
  saveUninitialized: false,
  store
}))


app.use('/api/v1/items', items)
app.use('/api/v1/login', login)
app.use('/api/v1/logout', logout)
app.use('/api/v1/register', register)

async function startServing() {
  await mongoose.connect(MONGODB_URI, { useNewUrlParser: true })

  app.listen(PORT, () => {
    console.log(`server on port ${PORT}`)
  })

}

startServing()

