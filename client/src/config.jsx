const BASE_URL =
  import.meta.env.MODE === 'development'
    ? 'http://localhost:5001/api'
    : `${import.meta.env.VITE_BACKEND_URL}/api`;

export default BASE_URL;
