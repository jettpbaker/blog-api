# API Documentation

## Authentication & Users

| Endpoint            | Method | Description                            |
| ------------------- | ------ | -------------------------------------- |
| /api/users/login    | POST   | Login a user                           |
| /api/users/signup   | POST   | Register a new user                    |
| /api/users/me       | GET    | Get the name of the authenticated user |
| /api/users/me/admin | GET    | Check if user is admin                 |
| /api/users/me/posts | GET    | Get posts for the authenticated user   |

## Posts

| Endpoint                        | Method | Description                                   |
| ------------------------------- | ------ | --------------------------------------------- |
| /api/posts                      | GET    | Get all posts                                 |
| /api/posts/:id                  | GET    | Get a specific post by ID (includes comments) |
| /api/posts                      | POST   | Create a new post (requires authentication)   |
| /api/posts/:id                  | DELETE | Delete a post (requires authentication)       |
| /api/posts/:id                  | PATCH  | Update post content (requires authentication) |
| /api/posts/:id/publish          | PATCH  | Toggle post publish status (requires admin)   |
| /api/posts/generate-description | POST   | Generate AI description                       |

## Comments

| Endpoint                        | Method | Description                                    |
| ------------------------------- | ------ | ---------------------------------------------- |
| /api/posts/:postId/comments     | POST   | Create a new comment (requires authentication) |
| /api/posts/:postId/comments/:id | DELETE | Delete a comment (requires authentication)     |

# TODO

- [x] remove unused import statements
- [x] remove postinstall ??
- [x] rename updatePost
- [ ] basic "what to do" to run
- [x] add a template env file, with a comment - not commiting real env vars
- [x] add docker file for the whole app
- [x] no need to be admin to delete a post
- [x] error handling
