# Portfolio Frontend

A modern personal portfolio built with Next.js, React, Tailwind CSS v4, and reusable UI components.

This project includes:
- Interactive landing page sections (hero, skills, projects, contact)
- Floating navigation
- Feedback submission flow with backend persistence
- Contact API route with email delivery using Nodemailer
- A custom footer inspired by grid-style footer layouts

## Tech Stack

- Next.js 16 (App Router)
- React 19
- TypeScript
- Tailwind CSS v4
- shadcn/ui style primitives
- Nodemailer (for contact emails)

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Create environment file

Create a `.env.local` file in the project root and add:

```env
MONGODB_URI=your-mongodb-atlas-uri
MONGODB_DB=portfolio
EMAIL=your-gmail-address@gmail.com
EMAIL_PASS=your-app-password
CONTACT_RECEIVER_EMAIL=your-receiving-email@gmail.com
```

Notes:
- `MONGODB_URI` is required for feedback backend (`/api/feedback`).
- `MONGODB_DB` is optional and defaults to `portfolio`.
- `EMAIL` and `EMAIL_PASS` are used by the contact API transporter.
- `CONTACT_RECEIVER_EMAIL` is optional. If missing, mails are sent to `EMAIL`.

### 3. Run development server

```bash
npm run dev
```

Open http://localhost:3000

## Available Scripts

- `npm run dev` - start local development server
- `npm run build` - create production build
- `npm run start` - start production server
- `npm run lint` - run ESLint checks

## Main Routes

- `/` - portfolio homepage
- `/reviwe` - feedback form page/section source route
- `/feedbachtemp` - feedback listing page
- `/api/contact` - POST endpoint for contact/hiring emails
- `/api/feedback` - GET and POST endpoint for feedback data

Important:
- Route names currently use existing folder spellings: `reviwe` and `feedbachtemp`.

## Feedback System

### Submit feedback

Request:

```http
POST /api/feedback
Content-Type: application/json

{
	"name": "John Doe",
	"email": "john@example.com",
	"message": "Great portfolio!"
}
```

Behavior:
- Validates `name`, `email`, `message`
- Validates email format
- Stores feedback entries in MongoDB

### Read feedback

```http
GET /api/feedback
```

Response contains:
- `feedback`: array of saved entries (latest first)

### Storage location

- Feedback is stored in MongoDB collection `feedback`

## Contact API (Email)

Endpoint:

```http
POST /api/contact
Content-Type: application/json

{
	"email": "client@example.com",
	"number": "+91xxxxxxxxxx",
	"companyName": "Acme Inc",
	"description": "We want to hire you for..."
}
```

Behavior:
- Validates all fields
- Validates email format
- Sends a styled email using Nodemailer + Gmail

## Project Structure (High Level)

```text
app/
	api/
		contact/route.ts
		feedback/route.ts
	reviwe/page.tsx
	feedbachtemp/page.tsx
	page.tsx
components/
```

## Deployment Notes

- For production, set the same environment variables in your hosting platform.
- Feedback backend is MongoDB-based for both development and production.

## Deploy On Vercel

1. Push the `frontend` project to GitHub.
2. Import the repository in Vercel.
3. In Vercel Project Settings, add environment variables:
	- `MONGODB_URI`
	- `MONGODB_DB`
	- `EMAIL`
	- `EMAIL_PASS`
	- `CONTACT_RECEIVER_EMAIL`
4. Redeploy the project.

Important:
- Make sure MongoDB Atlas Network Access allows your deployment egress IP(s).

## Author

Sanket Khule
