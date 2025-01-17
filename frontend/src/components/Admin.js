import React, { useState, useEffect } from 'react';
import './Admin.css'; // Importing the CSS file for styling

const Admin = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/v1/upload/fetchUserData'); // API endpoint
        if (!response.ok) {
          throw new Error('Failed to fetch users');
        }
        const data = await response.json();
        setUsers(data.data || []); // Assuming `data.data` contains the user array
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="admin-container">
      <h1>Admin Dashboard</h1>
      <h2>User Submissions</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Social Media Handle</th>
            <th>Image</th>
          </tr>
        </thead>
        <tbody>
          {users.length > 0 ? (
            users.map((user) => (
              <tr key={user._id}>
                <td>{user.name || 'N/A'}</td>
                <td>{user.tags || user.handle || 'N/A'}</td>
                <td>
                  {user.url ? (
                    <img
                      src={user.url}
                      alt={`Submission from ${user.name}`}
                      width="100"
                    />
                  ) : (
                    <span>No Image</span>
                  )}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3">
                No user submissions found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Admin;
