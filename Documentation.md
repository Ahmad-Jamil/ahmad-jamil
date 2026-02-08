# Portfolio Website Documentation

## Table of Contents
1. [Project Overview](#project-overview)
2. [Architecture](#architecture)
3. [Application Flow](#application-flow)
4. [Frontend Components](#frontend-components)
5. [Backend API](#backend-api)
6. [Data Management](#data-management)
7. [Features](#features)
8. [Setup & Deployment](#setup--deployment)
9. [Production Deployment](#production-deployment-important)

**📘 For detailed backend deployment instructions, see [BACKEND_DEPLOYMENT.md](./BACKEND_DEPLOYMENT.md)**

---

## Project Overview

This is a personal portfolio website built with Vue.js 3, showcasing professional experience, projects, resume, and references. The application includes a contact form with message storage functionality and an admin interface for viewing messages.

**Tech Stack:**
- **Frontend:** Vue.js 3, Vue Router, Tailwind CSS, Iconify
- **Backend:** Express.js, Node.js
- **PDF Generation:** jsPDF, jspdf-autotable
- **Deployment:** GitHub Pages

---

## Architecture

### High-Level Structure

```
my-portfolio/
├── src/
│   ├── components/          # Vue components
│   ├── router/              # Vue Router configuration
│   ├── data/                # JSON data files
│   ├── backend/             # Express.js server
│   ├── js/                  # Utility scripts
│   ├── assets/              # Static assets
│   ├── App.vue              # Root component
│   └── main.js              # Application entry point
├── public/                  # Public assets
└── dist/                    # Production build
```

### Application Entry Flow

1. **Entry Point (`main.js`)**
   - Initializes Vue 3 application
   - Registers Vue Router
   - Imports global styles
   - Mounts the app to `#app` element

2. **Root Component (`App.vue`)**
   - Renders `NavBar` component (persistent navigation)
   - Contains `<router-view>` for dynamic page content

3. **Router Configuration (`router/index.js`)**
   - Defines all application routes
   - Uses hash-based routing (`createWebHashHistory`) for GitHub Pages compatibility
   - Maps URLs to corresponding components

---

## Application Flow

### User Navigation Flow

```
User visits site
    ↓
App.vue loads → NavBar component rendered
    ↓
Router determines route from URL
    ↓
Corresponding component rendered in <router-view>
    ↓
Component fetches/uses data from JSON files or API
    ↓
Component renders UI with Tailwind CSS styling
```

### Route Structure

| Route | Component | Purpose |
|-------|-----------|---------|
| `/` or `/ahmad-jamil/` | `HomeComponent` | Landing page with profile, skills, experience |
| `/projects` | `ProjectsComponent` | Displays projects organized by company |
| `/contact` | `ContactComponent` | Contact form for visitors to send messages |
| `/resume` | `ResumeComponent` | Interactive resume with PDF download |
| `/references` | `ReferencesComponent` | Professional references/testimonials |
| `/messages` | `ReadMessagesComponent` | Admin interface to view received messages |

---

## Frontend Components

### 1. NavBar Component
**Location:** `src/components/NavBar.vue`

**Functionality:**
- Fixed navigation bar at the top
- Responsive design with mobile menu
- Active route highlighting
- Scroll detection for shadow effect
- Navigation links to all main sections

**Features:**
- Gradient background with backdrop blur
- Mobile hamburger menu
- "Get in touch" call-to-action button

### 2. HomeComponent
**Location:** `src/components/HomeComponent.vue`

**Functionality:**
- Hero section with profile image and introduction
- Work experience timeline
- Education information
- Skills showcase (Programming Languages, Frameworks, Technologies, Professional Skills)
- Uses Iconify for icons

**Data Source:**
- Hardcoded experience data
- Profile image from assets

### 3. ProjectsComponent
**Location:** `src/components/ProjectsComponent.vue`

**Functionality:**
- Displays projects grouped by company
- Sticky company headers
- Project cards with descriptions and tags
- Gradient border effects on hover

**Data Source:**
- `src/data/projects.json` - Contains projects organized by company

**Data Structure:**
```json
[
  {
    "company": "Company Name",
    "projects": [
      {
        "title": "Project Title",
        "description": "Project description",
        "tags": ["Tag1", "Tag2"]
      }
    ]
  }
]
```

### 4. ContactComponent
**Location:** `src/components/ContactComponent.vue`

**Functionality:**
- Contact form with name and message fields
- Character counter (300 max)
- Form validation
- Success/error message display
- Sends POST request to backend API

**API Integration:**
- **Endpoint:** `POST http://localhost:3000/api/messages`
- **Payload:**
  ```json
  {
    "name": "Sender Name",
    "message": "Message content",
    "datetime": "2024-01-01 12:00:00"
  }
  ```

**Flow:**
1. User fills form
2. Clicks "Send Message"
3. POST request sent to backend
4. Success/error message displayed
5. Form cleared on success

### 5. ResumeComponent
**Location:** `src/components/ResumeComponent.vue`

**Functionality:**
- Displays comprehensive resume information
- Two-column layout (sidebar + main content)
- Sections: Professional Summary, Work Experience, Education, Skills, Languages
- PDF download functionality

**Data Source:**
- `src/data/resume.json` - Complete resume data

**PDF Generation:**
- Uses `src/js/resumePDFGenerator.js`
- Generates PDF using jsPDF library
- Includes all resume sections
- Auto page breaks for long content

**PDF Generation Flow:**
1. User clicks "Download PDF" button
2. `downloadPDF()` function called
3. `createResumePDF()` from `resumePDFGenerator.js` invoked
4. PDF generated with formatted content
5. File automatically downloads as "Ahmad_Jamil_CV.pdf"

### 6. ReferencesComponent
**Location:** `src/components/ReferencesComponent.vue`

**Functionality:**
- Displays professional references/testimonials
- Extracts and highlights skills mentioned in references
- Shows key points from each reference
- Formatted quote-style display

**Data Source:**
- `src/data/references.json` - Reference data with company, manager, text, skills, and key points

**Features:**
- Skill extraction from reference text
- Key points highlighting
- Formatted text display with quotation marks

### 7. ReadMessagesComponent
**Location:** `src/components/ReadMessagesComponent.vue`

**Functionality:**
- Admin interface for viewing received messages
- Authentication required before viewing messages
- Login form with username/password
- Displays all messages with name, datetime, and content

**Authentication Flow:**
1. Component loads → Shows login form
2. User enters credentials
3. POST request to `/api/auth` endpoint
4. On success → `isAuthenticated` set to `true`
5. Messages fetched from `/api/messages`
6. Messages displayed in cards

**API Integration:**
- **Authentication:** `POST http://localhost:3000/api/auth`
  - Payload: `{ "username": "...", "password": "..." }`
- **Fetch Messages:** `GET http://localhost:3000/api/messages`

---

## Backend API

### Server Configuration
**Location:** `src/backend/index.js`

**Technology:** Express.js server running on port 3000

**Middleware:**
- CORS enabled for cross-origin requests
- Body parser for JSON request handling

### API Endpoints

#### 1. POST `/api/auth`
**Purpose:** Authenticate admin user for message viewing

**Request Body:**
```json
{
  "username": "!Ghost@Cyprus",
  "password": "!Ghost@Cyprus"
}
```

**Response:**
- **Success (200):** `"Welcome Back"`
- **Failure (401):** `{ "message": "Invalid username or password" }`

**Flow:**
1. Reads `authentication.json` file
2. Compares credentials
3. Returns success/failure response

**Data Source:** `src/backend/data/authentication.json`

---

#### 2. POST `/api/messages`
**Purpose:** Save a new message from contact form

**Request Body:**
```json
{
  "name": "Sender Name",
  "message": "Message content",
  "datetime": "2024-01-01 12:00:00"
}
```

**Response:**
- **Success (200):** `{ "message": "Message saved successfully" }`
- **Error (500):** `{ "message": "Error writing file" }`

**Flow:**
1. Receives message data
2. Reads existing messages from `receivedMessages.json`
3. Appends new message to array
4. Writes updated array back to file

**Data Storage:** `src/backend/data/receivedMessages.json`

---

#### 3. GET `/api/messages`
**Purpose:** Retrieve all saved messages (admin only)

**Response:**
- **Success (200):** Array of message objects
- **Error (500):** `{ "message": "Error reading file" }`

**Response Format:**
```json
[
  {
    "name": "Sender Name",
    "message": "Message content",
    "datetime": "2024-01-01 12:00:00"
  }
]
```

**Flow:**
1. Reads `receivedMessages.json` file
2. Parses JSON
3. Returns array of messages

---

## Data Management

### JSON Data Files

#### 1. `src/data/projects.json`
Contains project information organized by company.

**Structure:**
- Array of company objects
- Each company has array of projects
- Each project has title, description, and tags

#### 2. `src/data/resume.json`
Complete resume data including:
- Contact information
- Professional summary
- Work experience
- Education
- Skills (categorized)
- Languages

#### 3. `src/data/references.json`
Professional references with:
- Company name
- Manager name
- Reference text
- Skills mentioned
- Key points

#### 4. `src/backend/data/authentication.json`
Admin credentials for message viewing.

**Structure:**
```json
{
  "username": "!Ghost@Cyprus",
  "password": "!Ghost@Cyprus"
}
```

#### 5. `src/backend/data/receivedMessages.json`
Stores all messages received through contact form.

**Structure:**
```json
[
  {
    "name": "Sender Name",
    "message": "Message content",
    "datetime": "2024-01-01 12:00:00"
  }
]
```

---

## Features

### 1. Responsive Design
- Mobile-first approach
- Tailwind CSS for styling
- Adaptive layouts for all screen sizes
- Mobile navigation menu

### 2. Modern UI/UX
- Gradient backgrounds and borders
- Glassmorphism effects (backdrop blur)
- Smooth transitions and hover effects
- Icon integration via Iconify

### 3. PDF Generation
- Resume can be downloaded as PDF
- Formatted with proper sections
- Auto page breaks
- Professional layout

### 4. Message System
- Contact form for visitors
- Messages stored in JSON file
- Admin authentication
- Secure message viewing

### 5. Dynamic Content
- Data-driven components
- Easy content updates via JSON files
- No hardcoded content in components

### 6. GitHub Pages Deployment
- Hash-based routing for SPA compatibility
- Build process generates static files
- Deploy script included in package.json

---

## Setup & Deployment

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd my-portfolio
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

### Available Scripts

The following npm scripts are available in `package.json`:

| Script | Command | Description |
|-------|---------|-------------|
| `serve` | `npm run serve` | Start frontend development server (Vue CLI) |
| `dev` | `npm run dev` | Alias for `serve` - start frontend development server |
| `backend` | `npm run backend` | Start Express backend server on port 3000 |
| `build` | `npm run build` | Build production-ready frontend files to `dist/` |
| `lint` | `npm run lint` | Run ESLint to check code quality |
| `deploy` | `npm run deploy` | Build and deploy to GitHub Pages (runs `predeploy` first) |

**Note:** The `backend` script is essential for the contact form and admin messages features to work.

### Development

**Important:** The backend server must be running for the contact form and admin messages features to work.

1. **Start backend server** (in one terminal)
   
   **Option 1: Using npm script (Recommended)**
   ```bash
   npm run backend
   ```
   
   **Option 2: Direct node command**
   ```bash
   node src/backend/index.js
   ```
   
   You should see: `Server is running on http://localhost:3000`
   
   **Keep this terminal window open** - the server must remain running while using the application.

2. **Start frontend development server** (in another terminal)
   ```bash
   npm run serve
   ```
   Application runs on `http://localhost:8080`

**Note:** Both servers need to run simultaneously:
- Backend server (port 3000) - handles API requests for messages and authentication
- Frontend server (port 8080) - serves the Vue.js application

If you see connection errors like "Cannot connect to server", make sure the backend server is running in a separate terminal.

### Production Build

**⚠️ Important:** Before deploying to production, you must deploy the backend server separately. See `BACKEND_DEPLOYMENT.md` for instructions.

1. **Configure Production API URL**
   
   Update `src/config/api.js` with your deployed backend URL:
   ```javascript
   return process.env.VUE_APP_API_URL || 'https://your-backend-url.herokuapp.com';
   ```
   
   Or use environment variables by creating `.env.production`:
   ```
   VUE_APP_API_URL=https://your-backend-url.herokuapp.com
   ```

2. **Build for production**
   ```bash
   npm run build
   ```
   Creates optimized files in `dist/` directory

3. **Deploy to GitHub Pages**
   ```bash
   npm run deploy
   ```
   This runs `predeploy` (build) then `gh-pages -d dist`

### Configuration

**Backend Server:**
- Port: 3000 (development) or `process.env.PORT` (production)
- CORS: Enabled for all origins
- Data files: Located in `src/backend/data/`
- API Configuration: Managed in `src/config/api.js`
  - Automatically detects localhost vs production
  - Can be overridden with `VUE_APP_API_URL` environment variable

**Frontend:**
- Router: Hash-based history mode
- Build output: `dist/` directory
- Public assets: `public/` directory

### Environment Considerations

**Development:**
- Backend must run separately
- API calls use `http://localhost:3000`
- Hot reload enabled for frontend

**Production:**
- **IMPORTANT:** GitHub Pages only serves static files and cannot run Node.js/Express servers
- Backend must be deployed separately to a hosting service (Heroku, Railway, Render, etc.)
- API URLs are automatically configured via `src/config/api.js`:
  - Development: Uses `http://localhost:3000`
  - Production: Uses deployed backend URL (must be configured)
- See `BACKEND_DEPLOYMENT.md` for detailed deployment instructions
- Static files served from `dist/`

### Troubleshooting

#### Backend Server Connection Issues

**Error:** "Cannot connect to server. Please make sure the backend server is running on port 3000."

**Solution:**
1. Make sure the backend server is running in a separate terminal
2. Run `npm run backend` or `node src/backend/index.js`
3. Verify you see the message: `Server is running on http://localhost:3000`
4. Check that port 3000 is not already in use by another application
5. If port 3000 is in use, you can change the PORT in `src/backend/index.js` and update API URLs in components

**Common Issues:**
- **Port already in use:** Another application is using port 3000. Stop that application or change the port.
- **Server not started:** The backend must be running before using contact form or admin messages.
- **CORS errors:** The backend has CORS enabled, but if issues persist, check browser console for specific errors.

#### Frontend Not Loading

**Error:** Frontend shows errors or doesn't load

**Solution:**
1. Make sure all dependencies are installed: `npm install`
2. Check that the frontend server is running: `npm run serve`
3. Verify Node.js version is v14 or higher: `node --version`
4. Clear node_modules and reinstall if needed: `rm -rf node_modules && npm install`

---

## Component Communication Flow

### Contact Form to Backend

```
ContactComponent
    ↓ (User submits form)
POST /api/messages
    ↓
Backend (Express)
    ↓ (Reads receivedMessages.json)
    ↓ (Appends new message)
    ↓ (Writes to file)
Response: Success/Error
    ↓
ContactComponent displays feedback
```

### Admin Message Viewing

```
ReadMessagesComponent
    ↓ (User enters credentials)
POST /api/auth
    ↓
Backend validates against authentication.json
    ↓
Response: Success/Error
    ↓ (If successful)
GET /api/messages
    ↓
Backend reads receivedMessages.json
    ↓
Response: Array of messages
    ↓
ReadMessagesComponent displays messages
```

### PDF Generation

```
ResumeComponent
    ↓ (User clicks Download PDF)
downloadPDF() function
    ↓
createResumePDF(resumeData)
    ↓
resumePDFGenerator.js
    ↓ (Generates PDF using jsPDF)
    ↓ (Formats all sections)
    ↓
PDF file downloads automatically
```

---

## Styling Architecture

### Tailwind CSS
- Utility-first CSS framework
- Custom configuration in `tailwind.config.js`
- Responsive breakpoints
- Custom color schemes with gradients

### Design System
- **Colors:** Indigo, Purple, Blue, Pink gradients
- **Backgrounds:** Dark theme with gradient overlays
- **Cards:** Glassmorphism with backdrop blur
- **Borders:** Gradient borders with blur effects
- **Typography:** Bold headings, readable body text

---

## Security Considerations

### Current Implementation
- Authentication credentials stored in JSON file (not secure for production)
- No encryption for stored messages
- CORS enabled for all origins (development only)

### Production Recommendations
1. Move authentication to environment variables
2. Implement proper authentication (JWT tokens)
3. Use database instead of JSON files
4. Add rate limiting for API endpoints
5. Implement HTTPS
6. Add input validation and sanitization
7. Restrict CORS to specific origins

---

## Production Deployment (Important)

### The Problem

GitHub Pages only serves static files (HTML, CSS, JavaScript). It **cannot run Node.js/Express servers**. This means:

- ✅ Frontend (Vue.js) → Can be deployed to GitHub Pages
- ❌ Backend (Express.js) → **Must be deployed separately**

### The Solution

1. **Deploy Backend Separately**
   - Deploy the backend server to a hosting service that supports Node.js
   - Options: Heroku, Railway, Render, Vercel, etc.
   - See **[BACKEND_DEPLOYMENT.md](./BACKEND_DEPLOYMENT.md)** for detailed instructions

2. **Configure API URLs**
   - The frontend automatically detects the environment
   - For production, update `src/config/api.js` with your deployed backend URL
   - Or use environment variables: `VUE_APP_API_URL`

3. **Deploy Frontend**
   - Build and deploy to GitHub Pages as usual
   - The frontend will connect to your deployed backend

### Quick Start

1. **Deploy Backend** (choose one):
   ```bash
   # Heroku
   cd src/backend
   heroku create your-app-name
   git push heroku main
   ```

2. **Update API Configuration**:
   Edit `src/config/api.js`:
   ```javascript
   return process.env.VUE_APP_API_URL || 'https://your-app-name.herokuapp.com';
   ```

3. **Rebuild and Deploy Frontend**:
   ```bash
   npm run build
   npm run deploy
   ```

### API Configuration

The API configuration is managed in `src/config/api.js`:

- **Development:** Automatically uses `http://localhost:3000` when running locally
- **Production:** Uses the configured backend URL or environment variable

**Files Updated:**
- `src/config/api.js` - Central API configuration
- `src/components/ContactComponent.vue` - Uses API_ENDPOINTS
- `src/components/ReadMessagesComponent.vue` - Uses API_ENDPOINTS

---

## Future Enhancements

### Potential Improvements
1. Database integration (replace JSON files)
2. Email notifications for new messages
3. Message management (delete, archive)
4. Analytics integration
5. Blog section
6. Dark/light theme toggle
7. Multi-language support
8. SEO optimization
9. Progressive Web App (PWA) features
10. Contact form validation improvements

---

## File Structure Summary

```
my-portfolio/
├── src/
│   ├── components/
│   │   ├── NavBar.vue              # Navigation bar
│   │   ├── HomeComponent.vue       # Landing page
│   │   ├── ProjectsComponent.vue   # Projects showcase
│   │   ├── ContactComponent.vue    # Contact form
│   │   ├── ResumeComponent.vue     # Resume display
│   │   ├── ReferencesComponent.vue # References display
│   │   └── ReadMessagesComponent.vue # Admin messages
│   ├── router/
│   │   └── index.js                # Route configuration
│   ├── data/
│   │   ├── projects.json           # Projects data
│   │   ├── resume.json             # Resume data
│   │   └── references.json         # References data
│   ├── backend/
│   │   ├── index.js                # Express server
│   │   ├── package.json            # Backend dependencies
│   │   ├── Procfile                # Heroku deployment config
│   │   └── data/
│   │       ├── authentication.json  # Admin credentials
│   │       └── receivedMessages.json # Stored messages
│   ├── config/
│   │   └── api.js                  # API URL configuration
│   ├── js/
│   │   └── resumePDFGenerator.js   # PDF generation utility
│   ├── assets/
│   │   ├── css/
│   │   │   └── style.css           # Global styles
│   │   └── images/
│   │       └── personal/
│   │           └── ahmad.jpeg      # Profile image
│   ├── App.vue                     # Root component
│   └── main.js                     # Application entry
├── public/
│   └── index.html                  # HTML template
├── package.json                    # Dependencies & scripts
├── vue.config.js                   # Vue CLI configuration
├── tailwind.config.js              # Tailwind configuration
└── README.md                        # Basic setup instructions
```

---

## Conclusion

This portfolio website provides a comprehensive showcase of professional work with modern UI/UX, interactive features, and a functional contact system. The architecture separates concerns between frontend (Vue.js) and backend (Express.js), making it maintainable and scalable.

The application follows Vue.js best practices with component-based architecture, uses modern styling with Tailwind CSS, and includes features like PDF generation and message management. The codebase is well-organized with clear separation of data, components, and utilities.

