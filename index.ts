import { PrismaClient } from '@prisma/client'
import express from 'express'
import cors from 'cors'

const prisma = new PrismaClient()

const app = express()
app.use(cors())
app.use(express.json())
const PORT = 4000

app.get('/users/:email', async (req, res) => {
    const email = req.params.email

    try {
        const user = await prisma.user.findUnique({
            where: { email: email },
            include: {
                orders: {
                    include: { item: true }
                }
            }
        })

        if (user) {
            res.send(user)
        } else {
            res.status(404).send({ error: 'User not found.' })
        }
    } catch (err) {
        // @ts-ignore
        res.status(400).send({ error: err.message })
    }
})

app.delete('/orders/:id', async (req, res) => {
    const id = Number(req.params.id)

    try {
        const order = await prisma.order.findUnique({ where: { id } })

        if (order) {
            await prisma.order.delete({ where: { id } })
            const user = await prisma.user.findUnique({
                where: { id: order.userId },
                include: { orders: { include: { item: true } } }
            })
            res.send(user)
        } else {
            res.status(404).send({ error: 'Order not found.' })
        }
    } catch (err) {
        // @ts-ignore
        res.status(400).send({ err: err.message })
    }
})

app.patch('/orders/:id', async (req, res) => {
    // run some code to patch order
    // reply to user
})

app.listen(PORT, () => {
    console.log(`Server up: http://localhost:${PORT}`)
})