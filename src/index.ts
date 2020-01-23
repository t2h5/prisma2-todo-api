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
    const result = await prisma.users.create({
      data: { ...req.body },
    })
    res.json(result)
  } catch (err) {
    console.error(err)
    res.sendStatus(400)
  }
})

app.get(`/users/:user_id`, async (req, res) => {
  const { user_id } = req.params
  const user = await prisma.users.findOne({
    where: {
      user_id: Number(user_id),
    },
  })
  if (user) {
    res.json(user)
  } else {
    res.sendStatus(404)
  }
})

app.get(`/users/:user_id/todos`, async (req, res) => {
  const { user_id } = req.params
  const author: UserWhereInput = { user_id: Number(user_id) }
  const todoItems = await prisma.todoItems.findMany({
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

app.post(`/users/:user_id/todos`, async (req, res) => {
  const { user_id } = req.params
  try {
    const result = await prisma.todoItems.create({
      data: {
        ...req.body,
        user_id: { connect: { user_id: Number(user_id) } },
      },
    })
    res.json(result)
  } catch (err) {
    console.error(err)
    res.sendStatus(400)
  }
})

app.get(`/users/:user_id/todos/:todo_id`, async (req, res) => {
  const { user_id, todo_id } = req.params
  const author: UserWhereInput = { user_id: Number(user_id) }
  const todos = await prisma.todoItems.findMany({
    where: {
      todo_id: Number(todo_id),
      user_id: author,
    },
  })
  if (todos.length === 1) {
    res.json(todos[0])
  } else {
    res.sendStatus(404)
  }
})

app.put(`/users/:user_id/todos/:todo_id`, async (req, res) => {
  const { user_id, todo_id } = req.params
  const author: UserWhereInput = { user_id: Number(user_id) }
  const todos = await prisma.todoItems.findMany({
    where: {
      todo_id: Number(todo_id),
      user_id: author,
    },
  })
  if (todos.length === 1) {
    const todo = await prisma.todoItems.update({
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

app.delete(`/users/:user_id/todos/:todo_id`, async (req, res) => {
  const { user_id, todo_id } = req.params
  const author: UserWhereInput = { user_id: Number(user_id) }
  const todos = await prisma.todoItems.findMany({
    where: {
      todo_id: Number(todo_id),
      user_id: author,
    },
  })
  if (todos.length === 1) {
    await prisma.todoItems.delete({
      where: {
        todo_id: todos[0].todo_id,
      },
    })
    res.sendStatus(204)
  } else {
    res.sendStatus(404)
  }
})

const server = app.listen(3000, () =>
  console.log('server ready at: http://localhost:3000'),
)
