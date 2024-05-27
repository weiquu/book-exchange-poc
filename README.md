# Peer-to-Peer Book Exchange Platform

This project is a POC for a peer-to-peer book exchange platform. The solution is a web application, where users can post their book listings for other users to view. Exchange offers can then be made between users based on their book listings. Refer below for a more elaborated list of features and future extensions.

## Setup Instructions

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

### Database

First, create a PostgreSQL database. The one used during the development of this POC was created on Supabase. Then, get the connection string. For Supabase, this can be found by going to Project Settings and clicking on Database (under Configuration). The mode selected should be Session.

Next, create a `.env` file in the root directory, and assign the connection string to DATABASE_URL. For example, the `.env` file might look like this:

```
DATABASE_URL=postgres://postgres.iijwoifgoietrnfipo:ejnrgiofj1ojdsn@aws-0-ap-southeast-1.pooler.supabase.com:5432/postgres
```

Then, run `yarn prisma db push` to generate the tables in the database. `yarn prisma migrate dev` might also work, but in my experience there might be some errors.

### Development Server

First, run `yarn install` to install the dependencies. Then, run the development server with `yarn dev`. Next, open [http://localhost:3000](http://localhost:3000) with your browser to see the result and begin exploring the project.

### Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

### Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

## User Stories

1. **User Registration and Profile Management**

   - **As a user**, I want to create an account so that I can list and exchange books.
   - **As a user**, I want to manage my profile, including viewing and editing my account details.

2. **Book Listing and Management**

   - **As a user**, I want to list books I am willing to exchange so that others can see what I have available.
   - **As a user**, I want to update or delete my book listings so that my inventory is current and accurate.

3. **Book Searching and Browsing**

   - **As a user**, I want to browse book listings by others so that I can discover new books easily.
   - **As a user**, I want to search for books by title or author, or filter books by category so that I can find books I am interested in.

4. **Book Exchange Mechanism**

   - **As a user**, I want to request a book exchange with another user so that I can get the books I am interested in.
   - **As a user**, I want to manage incoming and outgoing exchange requests so that I can keep track of my transactions.

5. **Community Engagement**

   - **As a user**, I want to leave reviews and ratings for books and users so that I can help others make informed decisions.
   - **As a user**, I want to participate in forums or discussion groups so that I can connect with other book enthusiasts.

6. **AI-Enhanced Features**
   - **As a user**, I want personalised book recommendations based on my reading history and preferences so that I can discover new books that I might like.
   - **As a user**, I want to receive notifications for new listings of books that match my interests so that I don’t miss out on desired books.

## Main User Flows

1. **User Registration Flow**

   - User navigates to the sign up page.
   - User fills in required information (name, email, and password).
   - User submits the form and is logged in immediately.

2. **Book Listing Flow**

   - User logs into the platform and is brought directly to the Books page.
   - User clicks on the Add Book button.
   - User fills in book details (title, author, and summary).
   - User submits the listing, which is then visible to other users.

3. **Book Exchange Flow**

   - User logs into the platform and is brought directly to the Books page.
   - User browses through the listings to find a suitable book.
   - User clicks the “Offer Exchange” button.
   - User selects one of their listings to offer as an exchange.
   - User submits the offer exchange, which is then visible to the other user.

4. **Accepting Exchange Flow**

   - User logs into the platform and is brought directly to the Books page.
   - User clicks on the Exchanges button on the header navbar.
   - User clicks on the Exchange Requests tab.
   - User finds the appropriate exchange offer.
   - User clicks on the Accept button and confirms on the dialog that appears.

5. **Edit Profile Flow**
   - User logs into the platform and is brought directly to the Books page.
   - User clicks on the My Profile button on the header navbar.
   - User clicks on the Edit Profile button.
   - User edits their details and presses submit. The changes are then visible to all users.

## Key Features

1. **User Profiles**

   - Registration and login functionality.
   - Profile viewing and management with personal details and preferences.

2. **Book Listings**

   - Book listing creation and management (update, delete).
   - Book listing page with all relevant information.
   - View and Manage just personal listings.

3. **Exchange Mechanism**

   - Exchange request system (can offer and see offers).
   - Exchange history and status tracking.

## Good-to-Have Features

1. **User Profiles**

   - More profile features, for example user preferences.

2. **Book Listings**

   - Advanced search functionality with filters (title, author, genre, etc.).
   - More details on condition of the book, etc.

3. **Exchange Mechanism**

   - Messaging system for users to communicate and finalise exchanges.

4. **Community Engagement**

   - Reviews and ratings for books and users.
   - Forums or discussion groups for community interaction.

5. **AI-Enhanced Features**

   - Personalised book recommendations based on preferences.
   - Notifications for new book listings matching user preferences.

## Project Plan and Future Extensions

### Sprint 1: Proper Setup and Low-Hanging Feature Enhancements

- Base design system and components.
- Refactor out forms and create error popups.
- Expand on possible book details (e.g. book conditions, category), and add search and filter functionality.
- Improve on registration process, e.g. by using Supabase authentication (instead of the hacky local storage approach).
- Set up connection to AI provider.

### Sprint 2: Personalisation and AI Features

- Add in user preferences.
- Develop pipeline for personalised book recommendations.
- Send notifications for new listings that match preferences closely.

### Sprint 3: Community Engagement

- Reviews and ratings for books and users.
- Forums or discussion groups for community interaction.
- Messaging system for users to communicate and finalise exchanges.

### Sprint 4: Feature Freeze

- UI improvements.
- Testing and bug fixes.
