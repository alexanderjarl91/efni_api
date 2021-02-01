# Efni Headless CMS API :rocket: v 0.1.0


## Description

Using the MERN stack essentials (MongoDB, Express & Node.js) this RESTful API delivers product data for e-commerce frontends. This API is hosted on Heroku and was created for Module 6.

This backend is meant for frontend developers to easily be able create collections for different e-commerce clients, all hosted in one database, and manipulate them using the Efni Headless CMS.

https://efni-api.herokuapp.com/


## Authentication

This API contains confidential information and therefore an API key is required to access it's endpoints. If you want to use Efni CMS to manage your e-commerce data, contact us for an API key and further information.


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

This endpoint lists all collections within the database. Each e-commerce website will have its unique collection that contains data. 

### /nike

```
https://efni-api.herokuapp.com/nike
```

This is a an open demonstration endpoint. This example lists an array of products from the nike collection.

### /adidas

```
https://efni-api.herokuapp.com/adidas
```

This is a locked demonstration endpoint that delivers the adidas collection. It lists products using the same model as the the /nike endpoint but is only accessable with an API key.


### /collection/<_id>

```
https://efni-api.herokuapp.com/YourCollection/YourProductID
```

This is a demonstration endpoint that delivers a single document in a specific collection.


#
