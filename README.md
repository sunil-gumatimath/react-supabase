# React Supabase CRUD

A simple React application with Supabase integration for CRUD operations on users.

## Features

- React 19 with Vite
- Supabase database integration
- User management (Create, Read, Update, Delete operations)
- Modern React hooks (useState, useEffect)

## Setup

1. Install dependencies:
```bash
npm install
```

2. Set up environment variables:
Create a `.env` file in the `src` directory with your Supabase credentials:
```
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

3. Create a `users` table in your Supabase database with appropriate columns (id, name, email, etc.)

## Development

Start the development server:
```bash
npm run dev
```

## Build

Build for production:
```bash
npm run build
```

## Project Structure

- `src/App.jsx` - Main application component
- `src/components/UserComponent.jsx` - User management component
- `src/createClient.js` - Supabase client configuration

## Note

This project is currently in development. The UserComponent needs proper implementation of CRUD operations and UI components.
