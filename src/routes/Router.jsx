import { createBrowserRouter } from "react-router-dom";
import HomePage from "../pages/user/HomePage";
import RootLayout from "../layout/RootLayout";
import MovieDetailsPage from "../pages/user/MovieDetailsPage";
import SeatSelectionPage from "../pages/user/SeatSelectionPage";
import ShowsAndTheaterPage from "../pages/user/ShowsAndTheaterPage";
import { ProtectRoutes } from "./protectedRoutes";
import ProfilePage from "../pages/user/ProfilePage";
import WatchListPage from "../pages/user/WatchListPage";
import NotificationPage from "../pages/user/NotificationPage";
import BookingHistoryPage from "../pages/user/BookingHistoryPage";
import FavouritesPage from "../pages/user/FavouritesPage";
import WalletPage from "../pages/user/WalletPage";
import PromotionsPage from "../pages/user/PromotionsPage";
import SettingsPage from "../pages/user/SettingsPage";
import SupportPage from "../pages/user/SupportPage";
import JoinCinetixPage from "../pages/user/JoinCinetixPage";
import AllMoviesPage from "../pages/user/AllMoviesPage";
import TheatersPage from "../pages/user/TheatersPage";
import PaymentSuccess from "../pages/user/PaymentSuccessPage";
import ReviewsPage from "../pages/user/ReviewsPage";
import UserReviewsPage from "../pages/user/UserReviewsPage";
import ExhibitorLayout from "../layout/ExhibitorLayout";
import { ExhibitorProtectedRoutes } from "./ExhibitorProtectedRoutes";

import ExhibitorDashboard from "../pages/exhibitor/DashboardPage";
import TheaterManagement from "../pages/exhibitor/TheaterManagementPage";
import MovieSchedule from "../pages/exhibitor/MovieSchedulePage";
import BookingManagement from "../pages/exhibitor/BookingManagementPage";
import RevenueReports from "../pages/exhibitor/RevenueReportsPage";
import TheaterAnalytics from "../pages/exhibitor/TheaterAnalyticsPage";
import ExhibitorSettings from "../pages/exhibitor/SettingsPage";
import CustomerFeedback from "../pages/exhibitor/CustomerFeedbackPage";
import ExhibitorLoginPage from "../pages/exhibitor/ExhibitorLoginPage";
import ManageMoviesInDB from "../pages/exhibitor/ManageMoviesInDB";
import PaymentCanceled from "../pages/user/PaymentCancel";


export const router = createBrowserRouter([
    {
      path: "/",
      element: <RootLayout />,
      children: [
        { path: "", element: <HomePage /> },
        { path: "movie-details/:id", element: <MovieDetailsPage /> },
        { path: "shows/:movieId", element: <ShowsAndTheaterPage /> },
        { path: "seat-selection/:showId", element: <SeatSelectionPage /> },
        { path: "movies", element: <AllMoviesPage /> },
        { path: "theaters", element: <TheatersPage /> },
        { path: "payment-success", element: <PaymentSuccess /> },
        { path: "payment-canceled", element: <PaymentCanceled /> },
  
        {
          path: "user",
          element: <ProtectRoutes />,
          children: [
            { path: "profile", element: <ProfilePage /> },
            { path: "watch-list", element: <WatchListPage /> },
            { path: "notifications", element: <NotificationPage /> },
            { path: "booking-history", element: <BookingHistoryPage /> },
            { path: "favourite", element: <FavouritesPage /> },
            { path: "wallet", element: <WalletPage /> },
            { path: "rewards", element: <PromotionsPage /> },
            { path: "account-settings", element: <SettingsPage /> },
            { path: "help", element: <SupportPage /> },
            { path: "join-cinetix", element: <JoinCinetixPage /> },
            { path: "reviews", element: <ReviewsPage /> },
            { path: "user-reviews", element: <UserReviewsPage /> }
          ]
        }
      ]
    },
  
    // EXHIBITOR LOGIN PAGE (public)
    {
      path: "/exhibitor/login",
      element: <ExhibitorLoginPage />
    },
  
    // EXHIBITOR PROTECTED AREA
    {
      path: "/exhibitor",
      element: <ExhibitorProtectedRoutes />,
      children: [
        {
          path: "",
          element: <ExhibitorLayout />,
          children: [
            { path: "dashboard", element: <ExhibitorDashboard /> },
            { path: "theaters", element: <TheaterManagement /> },
            { path: "schedule", element: <MovieSchedule /> },
            { path: "bookings", element: <BookingManagement /> },
            { path: "reports", element: <RevenueReports /> },
            { path: "analytics", element: <TheaterAnalytics /> },
            { path: "settings", element: <ExhibitorSettings /> },
            { path: "feedback", element: <CustomerFeedback /> },
            { path: "manage-movies", element: <ManageMoviesInDB /> }
          ]
        }
      ]
    }
  ]);
  
