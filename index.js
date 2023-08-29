const express = require('express');
const app = express();
const connectDB = require("./DB/database");

const PORT = process.env.PORT || 3000;

//Set up the body parser (without it we can't communicate with vars like body.name in API)
app.use(express.json({ extended: false }));

//establish DB 
connectDB();

//Establish APIs
app.use('/api/users', require('./api/users'));
app.use('/api/gameList', require('./api/gameList'));
app.use('/api/auth', require('./api/auth'));


// render the home page
app.get('/', function (req, res) {
  res.send('request');
});

//listen to port
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});