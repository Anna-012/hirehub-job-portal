# HireHub — AI-Powered MERN Job Portal

HireHub is a full-stack job portal built using the MERN stack. It connects job seekers with recruiters through job listings, application management, candidate profiles, and AI-powered recruitment features.

## 🚀 Live Demo
https://hirehub-job-portal-flame.vercel.app/

<img width="1903" height="807" alt="image" src="https://github.com/user-attachments/assets/86b0cd03-4727-4306-8b7c-18e419eedd5a" />

## ✨ Features

### 🔐 Authentication & Authorization
- User registration and login.
- Role-based access for Job Seekers and Recruiters.
- JWT-based authentication.
- Protected routes and authenticated API requests.

### 👨‍💻 Job Seeker
- Browse and search job listings.
- View detailed job descriptions.
- Apply for jobs.
- Save jobs for later.
- Manage profile, education, experience, and skills.
- Upload and manage resumes.
- Track job application status.
- AI-powered resume analysis.
- AI-powered job matching and recommendations.

### 🏢 Recruiter
- Recruiter dashboard with hiring statistics.
- Create, edit, activate, deactivate, and delete job listings.
- View applicants for individual jobs.
- Review candidate applications.
- Shortlist, reject, and hire candidates.
- Preview and download resumes.
- Manage company profile.
- AI-powered candidate search and ranking.

### 🤖 AI Features
- Resume analysis using Google Gemini API.
- Match percentage between candidate resumes and job descriptions.
- Identification of relevant and missing skills.
- AI-powered candidate search for recruiters.

## 🛠️ Tech Stack

**Frontend**
- React.js
- Vite
- React Router
- Tailwind CSS
- Axios

**Backend**
- Node.js
- Express.js
- REST APIs
- JWT Authentication
- Role-Based Access Control

**Database**
- MongoDB
- Mongoose

**AI & Integrations**
- Google Gemini API
- Cloudinary

**Tools**
- Git
- GitHub
- Postman

## 📁 Project Structure

```text
hirehub-job-portal/
│
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
│
├── frontend/
│   ├── public/
│   ├── src/
│   ├── package.json
│   └── vite.config.js
│
├── .gitignore
└── README.md
```

*Note: Folder names may vary according to the actual project structure.*

## ⚙️ Prerequisites

Make sure you have installed:

- Node.js
- npm
- MongoDB or MongoDB Atlas
- Git

## 🚀 Getting Started

Follow these steps to run the project locally.

### 1. Clone the Repository

```bash
git clone https://github.com/Anna-012/hirehub-job-portal.git
cd hirehub-job-portal
```

### 2. Install Backend Dependencies

```bash
cd backend
npm install
```

### 3. Configure Backend Environment Variables

Create a `.env` file inside the `backend` directory.

Add the environment variables required by your application.

Example:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
GEMINI_API_KEY=your_gemini_api_key
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```

Use the exact variable names expected by your backend code. Add any other required variables if applicable.

**Security:** Never upload your actual `.env` file, database credentials, API keys, or secrets to GitHub.

### 4. Start the Backend Server

From the backend directory, run:

```bash
npm run dev
```

### 5. Install Frontend Dependencies

Open a new terminal and navigate to the project root:

```bash
cd frontend
npm install
```

### 6. Configure Frontend Environment Variables

If your Axios configuration uses a frontend API URL, create a `.env` file inside the frontend directory.

Example:

```env
VITE_API_URL=http://localhost:5000/api
```

Use the exact variable name and API URL expected by your frontend code.

Never expose private API keys or database credentials in frontend environment variables.

### 7. Start the Frontend Application

From the frontend directory, run:

```bash
npm run dev
```

Open the local URL displayed in your terminal to access HireHub.

## 🔒 Security

- JWT-based authentication for protected routes.
- Role-based authorization for recruiter and job seeker features.
- Environment variables for sensitive configuration.
- Keep database credentials and API secrets private.

## 📸 Screenshots

<img width="1483" height="797" alt="image" src="https://github.com/user-attachments/assets/4fc3f6b9-431d-4a17-a97e-f6a86957c680" />
<img width="1887" height="851" alt="image" src="https://github.com/user-attachments/assets/066018bc-199d-4770-ab55-13de2d6552d0" />
<img width="1513" height="790" alt="image" src="https://github.com/user-attachments/assets/16e35d44-1d8b-45a5-91f9-aabde367f2e4" />
<img width="1637" height="726" alt="image" src="https://github.com/user-attachments/assets/d89f55cc-a7e5-481d-bd62-5568c5b5d54a" />
<img width="1873" height="851" alt="image" src="https://github.com/user-attachments/assets/4a1cf46d-b418-4817-ade9-3b82e69fb247" />
<img width="1855" height="833" alt="image" src="https://github.com/user-attachments/assets/c8a86294-9315-44cf-abbc-46ea1f3c12f1" />
<img width="1882" height="837" alt="image" src="https://github.com/user-attachments/assets/ea1c607c-aa7d-4148-bf77-bf328fab930a" />
<img width="1882" height="808" alt="image" src="https://github.com/user-attachments/assets/3aa21c54-d66e-4b1f-9551-bb8533bfe9ec" />



## 🔮 Future Improvements

- Improve application tracking and notifications.
- Add more advanced recruitment analytics.
- Enhance AI-based candidate recommendations.
- Add automated testing and performance improvements.

## 👩‍💻 Author

**Afreen Sabbagh**

Full Stack Developer | MERN Stack

- GitHub: [Anna-012](https://github.com/Anna-012)
- Email:afreensabbahh01@gmail.com

---

Built with React, Node.js, Express, MongoDB, and Google Gemini AI.
