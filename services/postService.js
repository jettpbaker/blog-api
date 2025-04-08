import prisma from '../prisma/client.js'

export const getAllPosts = async () => {
  const posts = await prisma.post.findMany({
    select: {
      title: true,
      content: true,
      description: true,
      published: true,
      createdAt: true,
      id: true,
      author: {
        select: {
          firstName: true,
          lastName: true,
          admin: true,
        },
      },
      comments: false,
    },
  })
  return posts
}

export const getPostById = async (id) => {
  const post = await prisma.post.findUnique({
    where: { id },
    select: {
      id: true,
      title: true,
      content: true,
      published: true,
      createdAt: true,
      author: {
        select: {
          firstName: true,
          lastName: true,
          admin: true,
        },
      },
      comments: {
        select: {
          content: true,
          createdAt: true,
          author: {
            select: {
              firstName: true,
              lastName: true,
              admin: true,
            },
          },
        },
      },
    },
  })
  return post
}

export const getPostAuthor = async (id) => {
  return await prisma.post.findUnique({
    where: { id },
    select: {
      authorId: true,
    },
  })
}

export const createPost = async (post) => {
  const newPost = await prisma.post.create({
    data: post,
  })
  return newPost
}

export const deletePostById = async (id) => {
  try {
    return await prisma.post.delete({
      where: {
        id: id,
      },
    })
  } catch (err) {
    console.error(err)
    return false
  }
}

export const publishPostById = async (id) => {
  try {
    return await prisma.post.update({
      where: {
        id: id,
      },
      data: {
        published: true,
      },
    })
  } catch (err) {
    console.error(err)
    return false
  }
}
