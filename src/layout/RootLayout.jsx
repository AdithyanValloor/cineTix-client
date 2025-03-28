import React from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Header from '../components/Header'
import Footer from '../components/Footer'

function RootLayout() {
  
  const location = useLocation();
    
  // List of routes where Header and Footer should be hidden
  const hideHeaderFooterRoutes = ["/seat-selection"];

  return (
    <div>
        {!hideHeaderFooterRoutes.includes(location.pathname) && <Header />}
        
        <main>
            <Outlet />
        </main>
        
        {!hideHeaderFooterRoutes.includes(location.pathname) && <Footer />}
    </div>
  )
}

export default RootLayout
