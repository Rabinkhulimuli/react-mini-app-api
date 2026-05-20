import { useEffect, useMemo, useState } from 'react';
import { createPost, deletePost, getPostById, getPosts, hardResetPosts, updatePost } from '@/api';

export const SORT_OPTIONS = [
  { value: 'id', label: 'Post ID' },
  { value: 'userId', label: 'User ID' },
  { value: 'title', label: 'Title' },
];

const normalizeText = (value) => String(value ?? '').toLowerCase();

const compareValues = (left, right, sortField) => {
  if (sortField === 'title') {
    return normalizeText(left.title).localeCompare(normalizeText(right.title));
  }

  return Number(left[sortField] ?? 0) - Number(right[sortField] ?? 0);
};

export function usePostsManager() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortField, setSortField] = useState('id');
  const [sortDirection, setSortDirection] = useState('desc');

  const loadPosts = async () => {
    try {
      setLoading(true);
      setError('');
      const nextPosts = await getPosts();
      setPosts(nextPosts);
    } catch {
      setError('Failed to load posts. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const hardResetPostsState = async () => {
    try {
      setLoading(true);
      setError('');
      const nextPosts = await hardResetPosts();
      setPosts(nextPosts);
      setSearchTerm('');
      setSortField('id');
      setSortDirection('desc');
      return nextPosts;
    } catch {
      setError('Failed to hard reset posts. Please try again.');
      throw new Error('Failed to hard reset posts.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void loadPosts();
  }, []);

  const visiblePosts = useMemo(() => {
    const filteredPosts = posts.filter((post) => {
      const query = normalizeText(searchTerm).trim();
      if (!query) {
        return true;
      }

      return [post.title, post.body, post.userId, post.id].some((field) =>
        normalizeText(field).includes(query)
      );
    });

    const sortedPosts = [...filteredPosts].sort((left, right) => {
      const order = compareValues(left, right, sortField);
      return sortDirection === 'asc' ? order : -order;
    });

    return sortedPosts;
  }, [posts, searchTerm, sortDirection, sortField]);

  const createPostItem = async (postData) => {
    try {
      setError('');
      const nextPost = await createPost(postData);
      setPosts((currentPosts) => [...currentPosts, nextPost]);
      return nextPost;
    } catch (createError) {
      setError('Failed to create the post.');
      throw createError;
    }
  };

  const updatePostItem = async (postId, postData) => {
    try {
      setError('');
      const updatedPost = await updatePost(postId, postData);
      setPosts((currentPosts) =>
        currentPosts.map((post) => (post.id === postId ? updatedPost : post))
      );
      return updatedPost;
    } catch (updateError) {
      setError('Failed to update the post.');
      throw updateError;
    }
  };

  const deletePostItem = async (postId) => {
    try {
      setError('');
      const deletionResult = await deletePost(postId);
      setPosts((currentPosts) => currentPosts.filter((post) => post.id !== postId));
      return deletionResult;
    } catch (deleteError) {
      setError('Failed to delete the post.');
      throw deleteError;
    }
  };

  const getPostDetails = async (postId) => getPostById(postId);

  const toggleSortDirection = () => {
    setSortDirection((currentDirection) => (currentDirection === 'asc' ? 'desc' : 'asc'));
  };

  const clearError = () => setError('');

  return {
    posts,
    visiblePosts,
    loading,
    error,
    searchTerm,
    setSearchTerm,
    sortField,
    setSortField,
    sortDirection,
    toggleSortDirection,
    loadPosts,
    hardResetPostsState,
    clearError,
    createPostItem,
    updatePostItem,
    deletePostItem,
    getPostDetails,
  };
}