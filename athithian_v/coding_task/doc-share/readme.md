# Doc Share
- Enable Multiple user with eidt permission to edit single document file.

### Run Locally:
- Clone the repository.
- Move to doc-share directory.
- Run `npm run dev`

## User API
### Create User:
This method will create new in the neon database as well as in the clerk dashboard.

URL: http://127.0.0.1:8787/user/register

Example Request Body
```json
{
    "username": "User",
    "password": "UserPassword",
    "email": "user@example.com"
}
```

### Login User:
This method will logs user in and send a token, that must be added to the header of the socket methods.

URL: http://127.0.0.1:8787/user/login

Example Request Body
```json
{
    "password": "UserPassword",
    "email": "user@example.com"
}
```

## Socket

### To perform all socket operation the header with name `Authorization` must be set with `Bearer <login token>`

### Create
- This operation creates new document. To perform this operation we must specific message as 'create', a name and content of the document.

**Example**
```json
{
    "message": "create",
    "name": "Coding",
    "content": "Coding is Fun"
}
```

### Create
- This operation creates new document. To perform this operation we must specific message as `create`, a name and content of the document.

**Example**
```json
{
    "message": "create",
    "name": "Coding",
    "content": "Coding is Fun"
}
```

### Edit
- This operation edit the existing document. A new version is created for the document only if user who is performing this action is the owner of the document or has view/edit permission. Here message must be `edit`

**Example**
```json
{
    "message": "edit",
    "docId": 1,
    "name": "Coding",
    "content": "Coding is Fun"
}
```

### set-permission
- This operation sets permission for the specified user to the specified document only if the user who is performing this action is the owner of the document.
- Here permitUser field specifies the user Id of the user for whom the permission has to be set. Here message must be `set-permission`
**Example:**
```json
{
    "message": "set-permission",
    "permitUser": 9,
    "docId": 9,
    "permission": "edit"
}
```

### Delete
- This operation delete the document only if the user who is performing this action is the owner of the document. Here message must be `delete`
**Example:**
```json
{
    "message": "delete",
    "docId": 9,
}
```

### view
- To see the content of the document only if user who is performing this action is the owner of the document or has view/edit permission. Here message must be `view`
**Example:**
```json
{
    "message": "view",
    "docId": 9
}
```