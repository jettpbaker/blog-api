import prisma from '../prisma/client.js'

export const getAuthorById = async (id) => {
  const author = await prisma.user.findUnique({
    where: { id },
  })
  return author
}
