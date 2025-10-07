import React, { useEffect, useState } from 'react';
import { supabase } from '../createClient.js';

const UserComponent = () => {
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState({
    name: '',
    age: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  async function fetchUsers() {
    try {
      const { data } = await supabase
        .from('users')
        .select('*');
      setUsers(data);
      console.log('Fetched users:', data);
    } catch (error) {
      console.error('Error fetching users:', error);
      setError('Failed to load users');
    }
  }

  async function createUser(e) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const { data, error } = await supabase
        .from('users')
        .insert({ name: user.name, age: user.age })
        .select();

      if (error) throw error;

      // Reset form
      setUser({ name: '', age: '' });

      // Refresh users list
      fetchUsers();

      console.log('User created:', data);
    } catch (error) {
      setError(error.message);
      console.error('Error creating user:', error);
    } finally {
      setLoading(false);
    }
  }

  const handleChange = (e) => {
    setUser(prevFormData => ({
      ...prevFormData,
      [e.target.name]: e.target.value
    }));
  };

  async function deleteUser(userId) {
    try {
      const { data, error } = await supabase
        .from('users')
        .delete()
        .eq('id', userId);

      if (error) throw error;

      // Refresh users list after successful deletion
      await fetchUsers();

      console.log('User deleted successfully', data);
    } catch (error) {
      console.error('Error deleting user:', error);
      setError('Failed to delete user: ' + error.message);
    }
  }

  return (
    <div>
      <form onSubmit={createUser}>
        <input
          type="text"
          placeholder="Enter name"
          name="name"
          value={user.name}
          onChange={handleChange}
          required
        />

        <input
          type="number"
          placeholder="Enter age"
          name="age"
          value={user.age}
          onChange={handleChange}
          required
        />

        <button type="submit" disabled={loading}>
          {loading ? 'Creating...' : 'Create'}
        </button>
      </form>

      {error && <p style={{ color: 'red' }}>Error: {error}</p>}

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Age</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((userData) => (
            <tr key={userData.id}>
              <td>{userData.id}</td>
              <td>{userData.name}</td>
              <td>{userData.age}</td>
              <td>
                <button onClick={() => deleteUser(userData.id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default UserComponent
