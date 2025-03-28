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

export const router = createBrowserRouter([
    {
        path:"/",
        element: <RootLayout/>,
        children: [
            {
                path:"/",
                element: <HomePage/>
            },
            {
                path:"/movie-details/:id",
                element: <MovieDetailsPage/>
            },
            {
                path: "/shows",
                element: <ShowsAndTheaterPage/>
            },
            {
                path:"/seat-selection",
                element: <SeatSelectionPage/>
            },
            {
                path: "/movies",
                element: <AllMoviesPage/>
            },
            {
                path: "/theaters",
                element: <TheatersPage/>
            },
            {
                path: "/user",
                element: <ProtectRoutes/>,
                children:[
                    {
                        path: "profile",
                        element: <ProfilePage/>
                    },
                    {
                        path: "watch-list",
                        element: <WatchListPage/>
                    },
                    {
                        path: "notifications",
                        element: <NotificationPage/>
                    },
                    {
                        path: "booking-history",
                        element: <BookingHistoryPage/>
                    },
                    {
                        path: "favourite",
                        element: <FavouritesPage/>
                    },
                    {
                        path: "wallet",
                        element: <WalletPage/>
                    },
                    {
                        path: "rewards",
                        element: <PromotionsPage/>
                    },
                    {
                        path: "account-settings",
                        element: <SettingsPage/>
                    },
                    {
                        path: "help",
                        element: <SupportPage/>
                    },
                    {
                        path: "join-cinetix",
                        element: <JoinCinetixPage/>
                    }
                ]
            }
           
        ]
    }
    
])
