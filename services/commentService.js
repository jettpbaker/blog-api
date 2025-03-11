import prisma from '../prisma/client.js'

export const createComment = async (comment) => {
  const newComment = await prisma.comment.create({
    data: comment,
  })
  return newComment
}

export const getCommentAuthor = async (id) => {
  try {
    return await prisma.comment.findUnique({
      where: {
        id,
      },
      select: {
        authorId: true,
      },
    })
  } catch (err) {
    console.error(err)
    return false
  }
}

export const deleteCommentById = async (id) => {
  try {
    return await prisma.comment.delete({
      where: {
        id: id,
      },
    })
  } catch (err) {
    console.error(err)
    return false
  }
}
