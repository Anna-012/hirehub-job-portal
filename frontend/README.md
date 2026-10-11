# HireHub — MERN Job Portal

HireHub is a full-stack job portal built using the MERN stack. It connects job seekers with recruiters and provides tools to manage job listings, applications, candidate profiles, and recruitment activities.

## Features

### Authentication and Authorization
- User registration and login
- Role-based access for job seekers and recruiters
- Protected routes and authenticated API requests

### Job Seeker
- Browse and search job listings
- View job details
- Apply for jobs
- Save jobs for later
- Manage profile, education, experience, and skills
- Upload and manage resumes
- Track job applications
- AI-powered resume analysis
- AI-powered job matching and recommendations

### Recruiter
- Recruiter dashboard with hiring statistics
- Create, manage, edit, and delete job listings
- Activate or deactivate job listings
- View applicants for individual jobs or across listings
- Review candidate applications
- Shortlist, reject, and hire candidates
- Preview and download resumes
- Manage company profile
- AI-powered candidate search

## Tech Stack

**Frontend**
- React
- Vite
- React Router
- Tailwind CSS
- Axios

**Backend**
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT-based authentication

**AI and Other Tools**
- Google Gemini API
- Git and GitHub

## Project Structure

```text
MERN Job Portal/
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── services/
│   ├── utils/
│   ├── validators/
│   ├── package.json
│   └── server.js
├── frontend/
│   ├── public/
│   ├── src/
│   ├── package.json
│   └── vite.config.js
├── .gitignore
└── README.md
```

## Prerequisites

Before running HireHub locally, install:

- Node.js and npm
- MongoDB or a MongoDB Atlas database
- Git

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/Anna-012/hirehub-job-portal.git
cd hirehub-job-portal
```

### 2. Install backend dependencies

```bash
cd backend
npm install
```

### 3. Configure backend environment variables

Create a `.env` file inside the `backend` folder. Add the environment variables required by your backend configuration.

Example variable names (adjust them to match your actual code):

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
GEMINI_API_KEY=your_gemini_api_key
```

Never commit real credentials, API keys, or secrets to GitHub.

### 4. Start the backend

Run the command configured in your backend `package.json`. For example:

```bash
npm run dev
```

If your project uses a different script, use the appropriate command from `backend/package.json`.

### 5. Install frontend dependencies

Open a new terminal from the project root and run:

```bash
cd frontend
npm install
```

### 6. Configure the frontend

Create a frontend `.env` file only if your frontend configuration requires one.

For Vite, environment variables exposed to browser code generally use the `VITE_` prefix. Never place private API keys or database credentials in frontend environment variables.

Example:

```env
VITE_API_URL=http://localhost:5000/api
```

Use the exact variable name and URL format expected by your Axios configuration.

### 7. Start the frontend

```bash
npm run dev
```

Open the local URL displayed by Vite in your terminal.

## Security Notes

- Environment files are excluded from Git using `.gitignore`.
- Keep database credentials, JWT secrets, and AI API keys private.
- Use appropriate authentication and authorization for protected endpoints.
- Configure production environment variables separately from local development.

## Future Improvements

- Production deployment and live demo
- Automated testing
- Email notifications
- Additional recruitment analytics

## Author

**Afreen**

GitHub: [Anna-012](https://github.com/Anna-012)

---

Built as a full-stack MERN job portal project.