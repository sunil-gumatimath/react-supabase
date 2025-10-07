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
bun install
```

2. Set up environment variables:
Create a `.env` file in the root directory with your Supabase credentials:
```
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

3. Create a `users` table in your Supabase database with appropriate columns (id, name, email, etc.)

4. Make sure your Supabase table has Row Level Security (RLS) properly configured if you want to read data

## Development

Start the development server:
```bash
bun run dev
```

## Build

Build for production:
```bash
bun run build
```

## Project Structure

- `src/App.jsx` - Main application component
- `src/components/UserComponent.jsx` - User management component
- `src/createClient.js` - Supabase client configuration

## Recent Fixes

- Fixed async/await issue in UserComponent where Supabase queries weren't properly awaited
- Added dependency array to useEffect to prevent infinite re-renders
- Ensure proper async handling when working with Supabase APIs

## Note

This project is currently in development. The UserComponent needs proper implementation of CRUD operations and UI components.
