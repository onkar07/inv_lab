    import axios from 'axios';

const apiUrl = 'http://localhost:8080';

// Login User API call
const loginUser = async (loginData) => {
    try {
        const response = await axios.post(`${apiUrl}/api/auth/login`, loginData); // Use backticks here
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
    return {
        headers: {
            Authorization: `Bearer ${token}` // Use backticks here
        }
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
        const token = localStorage.getItem('token');  // Get the token from localStorage

        if (!token) {
            throw new Error("No token found in localStorage!");
        }

        const response = await axios.get('http://localhost:8080/categories', {
            headers: {
                Authorization: `Bearer ${token}`  // Include the token as Bearer in the Authorization header
            }
        });

        return response.data;  // Return the categories data from the response
    } catch (error) {
        console.error('Error fetching categories:', error);
        throw error;  // Rethrow error so it can be handled in the component
    }
};

export { loginUser, fetchCategories }; // Export functions
