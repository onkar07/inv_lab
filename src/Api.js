    import axios from 'axios';

const apiUrl = 'http://localhost:8080';

// Login User API call
const loginUser = async (loginData) => {
    try {
        const response = await axios.post(`${apiUrl}/login`, loginData); // Use backticks here
        alert('Login successful:', response.data);
        return response.data;
    } catch (error) {
        console.error('There was an error logging in:', error.response?.data || error.message);
        throw error;
    }

    
};

// Helper to get Authorization headers
const getAuthHeaders = () => {
    const token = localStorage.getItem('token');
 
    if (!token) {
        console.log('No token found in localStorage!')
        throw new Error('No token found in localStorage!');
        
    }
    return {
        headers: {
            Authorization: `Bearer ${token}`, // Add Bearer token to the Authorization header
        },
    };
};

// Fetch Secured Categories Example
const fetchCategories = async () => {
    // try {
    //     const response = await axios.get(`${apiUrl}/api/categories`, getAuthHeaders()); // Use backticks here
    //     return response.data;
    // } catch (error) {
    //     console.error('Error fetching categories:', error);
    //     throw error;
    // }

    try {
        const token = localStorage.getItem('token'); // Get the token from localStorage

        if (!token) {
            throw new Error("No token found in localStorage!");
        }

        const response = await axios.get('http://localhost:8080/api/categories', {
            headers: {
                Authorization: `Bearer ${token}`, // Include token in Authorization header
            },
        });

        return response.data; // Return categories
    } catch (error) {
        console.error('Error fetching categories:', error);
        throw error; // Rethrow error for component to handle
    }
};

export { loginUser, fetchCategories }; // Export functions
