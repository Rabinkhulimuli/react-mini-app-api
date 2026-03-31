import React, { useState, useEffect } from 'react';
import { getUsers } from './api';
import { Button } from './components/ui/button';

export default function App() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const fetchedUsers = await getUsers();
        setUsers(fetchedUsers);
      } catch  {
        setError('Failed to fetch users. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []); // Empty dependency array ensures this runs only once on mount

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <Button>shadcn</Button>
      <h1>Users from API</h1>
      {loading && <p>Loading users...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {!loading && !error && (
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {users.map((user) => (
            <li key={user.id} style={{ border: '1px solid #ccc', borderRadius: '8px', padding: '15px', marginBottom: '15px' }}>
              <h2 style={{ fontSize: '1.5em', margin: '0 0 10px 0' }}>{user.name}</h2>
              <p style={{ margin: '0 0 5px 0' }}><strong>Email:</strong> {user.email}</p>
              <p style={{ margin: 0 }}><strong>Company:</strong> {user.company.name}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
