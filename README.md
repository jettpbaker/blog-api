# API Documentation

## Authentication & Users

| Endpoint            | Method | Description                            | Request Body                               | Auth Required |
| ------------------- | ------ | -------------------------------------- | ------------------------------------------ | ------------- |
| /api/users/login    | POST   | Login a user                           | `{ email, password }`                      | No            |
| /api/users/signup   | POST   | Register a new user                    | `{ firstName, lastName, email, password }` | No            |
| /api/users/me       | GET    | Get the name of the authenticated user | None                                       | Yes           |
| /api/users/me/admin | GET    | Check if user is admin                 | None                                       | Yes           |
| /api/users/me/posts | GET    | Get posts for the authenticated user   | None                                       | Yes           |

## Posts

| Endpoint                        | Method | Description                                   | Request Body                      | Auth Required |
| ------------------------------- | ------ | --------------------------------------------- | --------------------------------- | ------------- |
| /api/posts                      | GET    | Get all posts                                 | None                              | No            |
| /api/posts/:id                  | GET    | Get a specific post by ID (includes comments) | None                              | No            |
| /api/posts                      | POST   | Create a new post (requires authentication)   | `{ title, content, description }` | Yes           |
| /api/posts/:id                  | DELETE | Delete a post (requires authentication)       | None                              | Yes           |
| /api/posts/:id                  | PATCH  | Update post content (requires authentication) | `{ content }`                     | Yes           |
| /api/posts/:id/publish          | PATCH  | Toggle post publish status (requires admin)   | None                              | Yes           |
| /api/posts/generate-description | POST   | Generate AI description                       | `{ postMarkdown }`                | No            |

## Comments

| Endpoint                        | Method | Description                                    | Request Body          | Auth Required |
| ------------------------------- | ------ | ---------------------------------------------- | --------------------- | ------------- |
| /api/posts/:postId/comments     | POST   | Create a new comment (requires authentication) | `{ content, postId }` | Yes           |
| /api/posts/:postId/comments/:id | DELETE | Delete a comment (requires authentication)     | None                  | Yes           |

# TODO

- [x] remove unused import statements
- [x] remove postinstall ??
- [x] rename updatePost
- [ ] basic "what to do" to run
- [x] add a template env file, with a comment - not commiting real env vars
- [x] add docker file for the whole app
- [x] no need to be admin to delete a post
- [x] error handling
- [x] if no openrouter key, send back basic description
- [ ] prisma studio available from within docker container
