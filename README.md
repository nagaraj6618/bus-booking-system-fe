# Bus Ticket Booking System

## Introduction

Welcome to the Bus Ticket Booking System, a full-stack application developed using the MERN stack (MongoDB, Express.js, React.js, and Node.js). This system allows users to book bus tickets online, ensuring a seamless and efficient ticket booking experience.

## Features

### User Authentication

- **Role-based Authentication**: Secure login for Admin and User roles.
- **Token Authentication**: Ensures secure and stateless communication between client and server.

### Booking Functionality

- **Search Suggestion**: Auto-suggest feature for selecting 'From' and 'To' locations.
- **Date Validation**: Past dates cannot be booked to ensure only future travel is possible.
- **Bus Registration Constraints**: A bus cannot be registered at the same time or if it overlaps with an existing schedule.
- **Dynamic Pricing**: Bus ticket prices are reduced based on the 'From' and 'To' locations with a decrease in fare cost per route.

### Roles and Capabilities

#### Admin

- **Login**: Secure access to the admin dashboard.
- **Register Bus**: Add new buses to the system.
- **Update Bus**: Modify existing bus details.
- **Delete Bus**: Remove buses from the system.
- **View Booked Details**: Access all booking and passenger information.

#### User

- **Signup**: Register to create a new user account.
- **Login**: Secure access to the user dashboard.
- **View Bus**: Browse available buses.
- **Book Ticket**: Select buses and book tickets.
- **Seat Blocking**: Selected seats are temporarily blocked to prevent double booking.
- **Booking History**: View past bookings and ticket details.

## Technology Stack

- **Frontend**: React.js
- **Backend**: Node.js with Express.js
- **Database**: MongoDB
- **Authentication**: JWT (JSON Web Tokens)

## Installation

### Prerequisites

- Node.js
- MongoDB

### Setup

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd bus-ticket-booking-system


### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

