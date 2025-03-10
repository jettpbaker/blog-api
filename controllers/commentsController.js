import { createComment, deleteCommentById } from '../services/commentService.js'

export const newComment = async (req, res) => {
  const { content, createdAt } = req.body
  const authorId = Number(req.body.authorId)
  const postId = Number(req.body.postId)

  const comment = {
    content,
    author: {
      connect: { id: authorId },
    },
    post: {
      connect: { id: postId },
    },
    createdAt,
  }

  const createdComment = await createComment(comment)
  res.status(201).json(createdComment)
}

export const deleteComment = async (req, res) => {
  const id = Number(req.params.id)
  const comment = await deleteCommentById(id)

  if (!comment) {
    return res.status(404).json({ message: 'Comment not found' })
  }

  res.status(200).json({ message: 'Comment deleted' })
}

// model Comment {
//     id        Int      @id @default(autoincrement())
//     content   String
//     author    User   @relation(fields: [authorId], references: [id])
//     authorId  Int
//     post      Post     @relation(fields: [postId], references: [id], onDelete: Cascade)
//     postId    Int
//     createdAt DateTime @default(now())
//   }

// export const createPost = async (req, res) => {
//   const { title, content, comments, published, createdAt } = req.body
//   const authorId = Number(req.body.authorId)

//   const post = {
//     title,
//     content,
//     author: {
//       connect: { id: authorId },
//     },
//     comments,
//     published,
//     createdAt,
//   }

//   const createdPost = await newPost(post)
//   res.status(201).json(createdPost)
// }
