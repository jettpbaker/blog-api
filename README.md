# API Documentation

## Authentication & Users

| Endpoint            | Method | Description                            | Request Body                               |
| ------------------- | ------ | -------------------------------------- | ------------------------------------------ |
| /api/users/login    | POST   | Login a user                           | `{ email, password }`                      |
| /api/users/signup   | POST   | Register a new user                    | `{ firstName, lastName, email, password }` |
| /api/users/me       | GET    | Get the name of the authenticated user | None                                       |
| /api/users/me/admin | GET    | Check if user is admin                 | None                                       |
| /api/users/me/posts | GET    | Get posts for the authenticated user   | None                                       |

## Posts

| Endpoint                        | Method | Description                                   | Request Body                      |
| ------------------------------- | ------ | --------------------------------------------- | --------------------------------- |
| /api/posts                      | GET    | Get all posts                                 | None                              |
| /api/posts/:id                  | GET    | Get a specific post by ID (includes comments) | None                              |
| /api/posts                      | POST   | Create a new post (requires authentication)   | `{ title, content, description }` |
| /api/posts/:id                  | DELETE | Delete a post (requires authentication)       | None                              |
| /api/posts/:id                  | PATCH  | Update post content (requires authentication) | `{ content }`                     |
| /api/posts/:id/publish          | PATCH  | Toggle post publish status (requires admin)   | None                              |
| /api/posts/generate-description | POST   | Generate AI description                       | `{ postMarkdown }`                |

## Comments

| Endpoint                        | Method | Description                                    | Request Body          |
| ------------------------------- | ------ | ---------------------------------------------- | --------------------- |
| /api/posts/:postId/comments     | POST   | Create a new comment (requires authentication) | `{ content, postId }` |
| /api/posts/:postId/comments/:id | DELETE | Delete a comment (requires authentication)     | None                  |

# TODO

- [x] remove unused import statements
- [x] remove postinstall ??
- [x] rename updatePost
- [ ] basic "what to do" to run
- [x] add a template env file, with a comment - not commiting real env vars
- [x] add docker file for the whole app
- [x] no need to be admin to delete a post
- [x] error handling
- [ ] if no openrouter key, send back basic description
