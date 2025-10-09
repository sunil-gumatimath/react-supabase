# React + Supabase CRUD Application

A modern and stylish React application that demonstrates Create, Read, Update, and Delete (CRUD) operations using Supabase as the backend.

## Features

- **React 18 & Vite:** Fast development and bundling.
- **Supabase Integration:** Seamlessly connects to a Supabase backend for database operations.
- **Complete CRUD Functionality:** Full user management capabilities.
- **Modern UI/UX:** A sleek dark theme with responsive design, enhanced with icons from `react-icons`.
- **State Management:** Utilizes React hooks (`useState`, `useEffect`) for efficient state management.
- **Error Handling:** Displays user-friendly error messages.
- **Animations:** Subtle animations for a better user experience.

## Tech Stack

- **Frontend:** React, Vite
- **Backend:** Supabase
- **Styling:** CSS with a custom dark theme
- **Icons:** `react-icons`

## Getting Started

### Prerequisites

- Node.js and bun installed.
- A Supabase account and project.

### Setup

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/sunil-gumatimath/react-supabase.git
    cd react-supabase-curd
    ```

2.  **Install dependencies:**
    ```bash
    bun install
    ```

3.  **Set up environment variables:**
    Create a `.env` file in the root of your project and add your Supabase URL and Anon Key.

    ```
    VITE_SUPABASE_URL=your_supabase_url
    VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
    ```

4.  **Set up your Supabase table:**
    Create a `users` table in your Supabase project with the following columns:
    - `id` (int8, primary key)
    - `name` (text)
    - `age` (int8)

    Ensure that Row Level Security (RLS) is configured correctly for your table to allow data access.

### Running the Application

Start the development server:

```bash
bun run dev
```

The application will be available at `http://localhost:5173`.

## Project Structure

```
/
├── public/
│   └── ...
├── src/
│   ├── assets/
│   ├── components/
│   │   └── UserComponent.jsx  # Main component for CRUD operations
│   ├── App.css                # Global styles
│   ├── App.jsx                # Main App component
│   ├── createClient.js        # Supabase client initialization
│   └── main.jsx               # Entry point
├── .env.example               # Environment variable example
├── index.html
├── package.json
└── README.md
