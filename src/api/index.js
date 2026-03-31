const API_URL = 'https://jsonplaceholder.typicode.com';

let users = [];
let nextId = 11; // Assuming the dummy API has users up to id 10

/**
 * Fetches all users from the dummy API.
 * @returns {Promise<Array>} A promise that resolves to an array of users.
 */
export const getUsers = async () => {
  try {
    const response = await fetch(`${API_URL}/users`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    users = await response.json();
    return users;
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
};

/**
 * Fetches a single user by their ID from the dummy API.
 * @param {number} userId - The ID of the user to fetch.
 * @returns {Promise<object>} A promise that resolves to the user object.
 */
export const getUserById = async (userId) => {
  try {
    const response = await fetch(`${API_URL}/users/${userId}`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return await response.json();
  } catch (error) {
    console.error(`Error fetching user with id ${userId}:`, error);
    throw error;
  }
};

/**
 * Creates a new user.
 * This is a simulated POST request.
 * @param {object} userData - The data for the new user (e.g., { name: 'John Doe', email: 'john@example.com' }).
 * @returns {Promise<object>} A promise that resolves to the newly created user.
 */
export const createUser = (userData) => {
  return new Promise((resolve, reject) => {
    if (!userData || !userData.name || !userData.email) {
      return reject(new Error('Invalid user data: name and email are required.'));
    }
    if (!/^\S+@\S+\.\S+$/.test(userData.email)) {
      return reject(new Error('Invalid email format.'));
    }

    setTimeout(() => {
      const newUser = {
        ...userData,
        id: nextId++,
      };
      users = [newUser, ...users];
      resolve(newUser);
    }, 500);
  });
};

/**
 * Updates an existing user.
 * This is a simulated PUT request.
 * @param {number} userId - The ID of the user to update.
 * @param {object} updatedData - The updated data for the user.
 * @returns {Promise<object>} A promise that resolves to the updated user.
 */
export const updateUser = (userId, updatedData) => {
  return new Promise((resolve, reject) => {
    if (!updatedData || Object.keys(updatedData).length === 0) {
      return reject(new Error('No update data provided.'));
    }
    if (updatedData.email && !/^\S+@\S+\.\S+$/.test(updatedData.email)) {
      return reject(new Error('Invalid email format.'));
    }
    if (Object.prototype.hasOwnProperty.call(updatedData, 'id')) {
      return reject(new Error('Updating the user ID is not allowed.'));
    }

    setTimeout(() => {
      const userIndex = users.findIndex((u) => u.id === userId);
      if (userIndex > -1) {
        users[userIndex] = { ...users[userIndex], ...updatedData };
        resolve(users[userIndex]);
      } else {
        reject(new Error('User not found'));
      }
    }, 500);
  });
};

/**
 * Deletes a user.
 * This is a simulated DELETE request.
 * @param {number} userId - The ID of the user to delete.
 * @returns {Promise<void>} A promise that resolves when the user is deleted.
 */
export const deleteUser = (userId) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const userIndex = users.findIndex((u) => u.id === userId);
      if (userIndex > -1) {
        users = users.filter((u) => u.id !== userId);
        resolve();
      } else {
        reject(new Error('User not found'));
      }
    }, 500);
  });
};
