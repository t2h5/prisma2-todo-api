# prisma2-todo-api

Sample todo management api (REST) using prisma2.

- https://github.com/prisma/prisma2
  - Prisma Client JS
  - Prisma Studio

## setup

### start postgres container

Launch postgres server using `docker-compose.yml`.

```bash
$ docker-compose up -d
```

`User` and `TodoItem` tables will be created on start up. (see dockerfiles/postgres/init.sql)

### install dependencies

Install dependencies.

```bash
$ npm install
```

### run migration

```bash
$ npx prisma migrate dev
```

## how to

### start api server

```bash
$ npm run dev
```

Express running `localhost:3000`.

### operations

|               | method | path                     | request                            |
|---------------|--------|--------------------------|------------------------------------|
| create user   | POST   | /users                   | {"email": "email", "name": "name"} |
| get user      | GET    | /users/:id               | -                                  |
| create todo   | POST   | /users/:userId/todos     | {"text": "say hello"}              |
| get todo list | GET    | /users/:userId/todos     | -                                  |

### prisma studio

```bash
$ npx prisma studio
```
