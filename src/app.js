const express = require('express');
const { userRoutes } = require('./app/modules/user/user.route');
const app = express();

app.use(express.json())

app.get('/', (req, res) => {
    res.send("hello world ")
})

app.use('/user', userRoutes)

module.exports = app; 