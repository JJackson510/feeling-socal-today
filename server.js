const express = require('express');
const mongoose = require('mongoose');
const app = express();
const Port =process.env.PORT || 3001;

app.use (express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.set('debug', true);

app.listen(Port, () => console.log(`Now connected to localhost:${Port}`));