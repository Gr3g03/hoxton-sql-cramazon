import { Prisma, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient({ log: ['query', 'error', 'warn', 'info'] })



const items: Prisma.ItemCreateInput[] = [
    {
        title: 't-shirt',
        image: 'Image.jpg'
    },
    {
        title: 'shoes',
        image: 'Image.jpg'
    },
    {
        title: 'v-neck',
        image: 'Image.jpg'
    },
    {
        title: 'watch',
        image: 'Image.jpg'
    }
]


const users: Prisma.UserCreateInput[] = [
    {
        name: 'Grigori',
        email: 'grigori@email.com'

    },
    {
        name: 'Nicolas',
        email: 'nicolas@email.com'
    },
    {
        name: 'ed',
        email: 'ed@email.com'
    },
    {
        name: 'Rinor',
        email: 'rinor@email.com'
    },
    {
        name: 'Geri',
        email: 'geri@email.com'
    }
]

const orders = [
    {
        userId: 2,
        itemId: 3,
        quantity: 3
    },
    {
        userId: 1,
        itemId: 3,
        quantity: 1
    },
    {
        userId: 3,
        itemId: 1,
        quantity: 4
    }
]


async function createStuff() {
    // for (const user of users) {
    //     await prisma.user.create({ data: user })
    // }

    // for (const item of items) {
    //     await prisma.item.create({ data: item })
    // }

    // for (const order of orders) {
    //     await prisma.order.create({ data: order })
    // }
}

createStuff()