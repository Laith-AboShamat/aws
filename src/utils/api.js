const API_URL = 'https://b6yxpbgn7k.execute-api.eu-north-1.amazonaws.com';

const fetchFromAPI = async (endpoint, method = 'GET', body = null) => {
    const options = {
        method,
        headers: {
            'Content-Type': 'application/json',
        },
    };

    if (body) {
        options.body = JSON.stringify(body);
    }

    const response = await fetch(`${API_URL}/${endpoint}`, options);

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response;
};

// Function to fetch all nurses
export const fetchNurses = async () => {
    const response = await fetchFromAPI('GetNurseData');
    return response.json();
};

// Function to create a new user
export const createUser = async (userData) => {
    const response = await fetchFromAPI('CreateNurse', 'POST', userData);
    return response.json();
};

// Function to update an existing user
export const updateUser = async (userData) => {
    const response = await fetchFromAPI('UpdateNurse', 'PUT', userData);
    return response.json();
};

// Function to delete a user
export const deleteNurse = async (userId) => {
    const response = await fetchFromAPI(`DeleteNurse/${userId}`, 'DELETE');
    return response;
};
