import axios from 'axios';

// Create an Axios instance with base URL and headers
const Api = axios.create({
    baseURL: 'http://localhost:8080', // URL of your Spring Boot API
    headers: {
        'Content-Type': 'application/json',  // Set content type to JSON for API requests
    },
});

export default Api;