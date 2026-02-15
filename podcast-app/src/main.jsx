import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "./context/ThemeContext.jsx";
import { FavouritesProvider } from "./context/FavouritesContext.jsx";
import { AudioPlayerProvider } from "./context/AudioPlayerContext.jsx";
/**
 * Entry point of the Podcast Explorer application.
 *
 * - Wraps the entire app in multiple context providers for theme, favourites, and audio player state management.
 * - Uses React Router's BrowserRouter for client-side routing.
 * - Renders the root App component, which contains the main application structure and routes.
 *
 * @returns {void}
 */

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <ThemeProvider>
        <FavouritesProvider>
          <AudioPlayerProvider>
            <App />
          </AudioPlayerProvider>
        </FavouritesProvider>
      </ThemeProvider>
    </BrowserRouter>
  </StrictMode>,
);
