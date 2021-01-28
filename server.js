const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const productsRoute = require('./routes/products');
const nikeRoute = require('./routes/nike');
const adidasRoute = require('./routes/adidas');
const staffRoute = require('./routes/staff');
const dotenv = require('dotenv').config();
const Product = require('./models/Product');
const Staff = require('./models/Staff');

const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use("/nike", nikeRoute);
app.use("/adidas", adidasRoute);
app.use("/staff", staffRoute);
const MONGO_URI = process.env.MONGODB_URI;

const connection = mongoose.connect(MONGO_URI, {useNewUrlParser: true, useUnifiedTopology: true}, () => {
  console.log('Connected to db...');
});

app.get('/', (req, res) => {
  res.send('Homeee');
});

const getDocCount = async () => {
  const prodCount = await Product.countDocuments();
  const staffCount = await Staff.countDocuments();
  return [prodCount, staffCount];
}

app.get('/collections', async (req, res) => {
  const counts = await getDocCount();
  const collections = Object.keys(mongoose.connection.collections);
  const collectionObj = collections.map((item, index) => {
    return {"collection": item, "documentCount": counts[index]};
  })
  res.send(collectionObj);
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