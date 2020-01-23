import { PrismaClient } from '@prisma/client'
import * as bodyParser from 'body-parser'
import express from 'express'
import { Request, Response } from 'express'

const prisma = new PrismaClient()
const app = express()

app.use(bodyParser.json())

app.post(`/users`, async (req: Request, res: Response) => {
  const result = await prisma.users.create({
    data: {
      ...req.body,
    },
  })
  res.json(result)
})

app.get(`/users/:id`, async (req: Request, res: Response) => {
  const { id } = req.params
  const post = await prisma.users.findOne({
    where: {
      user_id: Number(id),
    },
  })
  res.json(post)
})

const server = app.listen(3000, () =>
  console.log('server ready at: http:localhost:3000'),
)
