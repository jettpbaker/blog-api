import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  const user1 = await prisma.user.create({
    data: {
      firstName: 'John',
      lastName: 'Doe',
      password: await bcrypt.hash('password123', 10),
      admin: true,
    },
  })

  const user2 = await prisma.user.create({
    data: {
      firstName: 'Jane',
      lastName: 'Smith',
      password: await bcrypt.hash('password456', 10),
      admin: false,
    },
  })

  const post1 = await prisma.post.create({
    data: {
      title: 'Getting Started with Node.js',
      content:
        'Node.js is a powerful runtime that allows you to run JavaScript on the server. In this post, we will explore the basics of Node.js and how to build your first application.',
      published: true,
      author: {
        connect: { id: user1.id },
      },
    },
  })

  const post2 = await prisma.post.create({
    data: {
      title: 'Understanding Prisma ORM',
      content:
        'Prisma is a modern database toolkit that makes working with databases easy. This post covers the fundamentals of Prisma and how it can streamline your database operations.',
      published: true,
      author: {
        connect: { id: user2.id },
      },
    },
  })

  await prisma.comment.create({
    data: {
      content: 'Great introduction to Node.js! Looking forward to more posts.',
      author: {
        connect: { id: user2.id },
      },
      post: {
        connect: { id: post1.id },
      },
    },
  })

  await prisma.comment.create({
    data: {
      content: 'Prisma has really improved my development workflow. Thanks for sharing!',
      author: {
        connect: { id: user1.id },
      },
      post: {
        connect: { id: post2.id },
      },
    },
  })

  console.log('Database has been seeded! 🌱')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
