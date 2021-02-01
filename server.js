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

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use("/nike", nikeRoute);
app.use("/adidas", adidasRoute);
const MONGO_URI = process.env.MONGODB_URI;

const connection = mongoose.connect(MONGO_URI, {useNewUrlParser: true, useUnifiedTopology: true}, () => {
  console.log('Connected to db...');
});

app.get('*', function (req, res, next) {
  if (req.headers['x-forwarded-proto'] === 'https') {
          // request was via https, so do no special handling
          next();
  } else {
          // request was via http, so redirect to https
          res.redirect('https://' + req.headers.host + req.url);
  }
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

app.use((req, res) => {
  res.status(400).json({msg: 'Nothing found on this path: ' + req.url})
});

app.listen(PORT, () => {
  console.log('server running on port: ' + PORT);
});