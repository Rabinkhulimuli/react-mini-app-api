import React, { useState, useEffect } from 'react';
import { getPosts, createPost, updatePost, deletePost } from './api';
import { Button } from './components/ui/button';

export default function App() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [creating, setCreating] = useState(false);
  const [editingPostId, setEditingPostId] = useState(null);
  const [createForm, setCreateForm] = useState({
    userId: '1',
    title: '',
    body: '',
  });
  const [editForm, setEditForm] = useState({
    userId: '1',
    title: '',
    body: '',
  });

  // Fetch all posts on mount
  useEffect(() => {
    const fetchAllPosts = async () => {
      try {
        setLoading(true);
        const fetchedPosts = await getPosts();
        setPosts(fetchedPosts);
      } catch (err) {
        setError('Failed to fetch posts');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchAllPosts();
  }, []);

  // Create a new post via form (id is auto-assigned in API layer)
  const handleCreatePost = async (event) => {
    event.preventDefault();
    if (!createForm.title.trim() || !createForm.body.trim()) {
      setError('Title and body are required');
      return;
    }

    const newPostData = {
      userId: Number(createForm.userId) || 1,
      title: createForm.title.trim(),
      body: createForm.body.trim(),
    };

    try {
      setCreating(true);
      setError(null);
      const createdPost = await createPost(newPostData);
      setPosts([...posts, createdPost]);
      setCreateForm({ userId: '1', title: '', body: '' });
    } catch (err) {
      setError('Failed to create post');
      console.error(err);
    } finally {
      setCreating(false);
    }
  };

  const startEditPost = (post) => {
    setEditingPostId(post.id);
    setEditForm({
      userId: String(post.userId ?? 1),
      title: post.title ?? '',
      body: post.body ?? '',
    });
    setError(null);
  };

  const cancelEditPost = () => {
    setEditingPostId(null);
    setEditForm({ userId: '1', title: '', body: '' });
  };

  // Update a post via form (keeps same id)
  const handleUpdatePost = async (event, postId) => {
    event.preventDefault();
    if (!editForm.title.trim() || !editForm.body.trim()) {
      setError('Title and body are required');
      return;
    }

    const updatedData = {
      userId: Number(editForm.userId) || 1,
      title: editForm.title.trim(),
      body: editForm.body.trim(),
    };

    try {
      setError(null);
      const updated = await updatePost(postId, updatedData);
      setPosts(posts.map(p => p.id === postId ? updated : p));
      cancelEditPost();
    } catch (err) {
      setError('Failed to update post');
      console.error(err);
    }
  };

  // Delete a post
  const handleDeletePost = async (postId) => {
    try {
      await deletePost(postId);
      setPosts(posts.filter(p => p.id !== postId));
      if (editingPostId === postId) {
        cancelEditPost();
      }
    } catch (err) {
      setError('Failed to delete post');
      console.error(err);
    }
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif', maxWidth: '900px', margin: '0 auto' }}>
      <h1>Post Management</h1>

      <form
        onSubmit={handleCreatePost}
        style={{
          border: '1px solid #ddd',
          borderRadius: '8px',
          padding: '15px',
          marginBottom: '20px',
          backgroundColor: '#f9f9f9',
        }}
      >
        <h2 style={{ marginTop: 0 }}>Create Post</h2>
        <div style={{ display: 'grid', gap: '10px' }}>
          <label>
            User ID
            <input
              type="number"
              min="1"
              value={createForm.userId}
              onChange={(e) => setCreateForm({ ...createForm, userId: e.target.value })}
              style={{ width: '100%', padding: '8px', marginTop: '4px' }}
            />
          </label>
          <label>
            Title
            <input
              type="text"
              value={createForm.title}
              onChange={(e) => setCreateForm({ ...createForm, title: e.target.value })}
              style={{ width: '100%', padding: '8px', marginTop: '4px' }}
              placeholder="Enter post title"
            />
          </label>
          <label>
            Body
            <textarea
              value={createForm.body}
              onChange={(e) => setCreateForm({ ...createForm, body: e.target.value })}
              style={{ width: '100%', padding: '8px', marginTop: '4px', minHeight: '90px' }}
              placeholder="Enter post body"
            />
          </label>
          <div>
            <Button type="submit" disabled={creating}>
              {creating ? 'Creating...' : 'Create (ID auto-assigned)'}
            </Button>
          </div>
        </div>
      </form>

      {loading && <p>Loading posts...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <div>
        <h2>Posts ({posts.length})</h2>
        {posts.length === 0 ? (
          <p>No posts available</p>
        ) : (
          posts.map(post => (
            <div
              key={post.id}
              style={{
                border: '1px solid #ddd',
                borderRadius: '8px',
                padding: '15px',
                marginBottom: '15px',
                backgroundColor: '#f9f9f9',
              }}
            >
              <p style={{ margin: '0 0 8px 0' }}>
                <strong>ID:</strong> {post.id}
              </p>
              <p style={{ margin: '0 0 8px 0' }}>
                <strong>User ID:</strong> {post.userId}
              </p>
              <p style={{ margin: '0 0 8px 0' }}>
                <strong>Title:</strong> {post.title}
              </p>
              <p style={{ margin: '0 0 15px 0', whiteSpace: 'pre-wrap', color: '#555' }}>
                <strong>Body:</strong> {post.body}
              </p>
              {editingPostId === post.id ? (
                <form onSubmit={(event) => handleUpdatePost(event, post.id)} style={{ display: 'grid', gap: '10px' }}>
                  <label>
                    User ID
                    <input
                      type="number"
                      min="1"
                      value={editForm.userId}
                      onChange={(e) => setEditForm({ ...editForm, userId: e.target.value })}
                      style={{ width: '100%', padding: '8px', marginTop: '4px' }}
                    />
                  </label>
                  <label>
                    Title
                    <input
                      type="text"
                      value={editForm.title}
                      onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
                      style={{ width: '100%', padding: '8px', marginTop: '4px' }}
                    />
                  </label>
                  <label>
                    Body
                    <textarea
                      value={editForm.body}
                      onChange={(e) => setEditForm({ ...editForm, body: e.target.value })}
                      style={{ width: '100%', padding: '8px', marginTop: '4px', minHeight: '90px' }}
                    />
                  </label>
                  <p style={{ margin: 0, color: '#666' }}>Post ID is fixed and preserved automatically: {post.id}</p>
                  <div style={{ display: 'flex', gap: '10px' }}>
                    <Button type="submit" style={{ backgroundColor: '#4CAF50', color: 'white' }}>
                      Save
                    </Button>
                    <Button type="button" onClick={cancelEditPost}>
                      Cancel
                    </Button>
                  </div>
                </form>
              ) : (
                <div style={{ display: 'flex', gap: '10px' }}>
                  <Button
                    onClick={() => startEditPost(post)}
                    style={{
                      backgroundColor: '#4CAF50',
                      color: 'white',
                      padding: '8px 12px',
                      border: 'none',
                      borderRadius: '4px',
                      cursor: 'pointer',
                    }}
                  >
                    Edit
                  </Button>
                  <Button
                    onClick={() => handleDeletePost(post.id)}
                    style={{
                      backgroundColor: '#f44336',
                      color: 'white',
                      padding: '8px 12px',
                      border: 'none',
                      borderRadius: '4px',
                      cursor: 'pointer',
                    }}
                  >
                    Delete
                  </Button>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
