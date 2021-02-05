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

// Test function for debugging
// const test = (res, req, next) => {
//   req.test = req.test || 0;
//   console.log('test ', req.test);
//   req.test++;
//   next();
// };
app.use(cors());

// app.use(function (req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
//   next();
// });
// app.options('*', cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// app.use(function(req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//   next();
// });


app.use("/nike", nikeRoute);
app.use("/adidas", adidasRoute);
const MONGO_URI = process.env.MONGODB_URI;

const connection = mongoose.connect(MONGO_URI, {useNewUrlParser: true, useUnifiedTopology: true}, () => {
  console.log('Connected to db...');
});

// Force redirect to https from http
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
  res.redirect('https://efni-cms.netlify.app/');
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