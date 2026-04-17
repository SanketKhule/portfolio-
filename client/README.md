# Portfolio Frontend

A modern personal portfolio built with Next.js, React, Tailwind CSS v4, and reusable UI components.

This project includes:
- Interactive landing page sections (hero, skills, projects, contact)
- Floating navigation
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
EMAIL=your-gmail-address@gmail.com
EMAIL_PASS=your-app-password
CONTACT_RECEIVER_EMAIL=your-receiving-email@gmail.com
```

Notes:
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
- `/api/contact` - POST endpoint for contact/hiring emails

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
	page.tsx
components/
```

## Deployment Notes

- For production, set the same environment variables in your hosting platform.

## Deploy On Vercel

1. Push the `frontend` project to GitHub.
2. Import the repository in Vercel.
3. In Vercel Project Settings, add environment variables:
	- `EMAIL`
	- `EMAIL_PASS`
	- `CONTACT_RECEIVER_EMAIL`
4. Redeploy the project.

## Author

Sanket Khule
