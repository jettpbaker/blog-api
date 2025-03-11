import { createComment, getCommentAuthor, deleteCommentById } from '../services/commentService.js'

export const newComment = async (req, res) => {
  const { content } = req.body
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
  }

  const createdComment = await createComment(comment)
  res.status(201).json(createdComment)
}

export const deleteComment = async (req, res) => {
  const commentID = Number(req.params.id)
  const userID = Number(req.user.id)

  const commentAuthor = await getCommentAuthor(commentID)

  if (!commentAuthor) {
    return res.status(404).json({ message: 'Comment not found' })
  }

  const commentAuthorID = commentAuthor.authorId

  if (commentAuthorID !== userID) {
    return res.status(403).json({ message: 'You did not author this comment' })
  }

  await deleteCommentById(commentID)
  res.status(200).json({ message: 'Comment deleted' })
}
