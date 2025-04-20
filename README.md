# TODO

- [ ] remove unused import statements
- [ ] remove postinstall ??
- [x] rename updatePost
- [ ] basic "what to do" to run
- [ ] add a template env file, with a comment - not commiting real env vars
- [ ] add docker compose file to spin up postgres
- [ ] could add docker file for the whole app
- [x] no need to be admin to delete a post

# Endpoints

| Endpoint              | Method | Description                                    |
| --------------------- | ------ | ---------------------------------------------- |
| api/posts             | GET    | Get all posts                                  |
| api/posts/user-posts  | GET    | Get posts for the authenticated user           |
| api/posts/:id         | GET    | Get a specific post by ID                      |
| api/posts             | POST   | Create a new post (requires authentication)    |
| api/posts/:id         | DELETE | Delete a post (requires authentication)        |
| api/posts/:id         | PUT    | Toggle post publish status (requires admin)    |
| api/posts/:id/content | PUT    | Update post content (requires authentication)  |
| auth/signup          | POST   | Register a new user                            |
| auth/login           | POST   | Login a user                                   |
| auth/user            | GET    | Get the name of the authenticated user         |
| auth/admin           | GET    | Check if user is admin                         |
| api/comments          | POST   | Create a new comment (requires authentication) |
| api/comments/:id      | DELETE | Delete a comment (requires authentication)     |
| api/ai                | POST   | Generate AI description                        |
