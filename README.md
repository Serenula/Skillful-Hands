# Skillful Hands

![Logo](</Frontend/Skilfull%20Hands%20(1).png>)

## Concept

When thinking about what to build, Xiu Min said she hopes for a service to help her clean her room, thus Skillful Hands was created!

## What is Skillful Hands?

Skillful Hands is a personal service platform aimed to pair freelancers with people like Xiu Min, who desire a simple and affordable service.

## How it Works

1. **Registration**

   - You can choose between Vendor or User, and the registration process will adjust accordingly:
     - If Vendor is chosen, information such as "About Us" and Category will be required.
     - If User is chosen, an address will be required.

2. **Log in**

   - When a registered person logs in, our app will route them to a specific page:
     - Vendor = Vendor Profile Page
       - Here, vendors can create their services.
     - User = Service Page
       - Users can see and search for all services.
       - Clicking on "View Details" will bring users to the Detail Page where they can see the service in all its glory and also book it.

3. **Profile**
   - The User Profile will show all bookings made and allows users to delete them.

## MVP

1. Allow registration for Users.
2. Allow log in and routing based on role.
3. Connect seeded services and seeded vendors.
4. Allow users to search for services.
5. Allow users to book a service.
6. Implement log out (sends back to the homepage).

## Stretch Goals

1. Allow vendors to create accounts and log in.
2. Allow vendors to create services.
3. Create a Detailed Service page where all details regarding the service are present.
4. Allow users to search for a service with a generic filter.
5. Allow users to delete services.
6. Show all created services on the Vendor Profile page.
7. Allow vendors to delete services.

## Stretchier Goals

1. Allow users to write reviews.
2. Allow users and vendors to upload pictures for profiles/services.

## Technologies Used

1. Mongoose
2. Express
3. React
4. CSS
5. Tanstack

## Creation Process

### Planning

<p align="center">
  <img src="/Frontend/Service%20Page.png" alt="Service Page" width="45%" />
  <img src="/Frontend/Profile%20Page.png" alt="Vendor Profile" width="45%" />
</p>

1. What we wanted to do as a group was to generally plan out the API endpoints and then split the work. Here are the original API endpoints:
   - User
   - Services
   - Booking
2. Nothing ever goes according to plan as later, we created Vendor and that caused our schema for Auth to clash...among other challenges.

### Technical Requirements

1. Be a MERN stack application:
   - Yes, we are MERN, not MEN stack. We definitely have Mongoose, Express, React, and Node (duh).
2. Mongoose:
   - We have not one, not two, but FOUR models:
     1. Auth: Houses both our User and Vendor and also the generic authentication schemas.
     2. Bookings
     3. Services
     4. Reviews
3. CRUD via Fetch and Tanstack:
   - We have many CRUD operations; here are all of them:
     1. Create:
        - User, Vendor, Services, Booking
     2. Read:
        - Services, Bookings
     3. Update:
        - User and Vendor info
     4. Delete:
        - Bookings and Services
4. JWT:
   - Authentication and decoding via JWT is used when users/vendors log in and go about doing their business such as creating, updating, and deleting bookings/services.
5. React:
   - Frontend development was challenging, always needing to figure out why Postman works but the frontend does not.
   - Some effort went into the CSS until Vernon got really tired of random bugs that perplexed him to no end.

### Roles

1. GitHub Manager: Vernon
2. Scrum Master: Vernon
3. Documenter: Vernon
4. Designer: Vernon
5. Database Manager: Xiu Min
6. Validation Master: Xiu Min
7. Goal Stretch Advocate: Xiu Min

## Sharings

### Love/Hate Moments

- **Vernon**:
  - I hate frontend now.
- **Xiu Min**:
  - I love frontend now.

### Biggest Challenge

- **Vernon**:
  - Merging things made me realize that my planning and distribution of work were bad.
- **Xiu Min**:
  - The issue was the lack of deep thinking during the planning phase. We should have drawn out the entire schema first together to ensure that our parts don't overlap.

### Key Learnings

- **Vernon**:
  - How to better plan delegation.
- **Xiu Min**:
  - Database design and schemas are central.
