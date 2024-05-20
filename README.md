<h1 align="center">Welcome to saltibarsciai 👋</h1>
<p>
  <img alt="Version" src="https://img.shields.io/badge/version-1.0.0-blue.svg?cacheSeconds=2592000" />
  <a href="#" target="_blank">
    <img alt="License: ISC" src="https://img.shields.io/badge/License-ISC-yellow.svg" />
  </a>
</p>

> Programu sistemu inzinerijos modulio projektas
## Description
This is a project for the course "Programu sistemu inzinerijos modulis". Our website is targeted to be used as student/teacher platform for giving/taking quizzes
## ReactJS + Vite
Frontend is made with
Vite, Bootstrap, ReactJS
## NodeJS + ExpressJS + MySQL
Backend is made with
NodeJS, ExpressJS, MySQL,
## Install
Same command for main folder and backend/frontend sub-folders
```sh
npm install
```
## Running
Need a 
Frontend
```sh
npm run front
```
Backend
```sh
npm run end
```
## Database
Need to create a database with name "projektas" or change it as you need
in backend/config/config.json change the username, password and host to yours
```sh
 "development": {
    "username": "root",
    "password": null,
    "database": "projektas",
    "host": "localhost",
    "dialect": "mysql",
    "logging": false
  },
  ```
## UML Architecture Diagram

### Components:

1. **Frontend**:
   - **Technologies**: ReactJS, Vite, Bootstrap
   - **Functionality**: User Interface for students and teachers to take and give quizzes.

2. **Backend**:
   - **Technologies**: NodeJS, ExpressJS
   - **Functionality**: API endpoints to manage quizzes, users, and other related data.

3. **Database**:
   - **Technology**: MySQL
   - **Functionality**: Stores data related to users, quizzes, scores, etc.

### Relationships:

- **Frontend to Backend**:
  - The frontend communicates with the backend via RESTful API calls.
  
- **Backend to Database**:
  - The backend performs CRUD operations on the MySQL database.

### UML Diagram Elements:

1. **Classes/Components**:
   - **Frontend Component**: Handles user interactions and displays data.
   - **Backend Component**: Manages business logic and API endpoints.
   - **Database Component**: Stores persistent data.

2. **Interfaces**:
   - **API Interface**: Defines endpoints for the frontend to interact with the backend.
   - **Database Interface**: Defines queries and interactions with the MySQL database.

### Sample UML Diagram (Class Diagram):

```plaintext
+--------------------+
|    Frontend        |
|--------------------|
| - ReactJS          |
| - Vite             |
| - Bootstrap        |
|--------------------|
| + fetchQuizzes()   |
| + submitQuiz()     |
| + viewResults()    |
+---------+----------+
          |
          | REST API Calls
          v
+--------------------+
|    Backend         |
|--------------------|
| - NodeJS           |
| - ExpressJS        |
|--------------------|
| + getQuizzes()     |
| + postQuiz()       |
| + getResults()     |
+---------+----------+
          |
          | SQL Queries
          v
+--------------------+
|    Database        |
|--------------------|
| - MySQL            |
|--------------------|
| + Quizzes Table    |
| + Users Table      |
| + Results Table    |
+--------------------+
  ## Contributors
  >Justina Ivoškaitė: jusivo@ktu.lt </br>
  >Gvidas Valionis: gvival@ktu.lt</br>
  >Klemensas Barauskas: klebar@ktu.lt</br>
  >Justina Čečkauskaitė: juscec@ktu.lt</br>
