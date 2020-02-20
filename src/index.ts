import { PrismaClient, UserWhereInput } from '@prisma/client'
import * as bodyParser from 'body-parser'
import express from 'express'

const prisma = new PrismaClient()
const app = express()

app.use(bodyParser.json())

app.get(`/`, (req, res) => {
  res.send('hello')
})

app.post(`/users`, async (req, res) => {
  try {
    const result = await prisma.user.create({
      data: { ...req.body },
    })
    res.json(result)
  } catch (err) {
    console.error(err)
    res.sendStatus(400)
  }
})

app.get(`/users/:userId`, async (req, res) => {
  const { userId } = req.params
  const user = await prisma.user.findOne({
    where: {
      user_id: Number(userId),
    },
  })
  if (user) {
    res.json(user)
  } else {
    res.sendStatus(404)
  }
})

app.get(`/users/:userId/todos`, async (req, res) => {
  const { userId } = req.params
  const author: UserWhereInput = { user_id: Number(userId) }
  const todoItems = await prisma.todoItem.findMany({
    where: {
      user_id: author,
    },
  })
  if (todoItems) {
    res.json(todoItems)
  } else {
    res.sendStatus(404)
  }
})

app.post(`/users/:userId/todos`, async (req, res) => {
  const { userId } = req.params
  try {
    const result = await prisma.todoItem.create({
      data: {
        ...req.body,
        user_id: { connect: { user_id: Number(userId) } },
      },
    })
    res.json(result)
  } catch (err) {
    console.error(err)
    res.sendStatus(400)
  }
})

app.get(`/users/:userId/todos/:todoId`, async (req, res) => {
  const { userId, todoId } = req.params
  const author: UserWhereInput = { user_id: Number(userId) }
  const todos = await prisma.todoItem.findMany({
    where: {
      todo_id: Number(todoId),
      user_id: author,
    },
  })
  if (todos.length === 1) {
    res.json(todos[0])
  } else {
    res.sendStatus(404)
  }
})

app.put(`/users/:userId/todos/:todoId`, async (req, res) => {
  const { userId, todoId } = req.params
  const author: UserWhereInput = { user_id: Number(userId) }
  const todos = await prisma.todoItem.findMany({
    where: {
      todo_id: Number(todoId),
      user_id: author,
    },
  })
  if (todos.length === 1) {
    const todo = await prisma.todoItem.update({
      where: {
        todo_id: todos[0].todo_id,
      },
      data: { ...req.body },
    })
    res.json(todo)
  } else {
    res.sendStatus(404)
  }
})

app.delete(`/users/:userId/todos/:todoId`, async (req, res) => {
  const { userId, todoId } = req.params
  const author: UserWhereInput = { user_id: Number(userId) }
  const todos = await prisma.todoItem.findMany({
    where: {
      todo_id: Number(todoId),
      user_id: author,
    },
  })
  if (todos.length === 1) {
    await prisma.todoItem.delete({
      where: {
        todo_id: todos[0].todo_id,
      },
    })
    res.sendStatus(204)
  } else {
    res.sendStatus(404)
  }
})

app.listen(3000, () => console.log('server ready at: http://localhost:3000'))
