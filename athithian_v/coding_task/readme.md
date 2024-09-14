## Guide to set up Project.

1. Clone the repository to local machine.
2. Change directory to coding_task.
3. Install the Packages - `npm install`
4. Add .env file in coding_task directory. Make sure to add the following variables:

   ```
       SECRET_KEY = 'your_secret_key'

       DATABASE_HOST = 'your_host'
       DATABASE_PORT = 3306
       DATABASE_USER = 'your_username'
       DATABASE_PASSWORD = 'your_password'
       DATABASE_NAME = doc_share
   ```

5. Make sure to create a database in mysql named doc_share
6. To apply migration to database - `npm run migrate`
7. To run in developer mode - `npm run dev`
8. Visit [http://localhost:3000/api-doc](http://localhost:3000/api-doc/) for API documentation.

## Implementation:

### User

1. **User Authentication:**

   1. **/user/register:$\color{green}{[Post]}$**
      - User Data: username, email, password is sent using post request.
      - New user record is created, where the password is hashed.
      - New user record is sent as response.
   2. **/user/login:$\color{green}[Post]$**
      - User Data: email, password is sent using post request.
      - When the user exists and password matches, a JWT token is created and set token in cookies.

2. **Document Management:**

   1. **/document/create:$\color{green}[Post]$**

      - User must be logged in to perform this action.
      - A doc file is sent on a post request.
      - Multer is used for handling files. The files are uploaded to public/files directory.
      - New document and Version with version number 1 is created in database where path to file and meta data are saved.

   2. **/document/edit:$\color{green}[Patch]$**

      - User must be logged in to perform this action.
      - A doc file is sent on a post request. Multer is used for handling files. The files are uploaded to public/files directory.
      - The user Id is check whether user has edit permission from permission table.
      - If yes, new version is created and file url is updated in the document tuple.
      - Isolation level is set to serialization for strict isolation.

   3. **/document/delete/{docId}:$\color{red}[Delete]$**

      - User must be logged in to perform this action.
      - A doc file is sent on a post request. Multer is used for handling files. The files are uploaded to public/files directory.
      - The user Id is check whether user is the owner of the document.
      - If yes, all url of the versions collection for deletion file, all versions and changes deleted and documnet is deleted.
      - All files are deleted with the collected URL.

   4. **/document/set-permission/{docId}:$\color{blue}[Get]$**

      - Only owner of the file can perform this action.
      - Permission for the use is set.

   5. **/document/view/:$\color{blue}[Get]$**
      - In order to view the document, the document ID must be passed as query Parameter.
      - Then the permission check is done, the logged in user must either be the owner of the file or must have permission to view/edit.
      - Then the file is served to the user after permission check.

# Coding Task

Your task is to build the backend of a simplified real-time collaborative document editor, similar to Google Docs. This application will handle user authentication, document management, real-time collaboration, version control, and permissions.

1. Initialize your project in the `coding_tasks` folder. Your code will reside in `your_full_name/coding_tasks folder`.
2. Design your database schema using Prisma/Drizzle ORM and set up your database on MySQL.
3. Implement the backend features listed below, ensuring to follow best practices for security, scalability, and performance.
4. Commit your code regularly with clear, and descriptive commit messages :)

### Tech Stack

Backend: Hono for the serverless API, MySQL Database with Prisma/Drizzle ORM, Cloudflare Workers for serverless functions, and WebSockets for real-time updates.

### Features:

1. **User Authentication:** Implement secure user registration and login. Use Clerk.dev for this.
2. **Document Creation:** Allow users to create, edit, and delete documents.
3. **Real-time Collaboration:** Enable multiple users to collaborate on the same document in real-time using WebSockets.
4. **Version Control:** Implement a basic version control system that tracks changes made to documents.
5. **Permissions Management:** Allow users to share documents with others, setting permissions (view, edit) for each collaborator.
6. **Change Notifications:** Send notifications to users when a document they have access to is edited.
