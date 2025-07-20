# SuurAI - AI-Powered Music Discovery Platform

![SuurAI Logo](https://via.placeholder.com/150x50/8b5cf6/ffffff?text=SuurAI)

SuurAI is a modern, glassmorphic music discovery platform that uses AI to help users find the perfect soundtrack based on their mood, activity, or preferences. Built with React, TypeScript, and TailwindCSS, featuring a premium user experience with smooth animations and intuitive navigation.

## 🎵 Features

### Core Functionality
- **AI-Powered Music Discovery**: Natural language queries to find music
- **Mood-Based Recommendations**: Describe your feeling or activity
- **Interactive Music Player**: Full playback controls with progress tracking
- **Song Details**: Comprehensive track information and audio features
- **Similar Tracks**: AI-curated recommendations based on current selection

### Premium UX/UI
- **Glassmorphic Design**: Modern frosted glass aesthetic throughout
- **Smooth Animations**: Micro-interactions and hover effects
- **Responsive Layout**: Optimized for desktop, tablet, and mobile
- **Dark Theme**: Easy on the eyes with purple/blue gradients
- **Premium Typography**: Carefully crafted text hierarchy

### Authentication & Security
- **User Authentication**: Secure login and registration
- **Protected Routes**: Content access requires authentication
- **Persistent Sessions**: Stay logged in across browser sessions
- **Form Validation**: Real-time feedback on user inputs

## 🛠️ Tech Stack

- **Frontend**: React 19 + TypeScript
- **Styling**: TailwindCSS 4.1.4 with custom glassmorphic effects
- **Routing**: React Router DOM 7.7.0
- **Icons**: Lucide React 0.525.0
- **Build Tool**: Vite 6.3.0
- **Linting**: ESLint with TypeScript support

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ (Note: React Router requires Node 20+, but works with 18)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd SuurAI/frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   Navigate to `http://localhost:5173`

### Available Scripts

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

## 🧪 Testing Guide

### 1. Authentication Flow

#### **Sign Up Test**
1. Navigate to the home page (`http://localhost:5173`)
2. Click "Get Started" or "Start Your Journey"
3. Click "Create new account" on the login page
4. Fill out the signup form:
   - **Full Name**: `John Doe`
   - **Email**: `john@example.com`
   - **Password**: `password123`
   - **Confirm Password**: `password123`
5. Check "I agree to Terms..." checkbox
6. Click "Create account"
7. **Expected**: Redirected to Discovery page with user logged in

#### **Sign In Test**
1. If already signed up, visit `/login` directly
2. Enter credentials:
   - **Email**: `john@example.com`
   - **Password**: `password123`
3. Optionally check "Remember me"
4. Click "Sign in"
5. **Expected**: Redirected to Discovery page

#### **Protected Routes Test**
1. While logged out, try accessing:
   - `/discovery`
   - `/search-results`
   - `/song/1`
2. **Expected**: Redirected to login page for all protected routes

### 2. Music Discovery Flow

#### **Basic Search Test**
1. **Login** first (see authentication steps above)
2. Navigate to Discovery page (`/discovery`)
3. **Test Text Input**:
   - Type: `"I need chill beats for evening coding"`
   - Click the send button (arrow icon)
   - **Expected**: 2-second loading animation, then redirect to search results

#### **Quick Prompts Test**
1. On Discovery page, click any of the preset mood buttons:
   - "Upbeat workout music"
   - "Relaxing study playlist"
   - "Party vibes for dancing"
   - etc.
2. **Expected**: Query fills input field automatically
3. Submit the query using the send button

#### **Voice Input Simulation**
1. Click the microphone icon in the search bar
2. **Expected**: Button turns red with pulsing animation
3. After 2 seconds, mock voice input appears: `"I need chill beats for evening coding"`
4. **Expected**: Microphone button returns to normal state

### 3. Search Results Interaction

#### **Browse Results**
1. After submitting a search query, you'll see the search results page
2. **Expected Elements**:
   - Header showing "Found X tracks for [your query]"
   - Filter controls (Sort by, Genre filter)
   - Grid of 6 mock tracks with:
     - Album artwork
     - Track title, artist, album
     - Duration and genre
     - Popularity percentage
     - Interactive buttons (heart, plus, share)

#### **Test Filtering**
1. **Sort Test**:
   - Change "Sort by" dropdown to "Popularity"
   - **Expected**: Tracks reorder by popularity percentage
   - Try "Duration" sorting as well

2. **Genre Filter Test**:
   - Select a genre from "All Genres" dropdown (e.g., "Lo-Fi Hip Hop")
   - **Expected**: Only tracks matching that genre show
   - Select "All Genres" to reset

#### **Track Interaction**
1. **Like/Unlike**:
   - Click heart icon on any track
   - **Expected**: Heart turns red and stays filled
   - Click again to unlike

2. **Playlist/Share**:
   - Click plus icon (Add to Playlist)
   - Click share icon
   - **Expected**: Buttons respond with hover effects (no functional backend)

### 4. Song Detail Page

#### **Navigate to Song Details**
1. From search results, click anywhere on a track card
2. **Expected**: Navigate to song detail page (`/song/:id`)

#### **Test Music Player**
1. **Play/Pause**:
   - Click the large play button in the center or on the album art
   - **Expected**: Button changes to pause icon
   - **Expected**: Progress bar starts moving
   - **Expected**: Timer counts up from 0:00

2. **Player Controls**:
   - Test shuffle, skip back, skip forward, repeat buttons
   - Adjust volume slider
   - **Expected**: All controls respond with visual feedback

#### **Explore Song Information**
1. **Track Details**:
   - View comprehensive track information
   - Check audio features (Energy: 85, Danceability: 72, etc.)
   - Read artist information

2. **Similar Tracks**:
   - Scroll to sidebar "Similar Tracks" section
   - Click on any similar track
   - **Expected**: Hover effects and play icons appear

### 5. Navigation & User Experience

#### **Test Navigation**
1. **Navbar Transparency**:
   - On any page, scroll down
   - **Expected**: Navbar becomes glassmorphic with blur effect
   - **Expected**: No white border flash during transition

2. **Mobile Menu** (resize browser to mobile width):
   - Click hamburger menu button
   - **Expected**: Smooth dropdown menu appears
   - Click menu items to navigate

3. **User Menu** (when logged in):
   - Click on user avatar in navbar
   - **Expected**: Dropdown shows with "Sign Out" option
   - Click "Sign Out"
   - **Expected**: Redirected to home page, logged out state

#### **Test Responsive Design**
1. Resize browser window to different sizes:
   - **Desktop**: Full layout with sidebars
   - **Tablet**: Stacked layout, hamburger menu
   - **Mobile**: Single column, optimized touch targets

### 6. Visual Polish Testing

#### **Glassmorphic Effects**
1. Look for consistent glass effects on:
   - Navigation bar when scrolled
   - All card components
   - Form inputs and buttons
   - Modal overlays and dropdowns

#### **Animations**
1. **Hover Effects**: Hover over various elements
   - Cards should lift slightly (translate-y)
   - Buttons should scale and change colors
   - Icons should respond with micro-animations

2. **Loading States**:
   - Search processing animation (2 seconds)
   - Music player progress animation
   - Page transition smoothness

#### **Color Consistency**
1. Verify gradient theme throughout:
   - Purple to blue gradients on primary buttons
   - Consistent slate/purple color palette
   - Proper contrast for accessibility

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

## 🐛 Troubleshooting

### Common Issues

1. **Node Version Warning**
   ```
   npm WARN EBADENGINE Unsupported engine
   ```
   - **Solution**: This is a warning only. App works with Node 18+

2. **Build Fails**
   ```bash
   npm run build
   ```
   - **Solution**: Check TypeScript errors, run `npm run lint` first

3. **Styles Not Loading**
   - **Solution**: Ensure TailwindCSS is properly configured
   - Clear browser cache and restart dev server

4. **Navigation Issues**
   - **Solution**: Check if authentication state is properly set
   - Clear localStorage: `localStorage.clear()`

### Development Tips

1. **Hot Reload**: Changes auto-reload in development
2. **Console Logs**: Check browser console for any errors
3. **Network Tab**: Monitor for any failed requests
4. **Responsive Testing**: Use browser dev tools device simulation

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Navigation.tsx   # Main navigation bar
│   ├── MoodSlider.tsx   # Interactive mood controls
│   ├── ContextCard.tsx  # Cultural context information
│   └── ProtectedRoute.tsx # Route protection wrapper
├── context/             # React context providers
│   └── AuthContext.tsx  # Authentication state management
├── pages/               # Main page components
│   ├── auth/           # Authentication pages
│   │   ├── Login.tsx   # User login form
│   │   └── Signup.tsx  # User registration form
│   ├── Discovery.tsx   # Music discovery interface
│   ├── Landing.tsx     # Home/landing page
│   ├── Results.tsx     # Legacy results page
│   ├── SearchResults.tsx # Search results grid
│   └── SongDetail.tsx  # Individual song information
├── App.tsx             # Main app component with routing
├── main.tsx           # Application entry point
└── index.css          # Global styles and glassmorphic effects
```

## 🚀 Deployment

### Production Build
```bash
npm run build
```

### Preview Production
```bash
npm run preview
```

The build creates optimized files in the `dist/` directory ready for deployment to any static hosting service.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit changes: `git commit -m 'Add feature'`
4. Push to branch: `git push origin feature-name`
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

---

**Note**: This is a frontend-only implementation with mock data. In a production environment, you would connect to real music APIs (Spotify, Apple Music, etc.) and implement proper backend authentication.
