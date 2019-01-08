### Graph-Posts Server

# Description

**Graph-Posts** is a backend CRUD application using Node/GraphQL with user authentication and basic validations.

# Table of Contents

- [Testing](#testing)
- [Contribute](#contribute)


### Dependencies

- [GraphQL](https://graphql.org/) - GraphQL is a query language for APIs
- [Prisma-Yoga](https://github.com/prisma/graphql-yoga) - Fully-featured GraphQL Server with focus on easy setup, performance & great developer experience.
- [NodeJS](https://github.com/nodejs/node) - A JavaScript runtime environment
- [Express](https://github.com/expressjs/express) - A web application framework for NodeJS
- [PostgreSQL](https://www.postgresql.org/) - PostgreSQL is a powerful, open source object-relational database system.


### More about environmental variables

After setting up your `.env` from the template provided in the `.env.example` file,
to use these variables anywhere in the app;

- import the `dotenv` package

```
import dotenv from 'dotenv'
```

- Make it available for use as early as possible in that file

```
dotenv.config()
```

- Access any variable in the `.env`

```
process.env.MY_ENV_VARIABLE
```


## Testing

[Jest](https://jestjs.io) is used as the testing framework for both the unit tests and integration tests.
To execute all tests, run the command

```
  yarn test or make test
```

## Contribute

Contributions to the project are welcome! Before contributing, look through the branch naming, commit message and pull request conventions in the project. When you are all done, follow the guidelines below to raise a pull request:

- Clone the repository and checkout from `develop` to a new branch to start working on the assigned task. Ensure branch names follow the convention in the project.
- Work on the task following the coding standards and [style guide](https://github.com/airbnb/javascript) used in the project.
- When task has been completed, make commits and raise a pull request against `develop` branch, also ensure to follow the conventions.

If the pull request is accepted by the owners of the repository, then it is merged into the `develop` branch and closed.

