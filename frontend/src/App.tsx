import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import { DashboardLayout } from './layouts/DashboardLayout';
import { ProtectedLayout } from './layouts/ProtectedLayout';
import { LandingPage } from './pages/LandingPage';
import { DashboardPage } from './pages/DashboardPage';
import { ChatPage } from './pages/ChatPage';
import { LiveWeatherPage } from './pages/LiveWeatherPage';
import { StationExplorerPage } from './pages/StationExplorerPage';
import { MapPage } from './pages/MapPage';
import { AnalyticsPage } from './pages/AnalyticsPage';
import { SettingsPage } from './pages/SettingsPage';
import { NotFoundPage } from './pages/NotFoundPage';
import { StationDetailsPage } from './pages/StationDetailsPage';
import { AboutPage } from "./pages/AboutPage";
import { LoginPage } from "./pages/LoginPage";
import { SignupPage } from "./pages/SignupPage";
import { ProfilePage } from "./pages/ProfilePage";
import { ChangePasswordPage } from "./pages/ChangePasswordPage";

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
          <Route element={<ProtectedLayout />}>
            <Route element={<DashboardLayout />}>
              <Route path="/dashboard" element={<DashboardPage />} />
              <Route path="/chat" element={<ChatPage />} />
              <Route path="/weather" element={<LiveWeatherPage />} />
              <Route path="/stations" element={<StationExplorerPage />} />
              <Route path="/map" element={<MapPage />} />
              <Route path="/analytics" element={<AnalyticsPage />} />
              <Route path="/settings" element={<SettingsPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route
    path="/change-password"
    element={<ChangePasswordPage />}
/>
              <Route
                path="/station/:name"
                element={<StationDetailsPage />}
              />
            </Route>
          </Route>
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
