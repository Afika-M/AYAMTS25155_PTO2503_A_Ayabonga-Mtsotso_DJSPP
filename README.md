# 🎙️ SpeakEasy

SpeakEasy is a polished, production-ready React podcast app built as the final phase of the DJS course.  

It allows users to browse podcast shows, search/filter/sort results, view show details by season, favourite episodes for later, and play episode audio with a **global audio player** that persists across page navigation.

Deployed on Vercel → _[Live Demo](https://speakeasyapp.vercel.app/)_

---

## 🚀 Live Demo

- **Live App (Vercel):** _[speakeasyapp](https://speakeasyapp.vercel.app/)_
- **GitHub Repo:** _[DJS Portfolio Piece](https://github.com/Afika-M/AYAMTS25155_PTO2503_A_Ayabonga-Mtsotso_DJSPP)_

---

## ✨ Features

### 🏠 Landing Page (Browse Shows)
- View podcast previews in a grid
- **Search** shows by title
- **Filter** shows by genre
- **Sort** shows (e.g. newest/oldest)
- Pagination support

### 🎧 Show Detail Page
- View a specific show with full details
- Toggle between seasons using a dropdown
- View episodes in the selected season

### 🔊 Global Audio Player
- Plays audio using the API’s placeholder audio URL
- Player remains fixed at the bottom across all pages after playing
- Audio continues playing when navigating between routes
- Playback controls:
  - Play / Pause
  - Seek using a progress slider
  - Current time / duration display
- Confirmation prompt when reloading/leaving during playback

### ❤️ Favourites
- Favourite / unfavourite episodes via a heart button
- Favourites persist using **localStorage**
- Favourites page displays:
  - Episodes grouped by **show title**
  - Season + episode number
  - Date/time added to favourites
  - Episode description + season image
- Sorting options:
  - **Title A–Z / Z–A**
  - **Newest / Oldest** by date added

### 🎠 Recommended Shows Carousel
- Horizontally scrollable carousel on the landing page
- Displays show image, title, and genre tags
- Navigation via arrows 
- Clicking a carousel show navigates to the show detail page

### 🌗 Theme Toggle
- Light / Dark mode toggle
- Theme preference persists with **localStorage**
- Uses CSS variables for consistent theming across the app

### ✅ Deployment & Routing Polish
- Deployed to Vercel
- Favicon + metadata 

---

## 🧠 Tech Stack
- **React** (Vite)
- **React Router**
- **Context API** (global state: podcasts, favourites, audio player, theme)
- **CSS Modules** (component-scoped styling)
- **localStorage** (persist favourites + theme)
- **Vercel(Hosting)**

---

## 📡 API Used
This project consumes data from:

- **All podcasts:** `https://podcast-api.netlify.app`
- **Single show:** `https://podcast-api.netlify.app/id/:id`
- **Placeholder audio:** `https://podcast-api.netlify.app/placeholder-audio.mp3`

> Note: Episodes use the API’s placeholder audio file. Episode uniqueness is handled in-app using a generated key (e.g. show + season + episode number) when needed.

---

## 🗂️ Project Structure (High Level)

```txt
src/
│── api/
│   └── fetchPata.js
│── components/
|   ├── index.js
│   ├── Carousel/
|   |   ├── index.js
│   │   ├── RecommendedCarousel.jsx
│   │   └── RecommendedCarousel.module.css
│   ├── Podcasts/
|   |   ├── index.js
│   │   ├── PodcastCard.jsx
|   |   ├── PodcastCard.module.css
│   │   ├── PodcastGrid.jsx
|   |   ├── PodcastGrid.module.css
|   |   ├── PodcastDetail.jsx
│   │   └── PodcastDetail.module.css
│   └── UI/
|       ├── index.js
│       ├── Header.jsx
|       ├── Header.module.css
|       ├── FavouritesButton.jsx
│       ├── FavouritesButton.module.css
│       ├── Error.jsx
│       ├── Error.module.css
│       ├── GlobalAudioPlayer.jsx
│       ├── GlobalAudioPlayer.nodule.css
│       ├── Loading.jsx
│       ├── Loading.module.css
│       ├── Pagination.jsx
│       ├── Pagination.module.css
│       ├── GenreTags.jsx
│       └── GenreTags.module.css
│── context/
│   ├── PodcastContext.jsx
│   ├── ThemeContext.jsx
│   ├── FavouritesContext.jsx
│   └── AudioPlayerContext.jsx
│── pages/
│   ├── Home.jsx
|   ├── Home.module.css
│   ├── ShowDetail.jsx
|   ├── Favourites.jsx
│   └── Favourites.module.css
│── utils/
│   └── formatDate.js
│── index.css
│── main.jsx
|── data.js
└── App.jsx
```
---

## ⚙️ Getting Started (Local Setup)

First clone the repo then follow the following steps:
```
git clone https://github.com/Afika-M/AYAMTS25155_PTO2503_A_Ayabonga-Mtsotso_DJSPP.git
cd AYAMTS25155_PTO2503_A_Ayabonga-Mtsotso_DJSPP
```

Open index.html in your browser.

##### 1) Install dependencies
```bash
npm install
```

##### 2) Run the dev server
```bash
npm run dev
```
##### 3) Build for production
```bash
npm run build
```
##### 4) Preview the production build
```bash 
npm run preview
```
---

## 🌍 Deployment (Vercel)

1. Push code to GitHub

2. Go to Vercel → New Project

3. Import your GitHub repo

4. Deploy

5. Configure custom domain / URL

## 🧪 Key Implementation Notes
**Global Audio Player (Persistence Across Pages)**

The audio player state lives in a Context provider at a high level in the app tree.
This allows:
- playback to keep running even when switching routes
- a single “source of truth” for current episode + playback progress

**Favourites Persistence**

Favourites are stored in Context and synced to localStorage.

Each favourite includes metadata like:
- show title, season title, episode number

- timestamp (addedAt) to support sorting

**Theme System**
The theme is stored in state + persisted in localStorage.
The UI updates via CSS variables applied using data-theme on the body.

---

### 👤 Author
Built by Ayabonga Mtsotso as part of the DJS course final phase.

---