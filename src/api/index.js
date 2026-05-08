const API_URL = 'https://jsonplaceholder.typicode.com';

/**
 * Mock API delay for realistic network simulation
 */
const mockDelay = () => new Promise(resolve => setTimeout(resolve, 300));
const STORE_KEY = 'postsStore';

// Local store to manage posts (persisted in sessionStorage)
let postsStore = [];
let isInitialized = false;

/**
 * Load store from sessionStorage
 */
const loadFromSessionStorage = () => {
  try {
    const stored = sessionStorage.getItem(STORE_KEY);
    if (stored) {
      postsStore = JSON.parse(stored);
      isInitialized = true;
      return postsStore;
    }
  } catch (error) {
    console.error('Error loading from sessionStorage:', error);
  }
  return null;
};

/**
 * Save store to sessionStorage
 */
const saveToSessionStorage = () => {
  try {
    sessionStorage.setItem(STORE_KEY, JSON.stringify(postsStore));
  } catch (error) {
    console.error('Error saving to sessionStorage:', error);
  }
};

/**
 * Initialize the local store by fetching from JSONPlaceholder
 * @returns {Promise<Array>} A promise that resolves to an array of posts.
 */
const initializeStore = async () => {
  if (isInitialized) return postsStore;

  // Try to load from sessionStorage first
  const stored = loadFromSessionStorage();
  if (stored && stored.length > 0) {
    return stored;
  }

  // If not in sessionStorage, fetch from API
  try {
    const response = await fetch(`${API_URL}/posts`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    postsStore = data.slice(0, 5); // Limit to 5 posts for demo
    isInitialized = true;
    saveToSessionStorage();
    return postsStore;
  } catch (error) {
    console.error('Error initializing store:', error);
    throw error;
  }
};

/**
 * Fetches all posts from local store (initialized from JSONPlaceholder).
 * @returns {Promise<Array>} A promise that resolves to an array of posts.
 */
export const getPosts = async () => {
  try {
    if (!isInitialized) {
      await initializeStore();
    }
    return Promise.resolve([...postsStore]);
  } catch (error) {
    console.error('Error fetching posts:', error);
    throw error;
  }
};

/**
 * Fetches a single post by its ID from local store.
 * @param {number} postId - The ID of the post to fetch.
 * @returns {Promise<object>} A promise that resolves to the post object.
 */
export const getPostById = async (postId) => {
  try {
    if (!isInitialized) {
      await initializeStore();
    }
    const post = postsStore.find(p => p.id === postId);
    if (!post) {
      throw new Error(`Post with id ${postId} not found`);
    }
    return Promise.resolve({ ...post });
  } catch (error) {
    console.error(`Error fetching post with id ${postId}:`, error);
    throw error;
  }
};

/**
 * Creates a new post in local store and calls API.
 * @param {object} postData - The post payload, for example:
 *   { userId: 1, title: '...', body: '...' }
 * @returns {Promise<object>} The created post.
 */
export const createPost = async (postData) => {
  try {
    if (!isInitialized) {
      await initializeStore();
    }

    // Mock API call (simulates network request)
    await mockDelay();
    console.log('[API] POST /posts', postData);

    // Create post in local store
    const newPost = {
      ...postData,
      id: Math.max(...postsStore.map(p => p.id || 0), 0) + 1,
    };

    postsStore.push(newPost);
    saveToSessionStorage();
    return Promise.resolve({ ...newPost });
  } catch (error) {
    console.error('Error creating post:', error);
    throw error;
  }
};

/**
 * Updates an existing post in local store and calls API.
 * @param {number} postId - The ID of the post to update.
 * @param {object} postData - The post payload to update with.
 * @returns {Promise<object>} The updated post.
 */
export const updatePost = async (postId, postData) => {
  try {
    if (!isInitialized) {
      await initializeStore();
    }

    // Mock API call (simulates network request)
    await mockDelay();
    console.log(`[API] PUT /posts/${postId}`, postData);

    // Update in local store
    const postIndex = postsStore.findIndex(p => p.id === postId);
    if (postIndex === -1) {
      throw new Error(`Post with id ${postId} not found`);
    }

    const updatedPost = {
      ...postsStore[postIndex],
      ...postData,
      id: postId,
    };

    postsStore[postIndex] = updatedPost;
    saveToSessionStorage();
    return Promise.resolve({ ...updatedPost });
  } catch (error) {
    console.error(`Error updating post with id ${postId}:`, error);
    throw error;
  }
};

/**
 * Deletes a post from local store and calls API.
 * @param {number} postId - The ID of the post to delete.
 * @returns {Promise<object>} Confirmation of deletion.
 */
export const deletePost = async (postId) => {
  try {
    if (!isInitialized) {
      await initializeStore();
    }

    // Mock API call (simulates network request)
    await mockDelay();
    console.log(`[API] DELETE /posts/${postId}`);

    // Remove from local store
    const postIndex = postsStore.findIndex(p => p.id === postId);
    if (postIndex === -1) {
      throw new Error(`Post with id ${postId} not found`);
    }

    postsStore.splice(postIndex, 1);
    saveToSessionStorage();
    return Promise.resolve({ success: true, id: postId, message: 'Post deleted successfully' });
  } catch (error) {
    console.error(`Error deleting post with id ${postId}:`, error);
    throw error;
  }
};
