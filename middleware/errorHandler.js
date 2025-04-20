const createError = (statusCode, message) => ({
  status: `${statusCode}`.startsWith('4') ? 'fail' : 'error',
  statusCode,
  message,
})

export const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500
  const message = err.message || 'Something went wrong'

  const errorResponse = createError(statusCode, message)

  if (process.env.NODE_ENV === 'development') {
    res.status(statusCode).json({
      ...errorResponse,
      stack: err.stack,
      error: err,
    })
  } else {
    res.status(statusCode).json({
      ...errorResponse,
      message: statusCode === 500 ? 'Something went wrong' : message,
    })
  }
}

export const createApiError = (statusCode, message) => {
  const error = new Error(message)
  error.statusCode = statusCode
  return error
}
