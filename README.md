# ca-dev-platforms-backend

//User managment

# Register

URL: api/register
Method: POST

Request body:

{
"firstName": "name",
"lastName": "lastname",
"email": "your-email@gmail.com",
"password": "password"
}

# Login

URL: api/login
Method: POST

Request body:

{
"email": "your-email@gmail.com",
"password": "password"
}

//Cars Route |||||

# Get all cars

URL: api/cars
Method: GET

# Post a car

URL: api/cars
Method: POST

Request body:

{
"brand": "brand",
"color": "color",
"price": "price",
"img": "img-url"
}

# Update the car

URL: api/cars/id
Method: PUT

Request body:

{
"brand": "updated-brand",
"color": "updated-color",
"price": "updated-price",
"img": "updated-img-url"
}

# Delete a car

URL: api/cars/id
Method: DELETE
