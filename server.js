const express = require('express');
const { connect } = require('mongoose');
const connectDB = require('./config/db');

const app = express();

//Connect Database
connectDB();

//Init Middleware
//This lets us get data from req.body (from our api calls)
app.use(express.json({ extended: false }))

//Test endpoint
app.get('/', (req, res) => {
    res.send('API Running')
})

//Define Routes
app.use('/api/auth', require('./routes/api/auth'))
app.use('/api/profile', require('./routes/api/profile'))
app.use('/api/users', require('./routes/api/users'))

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
    console.log(`Server running on ${8000}`)
})