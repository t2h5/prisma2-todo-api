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

Prisma Client will be generated via `postinstall`.

## how to

### start api server

```bash
$ npm run dev
```

Express running `localhost:3000`.

```bash
$ curl 'http://localhost:3000/'

hello
```

### operations

|               | method | path                         | request                  | response                            |
|---------------|--------|------------------------------|--------------------------|-------------------------------------|
| create user   | POST   | /users                       | {"name": "me"}           | {"name":"me","user_id":1}           |
| get user      | GET    | /users/:userId               | -                        | {"name":"me","user_id":1}           |
| create todo   | POST   | /users/:userId/todos         | {"text": "say hello"}    | {"text":"say hello","todo_id":1}    |
| get todo list | GET    | /users/:userId/todos         | -                        | [{"text":"say hello","todo_id":1}]  |
| get todo      | GET    | /users/:userId/todos/:todoId | -                        | {"text":"say hello","todo_id":1}    |
| update todo   | PUT    | /users/:userId/todos/:todoId | {"text": "say good bye"} | {"text":"say good bye","todo_id":1} |
| delete todo   | DELETE | /users/:userId/todos/:todoId | -                        | -                                   |

### prisma studio

```bash
$ npm run studio
```
