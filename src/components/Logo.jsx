import React from 'react'
import logoDark from '../assets/cineTix logo.png'
import logoWhite from '../assets/cineTix logo white.png'

export const LogoWhite = ({size = 100, className }) => {
  return (
    <div>
      <img src={logoWhite} width={size} height={size} className={`${className } lg:mx-10`} alt="logo"/>
    </div>
  )
}

export const LogoDark = ({size = 100, className}) => {
  return (
    <div>
      <img src={logoDark} width={size} height={size} className={`${className } lg:mx-10`} alt="logo"/>
    </div>
  )
}
