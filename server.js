const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const nikeRoute = require('./routes/nike');
const adidasRoute = require('./routes/adidas');
const dotenv = require('dotenv').config();
const Nike = require('./models/Nike');
const Adidas = require('./models/Adidas');

const PORT = process.env.PORT || 5000;

const env = process.env.NODE_ENV || 'development';

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use("/nike", nikeRoute);
app.use("/adidas", adidasRoute);
const MONGO_URI = process.env.MONGODB_URI;

const connection = mongoose.connect(MONGO_URI, {useNewUrlParser: true, useUnifiedTopology: true}, () => {
  console.log('Connected to db...');
});

var forceSsl = function (req, res, next) {
  if (req.headers['x-forwarded-proto'] !== 'https') {
      return res.redirect(['https://', req.get('Host'), req.url].join(''));
  }
  return next();
};

app.configure(function () {      
  if (env === 'production') {
      app.use(forceSsl);
  }
  // other configurations etc for express go here...
});



app.get('/', (req, res) => {
  res.send('Homeee');
});

const getDocCount = async () => {
  const nikeCount = await Nike.countDocuments();
  const adidasCount = await Adidas.countDocuments();
  return [nikeCount, adidasCount];
}

app.get('/collections', async (req, res) => {
  const counts = await getDocCount();
  const collections = Object.keys(mongoose.connection.collections);
  const collectionObj = collections.map((item, index) => {
    return {"collection": item, "documentCount": counts[index]};
  })
  res.send(collectionObj);
});

app.listen(PORT, () => {
  console.log('server running on port: ' + PORT);
});