# SuurAI - AI-Powered Podcast Discovery Platform
SuurAI is a comprehensive AI-powered podcast discovery platform that combines intelligent mood-based recommendations with a beautiful glassmorphic user interface. The platform uses advanced AI models to understand user preferences and deliver personalized podcast recommendations through multiple APIs including Spotify, Google Gemini AI, and QLOO.

## 🚀 Architecture Overview

SuurAI consists of two main components:
- **Frontend**: React 19 + TypeScript application with glassmorphic design
- **Backend**: Flask API server with AI-powered recommendation engine

## 🎙️ Features

### AI-Powered Discovery Engine
- **Natural Language Processing**: Uses Google Gemini AI to understand user mood and preferences
- **Intelligent Category Mapping**: Maps user input to 15 predefined podcast categories
- **Multi-API Integration**: Combines QLOO recommendations with Spotify episode data
- **Real-time Recommendations**: Instant podcast suggestions based on mood or activity

### Premium User Experience
- **Glassmorphic Design**: Modern frosted glass aesthetic throughout
- **Smooth Animations**: Micro-interactions and hover effects
- **Responsive Layout**: Optimized for desktop, tablet, and mobile
- **Dark Theme**: Easy on the eyes with purple/blue gradients
- **Interactive Audio Player**: Full playback controls with progress tracking

### Content Management
- **Episode Details**: Comprehensive episode information from Spotify
- **Podcast Information**: Publisher details, descriptions, and external links
- **Search & Filter**: Advanced filtering by genre, popularity, and duration
- **User Interactions**: Like, share, and playlist functionality

### Authentication & Security
- **User Authentication**: Secure login and registration system
- **Protected Routes**: Content access requires authentication
- **Persistent Sessions**: Stay logged in across browser sessions
- **Form Validation**: Real-time feedback on user inputs

## 🛠️ Tech Stack

### Frontend
- **Framework**: React 19 + TypeScript
- **Styling**: TailwindCSS 4.1.4 with custom glassmorphic effects
- **Routing**: React Router DOM 7.7.0
- **HTTP Client**: Axios 1.11.0
- **Icons**: Lucide React 0.525.0
- **Build Tool**: Vite 6.3.0
- **Linting**: ESLint with TypeScript support

### Backend
- **Framework**: Flask 3.1.1 with CORS support
- **AI Integration**: Google Gemini AI (gemini-2.5-flash model)
- **APIs**: Spotify Web API, QLOO Recommendation API
- **HTTP Client**: Requests 2.32.4 with retry logic
- **Configuration**: Python-dotenv for environment management
- **Data Processing**: Custom preprocessing pipeline for mood analysis

## 🚀 Quick Start

### Prerequisites
- **Node.js 18+** (React Router requires Node 20+, but works with 18)
- **Python 3.8+** for backend development
- **npm or yarn** package manager
- **API Keys**: Spotify, Google Gemini AI, and QLOO (see Configuration section)

### Backend Setup

1. **Navigate to backend directory**
   ```bash
   cd SuurAI/backend
   ```

2. **Create virtual environment**
   ```bash
   python -m venv venv
   
   # Windows PowerShell
   .\venv\Scripts\Activate.ps1
   
   # Windows Command Prompt
   .\venv\Scripts\activate.bat
   
   # macOS/Linux
   source venv/bin/activate
   ```

3. **Install Python dependencies**
   ```bash
   pip install -r requirements.txt
   ```

4. **Configure environment variables**
   Create a `.env` file in the backend directory:
   ```env
   # Spotify API Configuration
   SPOTIFY_BASE_URL=https://accounts.spotify.com/api/token
   SPOTIFY_CLIENT_ID=your_spotify_client_id
   SPOTIFY_CLIENT_SECRET=your_spotify_client_secret
   
   # Google Gemini AI Configuration
   GEMINI_API_KEY=your_gemini_api_key
   SYSTEM_PROMPT=your_system_prompt_for_category_mapping
   
   # QLOO API Configuration
   QLOO_API_URI=your_qloo_api_endpoint
   QLOO_API_KEY=your_qloo_api_key
   
   # Flask Configuration
   DEBUG=true
   HOST=127.0.0.1
   PORT=5000
   ```

5. **Start backend server**
   ```bash
   python main.py
   ```
   Backend will be available at `http://localhost:5000`

### Frontend Setup

1. **Navigate to frontend directory**
   ```bash
   cd SuurAI/frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   Create a `.env` file in the frontend directory:
   ```env
   VITE_API_BASE_URL=http://localhost:5000
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```
   Frontend will be available at `http://localhost:5173`

### Available Scripts

#### Frontend Scripts
```bash
# Development server
npm run dev

# Production build
npm run build

# Preview production build
npm run preview

# Lint code
npm run lint
```

#### Backend Scripts
```bash
# Start development server
python main.py

# Start with virtual environment
# Windows
.\venv\Scripts\Activate.ps1 && python main.py

# macOS/Linux
source venv/bin/activate && python main.py
```

## 🎨 Design System

### Color Palette
- **Primary**: Purple (`#8b5cf6`) to Blue (`#3b82f6`)
- **Background**: Slate 900 (`#0f172a`) with purple tints
- **Text**: White to Slate 300 hierarchy
- **Accents**: Cyan (`#06b6d4`), Green (`#10b981`) for features

### Typography
- **Headers**: Bold, 2xl-7xl sizes with gradient text effects
- **Body**: Regular weight, slate-300 color
- **Interactive**: Medium weight with hover color transitions

### Glass Effects
- **Backdrop Blur**: 16-24px blur for depth
- **Transparency**: 30-50% background opacity
- **Borders**: Subtle white/gray borders with low opacity
- **Shadows**: Multi-layered box shadows for realism

### AI Processing Pipeline

1. **User Input**: Natural language mood description
2. **Preprocessing**: LLM-based category mapping using Gemini AI
3. **Recommendation**: QLOO API provides podcast suggestions
4. **Enhancement**: Spotify API adds episode details and metadata
5. **Response**: Combined data delivered to frontend


## 🎯 Conclusion

SuurAI represents more than just a podcast discovery tool—it's a solution to the modern problem of content overload. By combining AI understanding with contextual awareness, we've created a system that doesn't just find podcasts, but finds the *right* podcasts for the *right* moments.

The journey from conception to implementation taught me that great software isn't just about the technology stack, but about understanding user needs, designing intuitive flows, and building systems that can evolve and scale.
