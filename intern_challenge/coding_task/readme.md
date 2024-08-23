
## Coding Task

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