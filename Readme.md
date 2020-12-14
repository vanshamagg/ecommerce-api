# Ecommerce API
 
 This is a simple API for an Ecommerce Web Application, purely implemented in ExpressJS. It provies various routes for CRUD of products and users. We have implemeneted MongoDB Atlas as the Db provider. 

 ## Paths/EndPoints

 ### / (HOME)

* `GET /product/add` - Form to add a product
* `GET /product/update` -  Form to update a product (may not work properly)
* `GET /user/signin` -  Form to signin 
* `GET /user/dashboard` - redirection to the dashboard after signin


### /auth

* `POST /` - Local Authentication.
* `GET /logout` -  Logout.
* `GET /google`-  Authentication using Google. 
* `GET /google/redirect`- Google Redirection/Callback URL.

### /api/user

Sign-in is required to access this route.

* `GET /cart` -  Retrive Cart items.
* `PATCH /cart` -  Edit Cart Items.

Administrator priveleges are needed to access this route.

* `POST /` - Create a New User.
* `GET /` - Get details of a existing user.
* `PATCH /:id` -  Edit a user using his MongoDB ID.
* `DELETE /:id` - Delete a User using his MongoDb ID.

### /api/product

Sign-in is required to access this route.

* `POST /` - Create a new product.
* `GET /` -  Retrieve all products.
* `GET /:id` -  Get a specific product using its MongoDB _id.
* `PATCH /:id` - Edit a specific product using its MongoDB _id.
* `DELETE /:id` -  Delete a specific product using its MongoDB _id.

For Keys and other crdentials, feel free to contact me at 
_*vanshamagg@gmail.com*_
