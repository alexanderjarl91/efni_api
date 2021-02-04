const express = require('express');
// const cors = require('cors');
const router = express.Router();
const Nike = require('../models/Nike');
var admin = require("firebase-admin");
// var serviceAccount = require("../efni-cms-firebase-adminsdk-61zph-cebca0c788.json");
const { firestore } = require('firebase-admin');

// express().use(cors());

// Initialize firebase 
// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount)
// });
console.log('pk: ', process.env.PRIVATE_KEY);
admin.initializeApp({
  credential: admin.credential.cert({
    "type": process.env.FIREBASE_TYPE,
    "projectId": process.env.PROJECT_ID,
    "private_key_id": process.env.PRIVATE_KEY_ID,
    "private_key": process.env.PRIVATE_KEY.replace(/\\n/g, '\n'),
    "client_email": process.env.CLIENT_EMAIL,
    "client_id": process.env.CLIENT_ID,
    "auth_uri": process.env.AUTH_URI,
    "token_uri": process.env.TOKEN_URI,
    "auth_provider_x509_cert_url": process.env.AUTH_PROVIDER_X509_CERT_URL,
    "client_x509_cert_url": process.env.CLIENT_X509_CERT_URL
  })
});

// Initialize firestore
const db = firestore();

// Force redirect to https from http
router.use('*', function (req, res, next) {
  if (req.headers['x-forwarded-proto'] === 'https') {
          // request was via https, so do no special handling
          next();
  } else {
          // request was via http, so redirect to https
          res.redirect('https://' + req.headers.host + req.url + 'nike');
  }
});


// Get user data from firestore
const getUserData = async () => {
  const usersRef = db.collection('users');
  const userArray = [];
  const snapshot = await usersRef.get();

  snapshot.forEach((doc) => {
    userArray.push(doc.data());
  });
  return userArray;
}

let canPost = false;

// Get all products
router.get('/', async (req, res) => {
  try {
    const products = await Nike.find();
    res.json(products);
  } catch (error) {
    res.json(error);
  }
});

// Get specific product
router.get("/:productId", async (req, res) => {
  try {
    const product = await Nike.findById(req.params.productId);
    res.json(product);
  } catch (err) {
    res.status(404).json({ msg: `No product with the given id: ${req.params.productId}`, error: err });
  }
});

const checkUserAccess = async (req) => {
  // Get an array with firestore user data
  const userData = getUserData();
  const authToken = req.get('Authorization');
  console.log('token: ', authToken);
  console.log('id: ', process.env.PROJECT_ID)
  // Get authorized user's token
  const decodedToken = await admin
  .auth()
  .verifyIdToken(authToken);
  console.log('dec token: ', decodedToken);
  // Match authorized user with a firestore user 
  (await userData).forEach((user) => {
    if(user.useruid === decodedToken.uid) {
      // Check if matched user has access to a collection, if true: then flag canPost as true
      if(user.access.includes('nike')) {
        console.log('returning true from access');
        canPost = true;
      } else {
        console.log('returning false from access');
        canPost = false;
      }
    }
  });
  // const uid = decodedToken.uid;
  // console.log('DecTok: ', JSON.stringify(decodedToken));
  // console.log('InPostUserData: ', userData);
};

// Insert product
router.post("/", async (req, res) => {

  checkUserAccess(req).then(() => {
    console.log('runnning check access, can post: ', canPost);
    // Post product with nike model
    const postProduct = async () => {
      console.log('CAN SHE POST?: ', canPost);
      if(canPost) {
        // New post made from the Nike.js schema
        const newProduct = new Nike({
          productName: req.body.productName,
          productPrice: req.body.productPrice,
          productImg: req.body.productImg,
          productOnSale: req.body.productOnSale,
          productDescription: req.body.productDescription
        });
        // Save post to MongoDB
        try {
          const savedProduct = await newProduct.save();
          res.json(savedProduct);
          console.log('Post saved to db');
        } catch (err) {
          res.json({ message: err });
          console.log('catch error')
        }
      } else {  // If user fails canPost check then send error code
        res.status(401).json({ msg: `User does not have access to this collection`});
        console.log('sending code 401');
      }
    }
    postProduct();
  })
});

// Update product
router.patch("/:productId", async (req, res) => {
  checkUserAccess(req).then( async () => {
    if(canPost) {
      try {
        const post = await Nike.findOne({ _id: req.params.productId })
    
        if (req.body.productName) {
          post.productName = req.body.productName
        }
    
        if (req.body.productPrice) {
          post.productPrice = req.body.productPrice
        }
        
        if (req.body.productImg) {
          post.productImg = req.body.productImg
        }
        
        if (req.body.productOnSale) {
          post.productOnSale = req.body.productOnSale
        }
        
        if (req.body.productDescription) {
          post.productDescription = req.body.productDescription
        }
    
        await post.save()
        console.log('Product edited');
        res.send(post)
      } catch {
        res.status(404)
        res.send({ error: "Post doesn't exist!" })
      }
    }  else {  // If user fails canPost check then send error code
      res.status(401).json({ msg: `User does not have access to this collection`});
      console.log('sending code 401');
    }
  })
})

// Delete Post
router.delete("/:productId", async (req, res) => {
  checkUserAccess(req).then(async () => {
    if(canPost) {
      try {
        const removedProduct = await Nike.deleteOne({_id: req.params.productId });
        res.json(removedProduct);
        console.log('Deleted item!');
      } catch (err) {
        res.json({ message: err });
      }
    } else {  // If user fails canPost check then send error code
      res.status(401).json({ msg: `User does not have access to this collection`});
      console.log('sending code 401');
    }
  })
});

module.exports = router;