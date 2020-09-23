Till Payments Dev Test 
---

Create a restful Api which serves merchant transaction data to a basic frontend.

* Please spend a maximum of 4 hours on the test. If you are unable to finish in this time please send over the code in current state.
* Upload projects to either Github or Bitbucket public repository.
* Include any additional steps for running the projects in the readme. 
* Code **must be written in Typescript** for both frontend and backend. 
* Please use provided mock data. You are not required to create a database. 
* If you require additional clarification on any of the requirements please e-mail developer@tillpayments.com


#### Backend Requirements 

* Create a base restful api project using Nestjs - https://nestjs.com/
* Consider the data in `mockMerchants.json` and `mockCustomers.json`
* Create CRUD endpoints for customers.
* Create endpoints for returning all merchants and for returning a single merchant. 

#### Frontend Requirements 

* Create a React project using - https://reactjs.org/docs/create-a-new-react-app.html
* Introduce Typescript into the codebase.
* Display a list of all transactions for a particular merchant. With the functionality to switch merchants.
* Display a list of all customers.
    * Clearly show which merchant a customer belongs to.
    * Show Transactions for that customer with total amount spent.
* Be able to add a new customer to a merchant.
* Formant any amount displayed correctly. Mock amount's are in cent, i.e 100 is $1.00, or if Merchants currency is Euro €1.00

#### Bonus Requirements

* Shared types between frontend and backend.
* Basic Unit tests.