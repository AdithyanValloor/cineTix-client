import React from 'react';
import { Link } from 'react-router-dom';

function AboutUs() {
  return (
    <div className="min-h-screen pt-36 md:pt-24 bg-base-100 text-base-content px-6 md:px-20 py-12">
      {/* Heading Section */}
      <div className="text-center max-w-4xl mx-auto mb-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">About CineTix</h1>
        <p className="text-gray-500 text-lg">
          Revolutionizing the way you book and enjoy movies — CineTix brings convenience, clarity, and a touch of magic to your cinema experience.
        </p>
      </div>

      {/* Who We Are Section */}
      <div className="grid md:grid-cols-2 gap-10 mb-16 items-center">
        <img
          src="https://media.istockphoto.com/id/1478374885/photo/joyful-family-watching-movie-in-cinema.jpg?s=612x612&w=0&k=20&c=U0Qp-c2vCTUPG51ZOD2H7KcrByyBKow3r9wSR2QMFZU="
          alt="Cinema"
          className="w-full h-72 object-cover rounded-2xl shadow-lg"
        />
        <div>
          <h2 className="text-2xl font-semibold mb-3">Who We Are</h2>
          <p className="text-gray-500">
            CineTix is a modern movie booking platform designed to bridge the gap between audiences and theaters. We aim to make ticket booking effortless, whether you're planning a solo outing or a group event.
          </p>
        </div>
      </div>

      {/* Our Vision Section */}
      <div className="grid md:grid-cols-2 gap-10 mb-16 items-center">
        <div>
          <h2 className="text-2xl font-semibold mb-3">Our Vision</h2>
          <p className="text-gray-500">
            We envision a world where accessing entertainment is seamless. By empowering both users and exhibitors, we strive to create a transparent, reliable, and joyful movie-going experience.
          </p>
        </div>
        <img
          src="https://media.istockphoto.com/id/508300585/photo/the-perfect-entertainment-snack.jpg?s=612x612&w=0&k=20&c=5PoT8bxUW-I-pipZEjTc0tjMTLS-Q9CmZsro7Qeoo1c="
          alt="Vision"
          className="w-full h-72 object-cover rounded-2xl shadow-lg"
        />
      </div>

      {/* Call to Action */}
      <div className="text-center">
        <h3 className="text-xl md:text-2xl font-semibold mb-4">Want to partner with CineTix?</h3>
        <p className="text-gray-500 mb-6">
          Whether you're a theater owner or a distributor, we'd love to work with you.
        </p>
        <Link
          to="/user/join-cinetix"
          className="btn btn-primary px-8 py-2 text-white rounded-xl shadow-lg"
        >
          Join Us
        </Link>
      </div>
    </div>
  );
}

export default AboutUs;
