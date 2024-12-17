# Jira Clone

A Jira-inspired project management tool built with modern web technologies to facilitate workspace and project organization, task management, and collaboration.

## Features

- **Authentication:**

  - Email/password-based login
  - Google and GitHub OAuth integration
  - Session-based authentication

- **Workspaces and Projects:**

  - Create and manage multiple workspaces
  - Add projects within workspaces
  - Role-based access control (Admin/User) for workspaces
  - Invite and manage workspace members via shareable links

- **Task Management:**

  - Create, update, delete, and organize tasks
  - Task views:
    - **Kanban View:** Drag & drop interface
    - **Calendar View:** Integrated, Google Calendar-style view
    - **Table View:** Spreadsheet-like structure for tasks
    - Upload and manage task-related images via Appwrite Storage

- **Analytics:**
  - Simple visual analytics for workspaces and projects

- **Responsive Design:** Fully responsive UI using ShadCN components and Tailwind CSS.


## Technologies Used

- **Frontend:**

  - Next.js 14 with TypeScript
  - Tailwind CSS for styling
  - ShadCN UI for UI components
  - TanStack React Query for data fetching, caching, and revalidation

- **Backend:**

  - Appwrite for database, authentication, and storage
  - Hono.js for building RESTful APIs

- **Deployment:**

  - Vercel for frontend hosting


## Getting Started

### Prerequisites

To run this project locally, ensure you have the following installed:

- Node.js (v18+)
- npm or yarn
- Appwrite server setup
- Installation

### Clone the repository:

```bash
Copy code
git clone https://github.com/yourusername/jira-clone.git
cd jira-clone
```

### Install dependencies:

``` bash
npm install
# or
yarn install
```

### Configure environment variables:

Copy .env.example to .env.local and add values for the variables

### Start the development server:

``` bash
Copy code
npm run dev
```

Open your browser and navigate to [http://localhost:3000](http://localhost:3000).
