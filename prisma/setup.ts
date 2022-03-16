import { Prisma, PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const items: Prisma.ItemCreateInput[] = [
    {
        image:
            'https://images.pexels.com/photos/251454/pexels-photo-251454.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
        title: 'Socks',
        price: 1.99
    },
    {
        image: 'https://gambleandgunn.com/wp-content/uploads/2018/09/DSC_4460.png',
        title: 'Flat Cap',
        price: 5.99
    },
    {
        image:
            'https://upload.wikimedia.org/wikipedia/commons/a/af/Glasses_black.jpg',
        title: 'Glasses',
        price: 3.99
    }
]

const users: Prisma.UserCreateInput[] = [
    {
        email: 'nicolas@email.com',
        name: 'Nicolas',
        password: 'abcd',
        orders: {
            create: [
                { item: { connect: { title: 'Socks' } }, quantity: 100 },
                { item: { connect: { title: 'Flat Cap' } }, quantity: 7 },
                { item: { connect: { title: 'Glasses' } }, quantity: 2 }
            ]
        }
    },
    {
        email: 'ed@email.com',
        name: 'Ed',
        password: 'abcd',
        orders: {
            create: [
                {
                    item: {
                        connectOrCreate: {
                            where: { title: 'Cat Ears' },
                            create: {
                                image:
                                    'https://images.squarespace-cdn.com/content/v1/55f04163e4b0b418231cabce/1559565440860-TO562ZISIAFIJGCFUI8K/Headband_Leopard_1.jpg?format=1000w',
                                title: 'Cat Ears',
                                price: 2.99
                            }
                        }
                    },
                    quantity: 69
                }
            ]
        }
    },
    {
        email: 'artiola@email.com',
        name: 'Artiola',
        password: 'abcd'
    }
]

async function createStuff() {
    for (const item of items) {
        await prisma.item.create({ data: item })
    }

    for (const user of users) {
        await prisma.user.create({ data: user })
    }
}

createStuff()