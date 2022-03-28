const express = require('express');
const mongoose = require('mongoose');
const app = express();
const Port =process.env.PORT || 3001;

app.use (express.json());
app.use(express.urlencoded({ extended: true }));

app.use(require('./routes'));

mongoose.set('debug', true);

mongoose.connect(process.env.MONGODB_uri || 'mongodb://localhost:27017/felling-social', {
    useNewParsers: true,
    useUnifiedTopology: true
});

app.listen(Port, () => console.log(`Now connected to localhost:${Port}`));