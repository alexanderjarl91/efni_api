const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const productsRoute = require('./routes/products');
const dotenv = require('dotenv').config();

const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use("/products", productsRoute);
const MONGO_URI = process.env.MONGODB_URI;
mongoose.connect(MONGO_URI, {useNewUrlParser: true, useUnifiedTopology: true}, () => {
  console.log('Connected to db...');
});

app.get('/', (req, res) => {
  res.send('Homeee');
});


// app.get('/', (req, res) => {
//   Product.find()
//   .then((result) => {
//     res.send(JSON.stringify(result));
//   })
//   .catch((err) => {
//     console.log(err);
//   })
// });

app.listen(PORT, () => {
  console.log('server running on port: ' + PORT);
});