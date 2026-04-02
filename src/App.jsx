import React, { useState, useEffect } from 'react';
import { createPost } from './api';
import { Button } from './components/ui/button';

const samplePost = {
  userId: 1,
  title: 'sunt aut facere repellat provident occaecati excepturi optio reprehenderit',
  body: 'quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto',
};

export default function App() {
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const submitPost = async () => {
      try {
        const createdPost = await createPost(samplePost);
        setPost(createdPost);
      } catch  {
        setError('Failed to create post. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    submitPost();
  }, []); // Empty dependency array ensures this runs only once on mount

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <Button>shadcn</Button>
      <h1>Post operation</h1>
      {loading && <p>Creating post...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {!loading && !error && post && (
        <div style={{ border: '1px solid #ccc', borderRadius: '8px', padding: '15px', maxWidth: '720px' }}>
          <p style={{ margin: '0 0 8px 0' }}><strong>Created Post ID:</strong> {post.id}</p>
          <p style={{ margin: '0 0 8px 0' }}><strong>User ID:</strong> {post.userId}</p>
          <p style={{ margin: '0 0 8px 0' }}><strong>Title:</strong> {post.title}</p>
          <p style={{ margin: 0, whiteSpace: 'pre-wrap' }}><strong>Body:</strong> {post.body}</p>
        </div>
      )}
    </div>
  );
}
