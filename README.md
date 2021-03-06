# Efni Headless CMS API :rocket: v 0.1.0


## Description

Using the MERN stack essentials (MongoDB, Express & Node.js) along with Firebase, this RESTful API delivers product data for e-commerce frontends. Efni API is hosted on Heroku and was created for Module 5.

This backend is meant for frontend developers to easily be able to create collections for different e-commerce clients, all hosted in one database, and manipulate them using the Efni Headless CMS React frontend.

The API makes use of a MongoDB database to persist data for each e-commerce frontend, while Firebase Authentication contains user authentication data and Firestore contains custom claims for each user (i.e. user role & collection access).

Root Endpoint:
https://efni-api.herokuapp.com/


The Efni CMS 

https://efni-cms.netlify.app/

## Dependencies

- Express
- Mongoose
- Firebase Admin SDK
- Cors
- Routes
- Body Parser


## Usage & authentication

To create a new collection, backend dev must create a new model and endpoint on the backend, as well as creating a new collection on MongoDB Atlas.

All request methods, excluding GET, need to be sent from the CMS. The /adidas demonstration endpoint is left open for testing. The GET request is open during development but eventually in later versions will need an API key for access.


## Security
Both the API and CMS are SSL certified. Request methods to the API are restricted to authenticated users within the CMS with Firebase authentication tokens, specific roles & access. 


## Responses
All responses return data in JSON format.


#### Model Example:
```
GET /yourEcommerceEndpoint
```

```
[
    { "productName":"Your product",
      "productPrice":"200",
      "productImg":"image.png",
      "productOnSale":"true",
      "productDescription":"A description of your product"
    }
]
```

## Endpoints;




### /collections

```
https://efni-api.herokuapp.com/collections
```

This endpoint lists all collections within the database. Each e-commerce website has its unique collection of data. 

### /adidas

```
https://efni-api.herokuapp.com/adidas
```
This is a an open demonstration endpoint. This example lists an array of products from the adidas collection.


### /nike

```
https://efni-api.herokuapp.com/nike
```
This is a locked demonstration endpoint that delivers the nike collection. This endpoint only accepts request methods from users authenticated with Google Firebase within the CMS frontend.



### /collection/<_id>

```
https://efni-api.herokuapp.com/YourCollection/YourProductID
```

This is an open demonstration endpoint that delivers a single document in a specific collection.


#
