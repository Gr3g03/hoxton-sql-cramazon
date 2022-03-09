import { PrismaClient } from "@prisma/client";
import cors from 'cors'
import express from 'express'

const prisma = new PrismaClient({ log: ['query', 'error', 'warn', 'info'] })

const app = express()
app.use(cors())
app.use(express.json())



app.get('/users/:id', async (req, res) => {
    const paramId = Number(req.params.id)
    try {

        const users = await prisma.user.findFirst({
            where: { id: paramId },
            select: {
                id: true,
                email: true,
                name: true,
                items: {
                    include: { item: true }
                }
            }
        })

        res.send(users)

    }

    catch (error) {
        //@ts-ignore
        res.status(400).send(`<pre>${error.message}</pre>`)
    }

})


app.get('/users', async (req, res) => {

    try {

        const items = await prisma.user.findMany({
            select: {
                id: true,
                email: true,
                name: true,
                items: {
                    include: { item: true }
                }
            }
        })

        res.send(items)

    }

    catch (error) {
        //@ts-ignore
        res.status(400).send(`<pre>${error.message}</pre>`)
    }

})


app.get('/items', async (req, res) => {

    try {

        const users = await prisma.item.findMany({
            select: {
                id: true,
                image: true,
                title: true,
                users: {
                    include: { user: true }
                }
            }
        })

        res.send(users)

    }

    catch (error) {
        //@ts-ignore
        res.status(400).send(`<pre>${error.message}</pre>`)
    }

})

app.delete('/users/:id', async (req, res) => {

    const idParam = req.params.id

    try {

        const user = await prisma.user.findFirst({
            where: {
                id: Number(idParam)
            }
        })

        if (user) {

            await prisma.user.delete({
                where: { id: Number(idParam) }
            })

            res.send({ message: 'user deleted.' })

        }

        else {
            res.status(404).send({ error: 'user not found.' })
        }

    }

    catch (error) {
        //@ts-ignore
        res.status(400).send(`<prev>${error.message}</prev>`)
    }

})

app.listen(4000, () => {
    console.log('server up: http://localhost:4000')
})