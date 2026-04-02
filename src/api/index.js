const API_URL = 'https://jsonplaceholder.typicode.com';

/**
 * Creates a new post on JSONPlaceholder.
 * @param {object} postData - The post payload, for example:
 *   { userId: 1, title: '...', body: '...' }
 * @returns {Promise<object>} The created post returned by the API.
 */
export const createPost = async (postData) => {
  try {
    const response = await fetch(`${API_URL}/posts`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(postData),
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    return await response.json();
  } catch (error) {
    console.error('Error creating post:', error);
    throw error;
  }
};

/**
 * Fetches all posts from JSONPlaceholder.
 * @returns {Promise<Array>} A promise that resolves to an array of posts.
 */
export const getPosts = async () => {
  try {
    const response = await fetch(`${API_URL}/posts`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching posts:', error);
    throw error;
  }
};

/**
 * Fetches a single post by its ID from JSONPlaceholder.
 * @param {number} postId - The ID of the post to fetch.
 * @returns {Promise<object>} A promise that resolves to the post object.
 */
export const getPostById = async (postId) => {
  try {
    const response = await fetch(`${API_URL}/posts/${postId}`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return await response.json();
  } catch (error) {
    console.error(`Error fetching post with id ${postId}:`, error);
    throw error;
  }
};
