import { Film, Home, Theater } from 'lucide-react'
import React from 'react'
import { NavLink } from 'react-router-dom'


function Nav() {
  return (
    <div>
      <ul className='flex gap-9 items-center'>
            {["Home", "Movies", "Theaters"].map((item, index) => 
                <li key={index} className='h-10 lg:h-14 p-1 text-lg flex items-center cursor-pointer hover:text-[#e30613] transition-all duration-300 hover:scale-105'>       
                    <NavLink
                        to={ item === "Home"
                            ? "/"
                            : `/${item.toLowerCase().replace(" ", "-")}`
                        } 
                        
                        onClick={() => window.scrollTo({ top: 0, behavior: "instant" })}

                        className={'flex items-center gap-1'}
                        >
                          <span className='text-[#e30613]'>
                            {item === "Home" && <Home/> || item === "Movies" && <Film/> || item === "Theaters" && <Theater/>}
                          </span>
                          {item}
                    </NavLink>
                </li>
            )}
        </ul>
    </div>
  )
}

export default Nav
