# Let's get Internship Ready!

👋🏽 Hello there! Congratulations on being shortlisted for an internship opportunity at NxtJob. This document outlines your task, which should be ideally submitted within 5 days.

## Next Steps

To advance in this opportunity, complete the following tasks and submit a PR (Pull Request) to this repository.

Firstly, clone this repository or download it as a zip file. Inside the repository, you'll find a folder named `intern_challenge`. Make a copy of this folder and rename it to your full name, using snake_case for spaces (for instance, john_doe). Inside this folder, you will find two `'answers.txt'` files located in the `'technical'` and `'non_technical'` subfolders. Edit these files with your responses.

The coding task should be executed within a subfolder named `'coding_tasks'`. Start by initializing your backend project here.

## Technical Questions

1. Explain, in your own words, the importance of data consistency in real-time applications.
2. How do you handle concurrency issues in a multi-user environment?
3. Describe a scenario where you had to optimize database queries for better performance.
4. Discuss the trade-offs between using WebSockets and HTTP/2 for real-time communication.


## Non-Technical Questions

1. How do you stay updated on backend development topics and remain active in the community? (Forums/Discord/Slack/Meetups/Twitter/Blogs)
2. What are your most-used IDE and keyboard shortcuts when coding?
3. How do you approach the design and implementation of a scalable backend system? Feel free to attach code snippets for better explanation.

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