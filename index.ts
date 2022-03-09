import { PrismaClient } from "@prisma/client";
import cors from 'cors'
import express from 'express'

const prisma = new PrismaClient({ log: ['query', 'error', 'warn', 'info'] })

const app = express()
app.use(cors())
app.use(express.json())


app.get('/users/:id', async (req, res) => {
    const idParam = Number(req.params.id)

    const users = await prisma.user.findFirst(
        { where: { id: idParam } }
    )

    res.send(users)
})

app.get('/users/', async (req, res) => {

    const users = await prisma.user.findMany()

    res.send(users)
})

app.get('/items', async (req, res) => {

    const items = await prisma.item.findMany()

    res.send(items)
})

app.get('/orders', async (req, res) => {

    const orders = await prisma.order.findMany({ include: { user: true, item: true } })

    res.send(orders)
})

app.listen(4000, () => {
    console.log('server up: http://localhost:4000')
})