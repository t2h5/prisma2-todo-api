import { PrismaClient, UserWhereInput } from '@prisma/client'
import * as bodyParser from 'body-parser'
import express from 'express'

const prisma = new PrismaClient()
const app = express()

app.use(bodyParser.json())

app.post(`/users`, async (req, res) => {
  try {
    const result = await prisma.users.create({
      data: {
        ...req.body,
      },
    })
    res.json(result)
  } catch (err) {
    console.error(err)
    res.status(400).send('bad request')
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
    res.status(404).send('not found')
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
    res.status(404).send('not found')
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
    res.status(400).send('bad request')
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
  if (todos.length === 0) {
    res.json(todos[0])
  } else {
    res.status(404).send('not found')
  }
})

const server = app.listen(3000, () =>
  console.log('server ready at: http:localhost:3000'),
)
