import { createComment, getCommentAuthor, deleteCommentById } from '../services/commentService.js'
import { createApiError } from '../middleware/errorHandler.js'

export const newComment = async (req, res, next) => {
  try {
    const { content, postId } = req.body
    if (!content || !postId) {
      return next(createApiError(400, 'Content and postId are required'))
    }

    const authorId = Number(req.user.id)
    const postIdNum = Number(postId)

    const comment = {
      content,
      author: {
        connect: { id: authorId },
      },
      post: {
        connect: { id: postIdNum },
      },
    }

    const createdComment = await createComment(comment)
    console.log('Created comment:', createdComment)
    res.status(201).json(createdComment)
  } catch (err) {
    next(err)
  }
}

export const deleteComment = async (req, res, next) => {
  try {
    const commentID = Number(req.params.commentId)
    const userID = Number(req.user.id)

    const commentAuthor = await getCommentAuthor(commentID)

    if (!commentAuthor) {
      return next(createApiError(404, 'Comment not found'))
    }

    const commentAuthorID = commentAuthor.authorId

    if (commentAuthorID !== userID) {
      return next(createApiError(403, 'You did not author this comment'))
    }

    await deleteCommentById(commentID)
    res.status(200).json({ message: 'Comment deleted' })
  } catch (err) {
    next(err)
  }
}
