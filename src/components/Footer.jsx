import React from 'react'
import { LogoDark } from './Logo'

function Footer() {
  return (
    <div>
      <footer className="footer flex justify-between md:px-24 bg-base-300 border-b-1 text-base-content p-10">
        <nav>
            <h6 className="footer-title">Services</h6>
            <a className="link link-hover">Branding</a>
            <a className="link link-hover">Design</a>
            <a className="link link-hover">Marketing</a>
            <a className="link link-hover">Advertisement</a>
        </nav>
        <nav>
            <h6 className="footer-title">Company</h6>
            <a className="link link-hover">About us</a>
            <a className="link link-hover">Contact</a>
            <a className="link link-hover">Jobs</a>
            <a className="link link-hover">Press kit</a>
        </nav>
        <nav>
            <h6 className="footer-title">Legal</h6>
            <a className="link link-hover">Terms of use</a>
            <a className="link link-hover">Privacy policy</a>
            <a className="link link-hover">Cookie policy</a>
        </nav>
      </footer>
      <div className='flex items-center justify-center p-5'>
      © Copyright @Cinetix 2024 - 2025 
      </div>
    </div>
  )
}

export default Footer
