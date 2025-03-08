# System Design & Architecture for MVP Product

## Overview
This document outlines the system design and architecture for building the MVP. The system will initially be built as a monolithic architecture for simplicity and cost-effectiveness during the MVP phase. The system will be designed with future scalability in mind, enabling an easy migration to microservices or serverless architecture once traffic and load increase.

## Key Components
- Front-end
- Back-end
- Database
- Authentication
- Notifications
- Hosting and Infrastructure

### 1. Front-end: Next.js
**Technology Stack:** Next.js will serve as both the front-end and API layer.  
**Responsibilities:**
- Dynamic pages (e.g., Dashboard, Project Management, Task Management).
- Client-side interactions (e.g., adding tasks, updating statuses).
- API routes for server-side operations (e.g., user authentication, task CRUD operations).
- Server-side rendering (SSR) for faster initial page loads and SEO optimization.

### 2. Back-end: Next.js API Routes
**Technology Stack:** Node.js with Next.js API routes.  
**Responsibilities:**
- Implement all back-end logic within Next.js using API routes.
- CRUD operations for tasks, projects, and user roles.
- User authentication (JWT or OAuth).
- Real-time notifications (WebSockets or Server-Sent Events).
- Interactions with the PostgreSQL database for data persistence.

### 3. Database: PostgreSQL
**Technology Stack:** PostgreSQL with Prisma ORM for data management.  
**Responsibilities:**
- Store user, project, task, comment, and notification data.
- Relational database structure:
    - Tables: Users, Projects, Tasks, Comments, Notifications, etc.
    - Foreign keys to link entities like users to tasks, projects to tasks, etc.
    - Indexing for performance optimization (e.g., task statuses, due dates).
    - Use Prisma ORM to simplify interactions with the database.

#### Database Schema Design
- **Users:** Store user details and authentication info.
- **Projects:** Store project-specific data (name, description, status, etc.).
- **Tasks:** Tasks associated with projects, each task can be assigned to one or more users.
- **Comments:** Allow collaboration by adding comments on tasks or projects.
- **Permissions:** Role-based access control (RBAC) with roles such as Viewer, Editor, Owner.

#### Considerations:
- **Scalability:** Ensure database can handle high query volume by indexing key columns.
- **Permissions:** Implement authorization logic to enforce user permissions in the code (e.g., middleware for role checks).

### 4. Authentication: JWT or OAuth
**Authentication Strategy:**
- Use JWT for stateless authentication.
- Users authenticate via email/password or OAuth (e.g., Google, GitHub).
- On login, users receive a JWT, which is included in subsequent API requests.

**Library:** Use Better Auth for Next.js to manage authentication with multiple providers.

### 5. Notifications
- **In-App Notifications:** Use WebSockets or Server-Sent Events (SSE) for real-time task/project updates.
- **Email Notifications:** Trigger email notifications via a third-party service like SendGrid or AWS SES.
- **Push Notifications:** Use Firebase Cloud Messaging (FCM) for push notifications.

### 6. Hosting and Infrastructure
- **Cloud Platform:** AWS, GCP, or Azure for deployment.
- **Hosting:** Vercel (ideal for Next.js apps) for automatic scaling, CDN caching, and fast deployment.
- **Database Hosting:** Use Heroku Postgres, AWS RDS, or ElephantSQL for a simple and scalable PostgreSQL setup.
- **Cost-Effective Setup:** For MVP, Vercel + PostgreSQL (on Heroku or AWS) offers an easy and affordable solution.

## High-Level Architecture
Here is a simplified diagram illustrating the interactions between different components of the system:

+-----------------------+
|       Frontend        | <--> User interacts (Next.js)
+-----------------------+
           |
           v
+-----------------------+        +-------------------+
|      Backend API      | <-->  |     Firebase      |
|    (Node.js + Prisma) |        | Cloud Messaging   |
+-----------------------+        +-------------------+
           |
           v
+-----------------------+
|      PostgreSQL       |
|  (Prisma ORM)         |
| - Users               |
| - Projects            |
| - Tasks               |
| - Comments            |
| - Permissions         |
+-----------------------+

## Component Interactions
- Frontend communicates with the Backend API to handle user actions.
- Backend API performs CRUD operations on the PostgreSQL database using Prisma ORM.
- Firebase Cloud Messaging (FCM) sends notifications when task or project updates occur.
- Database stores all the data related to users, tasks, projects, and permissions.

## User Roles & Permissions
**User Roles:**
- **Viewer:** Read-only access to projects and tasks.
- **Editor:** Can modify tasks and project details.
- **Owner:** Full control over the project, including deletions and user management.

**Permissions:**
- Implement Role-Based Access Control (RBAC) to manage user access to various parts of the system.
- Permissions for tasks and projects are stored in the database and enforced through middleware checks in the backend.

## Scalability Considerations
- **Monolithic to Microservices Migration:** As the system scales, it is possible to extract components like task management or user authentication into separate microservices.
- **Database Indexing:** As user base grows, proper indexing of key columns (e.g., task_status, project_id, user_id) will be crucial for maintaining fast query performance.

## Conclusion
This design outlines a simple yet scalable architecture for an MVP product. Starting with a monolithic approach will allow for rapid development and testing, while maintaining the flexibility to transition to microservices or serverless architecture as the product scales.