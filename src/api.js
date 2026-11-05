// Base URL for data requests. On Netlify this is the /api function.
// To use a local json-server instead, set VITE_API_URL=http://localhost:3000 in .env.local
export const API_URL = import.meta.env.VITE_API_URL || "/api";
