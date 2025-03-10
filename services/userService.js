import prisma from '../prisma/client.js'

export const getUserById = async (id) => {
  const author = await prisma.user.findUnique({
    where: { id },
  })
  return author
}

export const getUserByEmail = async (email) => {
  const user = await prisma.user.findUnique({
    where: { email },
  })
  return user
}

export const createUser = async (user) => {
  return await prisma.user.create({
    data: user,
  })
}
