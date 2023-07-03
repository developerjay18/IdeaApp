const express = require('express');
const serverConfig = require('./config/server.config');
const mongoose = require('mongoose');
const dbConfig = require('./config/db.config');
const userModel = require('./models/user.model');
const bcrypt = require('bcrypt')

const app = express();

// connecting to database
mongoose.connect(dbConfig.DB_URL);
const db = mongoose.connection;

db.on('error', () => {
  console.log('error occured in connecting database');
});
db.once('open', () => {
  console.log('Database sucessfully created and connected');
  init();
});

// creating Admin and check it is already presented or not
async function init() {
  let admin = await userModel.findOne({
    userId: 'admin',
  });

  if (admin) {
    console.log('Admin is already created');
    console.log(admin);
    return;
  }

  admin = await userModel.create({
    name: 'Jay Rai',
    userId: 'admin',
    email: 'raijay2003@gmail.com',
    password: bcrypt.hashSync('admin@18vk',8),
    userType: 'ADMIN',
  });

  console.log(admin);
}

app.listen(serverConfig.PORT, () => {
  console.log(`server started running on port ${serverConfig.PORT}`);
});
