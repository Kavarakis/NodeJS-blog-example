# NodeJS-blog-example
## **Note: Frontend - Still in progress...**
##  **NodeJS + Express + Sequelize + PassportJS + Mocha + Chai + Bcrypt + ESlint + Babel**
<br />

### Project Setup:
1. Clone repository
2. npm install
3. npm start

- Note: Sequelize CLI needs to be installed globally (Sequelize CLI [Node: 8.10.0, CLI: 3.2.0, ORM: 4.32.6] )
```
npm install -g sequelize-cli
``` 
- For running tests (./test):

```
npm test
```
<br />

### Database information (./config/config.json):
- Migrations (./migrations)
```
npm run migrate
```
- Seeders (./seeders)
```
npm run seed
```

- Removing all tables from db:
```
npm run drop
```

 **Description:**
```
 {
    "username": "semir",
    "password": "12345",
    "database": "blogdb",
    "host": "127.0.0.1",
    "dialect": "mysql"
  }
```

<br />

Initialization of database with default seeders and start of the app:
```
npm run restartdb
```

 #### The goal is to create a Blog backend REST API which will provide the basic backend functionalities for the Blog Content Management System.

<br />

**Task description**

You need to be able to create new blog Posts via the REST API. Also, all the blog Posts
should have a Comment section associated with them and you should be able to list
Comments for each Post separately.
Only authenticated Users should be eligible to create and update the Posts and Comments,
but the overview of all Posts together an overview of a single Post with Comments should be
accessible by everyone.

Please follow the REST API principles, write comments and create tests that will cover some
of the functionalities. You don’t have to test everything, choose a few calls and test them out.
Some of the additional requirements are stated below. Anyway, we trust you that you will
cover all the industry best practices that are not stated below and that you will deliver this
task based on your level of knowledge.

#### Additional requirements

*Posts*
- The main information associated with the Post model are title, description, and body
- The API endpoint for all the blog Posts should have implemented pagination (default
10 Posts per page)

*Comments*

- The main information that the Comment model should contain is the comment
body/text
- The API endpoint for all the Comments should have implemented pagination (default
20 Comments per page)

*User*

- The main information that the User model should contain: first name, last name,
email and password
- The authentication and authorization should be done within the industries best
practices
