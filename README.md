# Assignment




# Backend Server Documentation
This documentation provides an overview of the backend server code and its functionalities.

### Setup and Configuration
- The backend server is built using Express.js, a Node.js web application framework.
- MongoDB is used as the database, and the connection URL is specified in the .env file using the DB_URL environment variable.
- Cross-Origin Resource Sharing (CORS) is enabled to allow cross-origin requests.

### API Endpoints
This documentation provides information about the User API endpoints and their usage.

## Get All Users

### Request
GET /users/vs


- Returns an array of user objects with the following properties:

  - id (Number): User ID
  - first_name (String): First name of the user
  - last_name (String): Last name of the user
  - email (String): Email address of the user
  - gender (String): Gender of the user
  - income (String): Income of the user
  - city (String): City of the user
  - car (String): Car of the user
  - quote (String): Quote of the user
  - phone_price (String): Phone price of the user

### Response

- Status: 200 OK
- Description:This endpoint retrieves all users from the database.


## Get Users by Income and Car


### Request
GET /users/income-car

- The UserModel.find() function is used with a query object containing the following conditions:
     - $or: [{ car: "BMW" }, { car: "Mercedes" }] - Users who own a BMW or Mercedes.
     - income: { $lt: "$5" } - Users with an income less than $5.
- The retrieved users are then sent as a JSON response using res.json(users).

### Response

- Status: 200 OK
- Description: Returns users who own a BMW or Mercedes and have an income less than $5.

## Get Male Users with Expensive Phones


### Request
GET /users/male-phone


- The UserModel.find() function is used with a query object containing the following conditions:
    - gender: "Male" - Users with gender set to "Male".
    - $expr: { $gt: [{ $toInt: "$phone_price" }, 10000] } - Users with a phone price greater than $10,000.
- The retrieved users are then sent as a JSON response using res.json(users).

### Response

- Status: 200 OK
- Description: Returns male users who have a phone price greater than $10,000.

## Get Users by Last Name, Quote, and Email


### Request
GET /users/last-name-quote-email


- The UserModel.find() function is used with a query object containing the following conditions:
    - last_name: { $regex: /^M/i } - Users with a last name starting with 'M' (case-insensitive regex).
    - email: { $regex: /M/i } - Users with an email containing 'M' (case-insensitive regex).
    - $expr: { $gt: [{ $strLenCP: "$quote" }, 15] } - Users with a quote length greater than 15 characters.
- The retrieved users are then sent as a JSON response using res.json(users).

### Response

- Status: 200 OK
- Description: Returns users whose last name starts with 'M', email contains 'M', and the length of the quote is greater than 15 characters.

## Get Users by Car and Email


### Request
GET /users/car-email

- The UserModel.find() function is used with a query object containing the following conditions:
   - car: { $in: ["BMW", "Mercedes", "Audi"] } - Users who own a BMW, Mercedes, or Audi.
   - email: { $not: /\d/ } - Users with an email that does not contain any digits.
- The retrieved users are then sent as a JSON response using res.json(users).

### Response

- Status: 200 OK
- Description: Returns users who own a BMW, Mercedes, or Audi and have an email without any digits.

## Get Top Cities with User Count and Average Income


### Request
GET /users/top-cities


- The UserModel.aggregate() function is used with an aggregation pipeline to perform the following operations:
    - $group stage: Grouping users by city and calculating the user count and total income.
    - $project stage: Creating a projection to include city, user count, and average income.
    - $sort stage: Sorting the results by user count and average income in descending order.
    - $limit stage: Limiting the results to the top 10 cities.
- The retrieved cities are then sent as a JSON response using res.json(cities).

### Response

- Status: 200 OK
- Description: Returns the top 10 cities based on user count and average income. The response includes the city name, user count, and average income.





