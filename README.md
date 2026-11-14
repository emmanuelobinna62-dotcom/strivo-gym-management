# Strivo — Gym Management System

Strivo is a gym management web application built to help fitness businesses manage their members, class schedules, bookings, membership requests, and trainers from one platform.

The application combines a public-facing gym website with dedicated member and administrator dashboards. Members can explore available classes, book sessions, view their bookings, and submit membership requests. Administrators can manage the gym's day-to-day operations through a central dashboard.

The project was developed as a full-stack demonstration of a custom gym management solution using React and Supabase.

## Overview

Strivo is designed around two main user experiences:

- **Member experience:** Browse gym classes, book available sessions, manage bookings, view membership information, and submit membership requests.
- **Administration:** Monitor gym activity, manage membership requests, oversee bookings, create and manage classes, and maintain trainer profiles.

The application uses Supabase for authentication, database operations, and trainer image storage.

## Features

### Member Features

- Account registration and login.
- Role-based access to protected member pages.
- Member dashboard with profile information.
- View upcoming and previous class bookings.
- Browse available gym classes and scheduled sessions.
- Book available class sessions.
- Cancel existing bookings.
- Browse membership plans.
- Submit membership requests.

### Administration Features

- Dedicated administrator dashboard.
- Overview of key gym activity and membership information.
- View and manage membership requests.
- Approve or reject membership requests.
- View and manage class bookings.
- Create, update, and delete gym classes.
- Create, update, and delete trainer profiles.
- Upload and manage trainer profile images.
- Assign trainers to gym classes.

### Application Features

- Supabase authentication and database integration.
- Role-based route protection.
- Responsive layouts for desktop and mobile screens.
- Database-backed content management.
- Booking validation and capacity controls.
- Row Level Security (RLS) policies for protected database operations.

## Technology Stack

| Technology | Purpose |
|---|---|
| React | User interface and application components |
| Vite | Development server and build tooling |
| JavaScript | Application logic |
| Tailwind CSS | Styling and responsive layouts |
| React Router | Client-side routing and navigation |
| Supabase | Authentication, PostgreSQL database, and storage |
| Font Awesome | Interface icons |
| Vercel | Application deployment |

## Application Structure

The application is organised into reusable components, page-level views, and shared services.

```text
src/
├── components/       # Reusable interface components
├── lib/              # Supabase client configuration
├── pages/            # Application pages and dashboards
├── App.jsx           # Application routes
└── main.jsx          # Application entry point

public/               # Static assets
```

The exact contents of individual folders may evolve as the project develops.

## Getting Started

### Requirements

Before running the project, make sure you have:

- Node.js installed.
- npm installed.
- A Supabase project.
- Git installed.

### 1. Clone the Repository

```bash
git clone https://github.com/YOUR-USERNAME/strivo-gym-management.git
```

Replace `YOUR-USERNAME` with the GitHub account that owns the repository.

Move into the project directory:

```bash
cd strivo-gym-management
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env` file in the root directory of the project.

Use the provided `.env.example` file as a reference.

Add your Supabase project credentials:

```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_PUBLISHABLE_KEY=your_supabase_publishable_key
```

You can obtain these values from your Supabase project dashboard.

**Important:** Use the Supabase publishable key in the frontend. Never expose your Supabase secret key or service-role key in client-side code or commit them to GitHub.

### 4. Configure Supabase

Strivo requires a Supabase backend configured with the database tables, relationships, authentication settings, and security policies used by the application.

The backend includes data for:

- User profiles and roles.
- Trainers.
- Classes.
- Scheduled class sessions.
- Bookings.
- Membership plans and membership requests.

The application also uses a `trainer-images` Storage bucket for trainer profile images.

Configure the required Row Level Security policies and administrator permissions before using the application.

A fresh Supabase project will not automatically contain Strivo's database structure or policies.

### 5. Start the Development Server

```bash
npm run dev
```

Vite will provide a local development URL, usually:

```text
http://localhost:5173
```

Open that address in your browser to access the application.

### 6. Build for Production

To create a production build:

```bash
npm run build
```

To preview the production build locally:

```bash
npm run preview
```

## Deployment

Strivo is suitable for deployment on Vercel.

1. Push the project to GitHub.
2. Import the GitHub repository into Vercel.
3. Configure the project as a Vite application.
4. Add the required environment variables in Vercel's project settings.
5. Deploy the application.

The environment variables required for deployment are:

```env
VITE_SUPABASE_URL
VITE_SUPABASE_PUBLISHABLE_KEY
```

Once GitHub is connected to Vercel, new commits pushed to the production branch can trigger automatic deployments.

## Security Considerations

Security is an important part of the application's backend design.

- Supabase authentication is used for user identity.
- Protected routes restrict access to member and administrator areas.
- Database access is controlled through Row Level Security policies.
- Administrator permissions are validated through database-level role checks.
- Environment variables are used to configure the Supabase connection.

The Supabase publishable key is intended for frontend use, but it does not replace proper database security. RLS policies and appropriate permissions must be configured correctly.

Never commit private credentials, service-role keys, or other backend secrets to the repository.

## Current Project Scope

Strivo is a functional demonstration of a custom gym management platform.

Membership requests currently follow a manual payment process, with payment completion handled outside the application. Online payment processing and automated email notifications are not included in the current implementation.

These features can be integrated in a future production deployment depending on the gym's operational requirements.

## Project Purpose

This project demonstrates the development of a database-driven management application with authentication, role-based access, CRUD operations, booking workflows, and a dedicated administrative interface.

It explores how custom web applications can help fitness businesses organise their operations and provide a better digital experience for their members.

---

**Built with React, Tailwind CSS, and Supabase.**