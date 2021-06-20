import { PrismaClient } from '@prisma/client';
import express from 'express';

const prisma = new PrismaClient();
const app = express();

app.use(express.json());

app.post('/users', async (req, res) => {
  try {
    const { email, name } = req.body;
    const result = await prisma.users.create({
      data: {
        email,
        name,
      },
    });
    res.json(result);
  } catch (err) {
    console.error(err);
    res.sendStatus(400);
  }
});

app.get('/users/:id', async (req, res) => {
  const { id } = req.params;
  const user = await prisma.users.findUnique({
    where: {
      id: Number(id),
    },
  });
  if (user) {
    res.json(user);
  } else {
    res.sendStatus(404);
  }
});

app.get('/health', (req, res) => {
  res.json({ health: 'ok' });
});

app.listen(3000, () => {
  console.log('server ready at: http://localhost:3000');
});
