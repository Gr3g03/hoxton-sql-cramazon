import { PrismaClient } from '@prisma/client'
import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'



process.env.MY_VARIABLE_NAME

const prisma = new PrismaClient({ log: ['query', 'info', 'warn', 'error'] })

const app = express()
app.use(cors())
app.use(express.json())
const PORT = 4000

function createToken(id: number) {
    // @ts-ignore
    return jwt.sign({ id: id }, process.env.MY_SECRET, { expiresIn: '3days' })
}

async function getUserFromToken(token: string) {
    //@ts-ignore
    const decodedData = jwt.verify(token, process.env.MY_SECRET)
    const user = await prisma.user.findUnique({
        //@ts-ignore
        where: { id: decodedData.id },
        include: { orders: { include: { item: true } } }
    })
    return user
}

app.post('/signup', async (req, res) => {
    const { email, password, name } = req.body

    try {
        const hash = bcrypt.hashSync(password, 8)
        const user = await prisma.user.create({
            data: { email: email, password: hash, name },
            include: { orders: { include: { item: true } } }
        })
        res.send({ user, token: createToken(user.id) })
    } catch (error) {
        //@ts-ignore
        res.status(400).send({ error: error.message })
    }
})


app.post('/signin', async (req, res) => {
    const { email, password } = req.body

    try {
        const user = await prisma.user.findUnique({
            where: { email: email },
            include: { orders: { include: { item: true } } }
        })
        // @ts-ignore
        const passwordMatches = bcrypt.compareSync(password, user.password)

        if (user && passwordMatches) {
            res.send({ user, token: createToken(user.id) })
        } else {
            throw Error('Error')
        }
    } catch (err) {
        res.status(400).send({ error: 'User/password invalid.' })
    }
})



app.get('/validate', async (req, res) => {
    const token = req.headers.authorization || ''

    try {
        // @ts-ignore
        const user = await getUserFromToken(token)
        res.send(user)
    } catch (err) {
        // @ts-ignore
        res.status(400).send({ error: err.message })
    }
})

app.get('/orders', async (req, res) => {
    const token = req.headers.authorization

    try {
        // @ts-ignore
        const user = await getUserFromToken(token)
        // @ts-ignore
        const orders = await prisma.order.findMany({ where: { userId: user.id } })
        res.send(orders)
    } catch (err) {
        // @ts-ignore
        res.status(400).send({ error: err.message })
    }
})


app.listen(PORT, () => {
    console.log(`Server up: http://localhost:${PORT}`)
})