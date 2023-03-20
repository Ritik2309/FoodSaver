const mongoose = require('mongoose');
const express = require('express');
const corsModule = require('cors');
const config = require('config');
const app = express();
require('dotenv').config();

const recipes = require('./routes/recipes');
const users = require('./routes/users');
const auth = require('./routes/auth');
const ingredients = require('./routes/ingredients');
const foods = require('./routes/foods');
const diets = require('./routes/diets');
const social = require('./routes/socials');
const directMessage = require('./routes/directMessages');
const shopping = require('./routes/shopping')
const blockedUsers = require('./routes/blockedUsers')


const DB_URI = process.env.DB_URI;
const GoogleAPI = process.env.GoogleAPI


if (!config.get('JWTSecret')){
  console.error('private JWT key not defined!');
  process.exit(1); // exit code 1 is for errors
}
mongoose.connect(DB_URI)
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.error('Could not connect to MongoDB! Please fix'));

app.use(corsModule());
app.use(express.json());
app.get("/", (req,res)=>{
  res.send("Hello World");
})
app.use('/api/recipes', recipes);
app.use('/api/signup', users);
app.use('/api/getUser', users);
app.use('/api/login', auth);
app.use('/api/ingredients', ingredients);
app.use('/api/load_data', foods);
app.use('/api/load_data', recipes);
app.use('/api/load_data', ingredients);
app.use('/api/load_data', diets);
app.use('/api/load_data', directMessage);
app.use('/api/directMessage', directMessage);
app.use('/api/Social_posts', social);
app.use('/api/shopping', shopping);
app.use('/api/blockedUsers', blockedUsers)
app.get('/api/googleAPI',  (req,res)=>{res.send(GoogleAPI);})


const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
