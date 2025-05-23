import prisma from '../prisma/client.js'

export const getAllPosts = async () => {
  const posts = await prisma.post.findMany({
    orderBy: {
      createdAt: 'desc',
    },
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
        orderBy: {
          createdAt: 'desc',
        },
        select: {
          content: true,
          id: true,
          createdAt: true,
          author: {
            select: {
              firstName: true,
              lastName: true,
              admin: true,
              id: true,
            },
          },
        },
      },
    },
  })
  return post
}

export const getUserPosts = async (id) => {
  return await prisma.post.findMany({
    where: {
      authorId: id,
    },
  })
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
  try {
    const newPost = await prisma.post.create({
      data: post,
    })
    return newPost
  } catch (err) {
    console.error(err)
    return false
  }
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

export const togglePostPublishedById = async (id) => {
  const post = await prisma.post.findUnique({
    where: { id },
  })

  if (!post) {
    return null
  }

  return prisma.post.update({
    where: { id },
    data: { published: !post.published },
  })
}

export const updatePostContentById = async (id, content) => {
  return prisma.post.update({
    where: { id },
    data: { content },
  })
}
