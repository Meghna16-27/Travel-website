Tour & Travel Website — Globetrotter (MERN Stack)
A full-featured Tour & Travel web application built with the MERN stack. Users can browse destinations, make bookings, contact the agency, and authenticate. Admins can manage users, destinations, bookings and messages. Payments are simulated using OTP generation.

Table of Contents
Project Overview

Features

Tech Stack

Getting Started / Installation

Environment Variables

Run Locally

API Endpoints (high level)

Admin Panel

OTP Payment (note)

Future Scope

Contributing

License

Project Overview
Globetrotter is a MERN (MongoDB, Express, React, Node) application for a travel agency. It provides a user-facing site to explore destinations and book tours, and an admin dashboard for managing data. Authentication is handled via JWT and tokens are stored in localStorage.

Features
Browse beautiful travel destinations with images & descriptions

Book tours (duration, price, date selection)

Contact form with backend storage for inquiries

User registration, login and authentication (JWT)

Admin dashboard to manage:

Users

Destinations

Bookings

Contact messages

Payment simulated by OTP generation (server-side OTP flow)

Tech Stack
Frontend: React, React Router, Axios, Bootstrap, custom CSS

Backend: Node.js, Express

Database: MongoDB (Atlas or local)

