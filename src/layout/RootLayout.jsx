import React from 'react'
import { Outlet, useLocation, matchPath } from 'react-router-dom'
import Header from '../components/Header'
import Footer from '../components/Footer'

function RootLayout() {
  
  const location = useLocation();
    
  // List of routes where Header and Footer should be hidden
  const hideHeaderFooterRoutes = ["/seat-selection/:showId", "payment-success", "exhibitor/login"];

  // Check if the current path matches any of the hideHeaderFooterRoutes patterns
  const isHeaderFooterHidden = hideHeaderFooterRoutes.some(route =>
    matchPath(route, location.pathname)
  );

  return (
    <div>
        {!isHeaderFooterHidden && <Header />}
        
        <main>
            <Outlet />
        </main>
        
        {!isHeaderFooterHidden && <Footer />}
    </div>
  )
}

export default RootLayout;
