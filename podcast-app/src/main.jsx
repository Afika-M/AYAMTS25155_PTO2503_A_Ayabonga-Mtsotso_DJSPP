import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "./context/ThemeContext.jsx";
import { FavouritesProvider } from "./context/FavouritesContext.jsx";
import { AudioPlayerProvider } from "./context/AudioPlayerContext.jsx";

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
