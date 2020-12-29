# Groupe Assignator


## Description:

_______________________

This project was made end of 2020. The purpose is to show my skill in full-stack javascript development.

In this project i do front in react-js and back in nodeJS.


## Goal of the project:

____________________

This project is a complete website. This webiste have for purpose to facilitate the creation of group of students always different inside a promotion.
I made this project because i was the mentor of 25 trainees and i had to create groups of students for each project and take care to don't put same students always together.
With this website i can ask my trainees to register themself in a promotion group (the promotion is created by the administrator; me) and when i have to create some new groups for a project the website can do it automaticaly and send the group who was created directly to my students by email.


## How to run the project:

__________________________

1. Database configuration
  - Create a database with phpMyAdmin (or another tool)
  - Go to **./api/db/index.js** (line 3) and enter the name of the database you created; the name of your user and is password.

2. Component adjustement
  - Go to **./front/src/organisms/InscriptionForm/index.js**.
  - Line 24; function **handleConnexion** put the email & password of the user you will register.

3. Run the project
  - Open two terminals
  - In **api** folder run one term with the cmd: *nodemon index.js*
  - In **front** folder run your other term with the cmd: *npm run start*

### Techno I used:

____________________

For the front part i used ***ReactJS***, with **Redux**.
For the backend part (the api) i used ***NodeJS*** with **JWT** and **Sequelize**.
For the BDD i used ***SQL***.

The communication between Front and Back is assured by **Axios**

**Chai** & **Mocha** for the TDD tests.

### Achievements i want emphasize:

________________________

There is some technical point particulary cool on this project. I will list them.

1. BackEnd (API)
  - Use of JWT with **refresh-token** (*token.routes.js*)
  - Use of JWT with protection against **XSS & CSRF** attacks (*routes & middleware*)
  - **Error class** (*utils/error.js*) for answering with apropriate error code & message
  - **Avoid try/catch** blocks in my routes (*utils/wrapAsync.js*)
  - **Error middleware**
  - Handling my routes in separate files.
2. FrontEnd (ReactJS)
  - Use of **redux toolkit**
  - **Axios interceptors** for handle *refresh token* provide by the api. (*/src/axiosHttpConfig*).
  - **Atomic design** for my components.
3. Tests with **Mocha** & **Chai**

### My references:
---------------------
- For organisation of my front development repository. I decide to use 'atomic design'.
Here a link who can give you some explanations:
https://blog.ippon.fr/2018/05/29/atomic-design-dans-la-pratique/

- For my backend development i handle errors with the **error middleware** of express. In addition of that i use a **class-instance managment of my errors** and i use a **wrapAsync** function who avoid me to use try/catch syntaxe with my async/await syntax. There is the two references i used:
[ClassSyntaxe][https://codeburst.io/better-error-handling-in-express-js-b118fc29e9c7]
[wrapAsync][https://thecodebarbarian.com/80-20-guide-to-express-error-handling]

- Protection against **XSS/CSRF** attacks: [special thanks to Arkerone](https://www.codeheroes.fr/2020/06/20/securiser-une-api-rest-3-3-gestion-du-jwt-cote-client/)

- I had to struggle for **refresh-token** i used different ressources: [1](https://solidgeargroup.com/en/refresh-token-with-jwt-authentication-node-js/); [2](https://blog.liplex.de/axios-interceptor-to-refresh-jwt-token-after-expiration/); [3](https://thedutchlab.com/blog/using-axios-interceptors-for-refreshing-your-api-token)

- [Tutorial 1 Mocha & chai](https://www.codementor.io/@davidtang/unit-testing-and-tdd-in-node-js-part-1-8t714s877); [Tutorial 2](https://medium.com/better-programming/testing-in-node-js-using-mocha-and-chai-part-2-5b5c56bf2075)


[Need to bypass medium paywall ?](https://dev.to/surjithctly/how-to-bypass-medium-com-paywall-upgrade-and-read-full-article-41ie)
