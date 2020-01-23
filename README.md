# prisma2-todo-api

Sample todo management api (REST) using prisma2.

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

### create user

```bash
$ curl -XPOST 'http://localhost:3000/users' \
       -H 'Content-type: application/json' \
       -d '{"name": "me"}'
{"name":"me","user_id":1}
```

### create user's todo

```bash
$ curl -XPOST 'http://localhost:3000/users/1/todos' \
       -H 'Content-type: application/json' \
       -d '{"text": "say hello"}'
{"text":"say hello","todo_id":1}
```

### get user's todos

```bash
$ curl 'http://localhost:3000/users/1/todos'
{"text":"say hello","todo_id":1}
```
