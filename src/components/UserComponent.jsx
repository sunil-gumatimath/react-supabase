import React, { useEffect, useState } from 'react';
import { supabase } from '../createClient.js';
import { FaEdit, FaTrash, FaPlus, FaSave, FaTimes } from 'react-icons/fa';

const UserComponent = () => {
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState({
    name: '',
    age: ''
  });
  const [editingId, setEditingId] = useState(null);
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

  const startEdit = (userData) => {
    setEditingId(userData.id);
    setUser({
      name: userData.name,
      age: userData.age
    });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setUser({ name: '', age: '' });
  };

  async function updateUser(e) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const { data, error } = await supabase
        .from('users')
        .update({ name: user.name, age: user.age })
        .eq('id', editingId)
        .select();

      if (error) throw error;

      // Reset form and exit edit mode
      cancelEdit();

      // Refresh users list
      fetchUsers();

      console.log('User updated:', data);
    } catch (error) {
      setError(error.message);
      console.error('Error updating user:', error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className={loading ? 'loading-state' : ''}>
      <div className="container">
        <header>
          <h1>User Management</h1>
          <p>Manage your users with create, read, update, and delete operations</p>
        </header>

        <section className="form-section">
          <h2 className="form-title">
            {editingId ? 'Edit User' : 'Add New User'}
          </h2>
          <form onSubmit={editingId ? updateUser : createUser}>
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

            <div className="button-group">
              <button type="submit" disabled={loading}>
                {loading ? (
                  editingId ? 'Updating...' : 'Creating...'
                ) : (
                  <>
                    {editingId ? <FaSave /> : <FaPlus />}
                    {editingId ? 'Update' : 'Create'}
                  </>
                )}
              </button>

              {editingId && (
                <button type="button" className="cancel-btn" onClick={cancelEdit}>
                  <FaTimes /> Cancel
                </button>
              )}
            </div>
          </form>

          {error && (
            <div className="error-message">
              ⚠️ {error}
            </div>
          )}
        </section>

        <section className="table-section">
          <h2 className="table-title">All Users</h2>
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Age</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((userData) => (
                <tr key={userData.id}>
                  <td>{userData.id}</td>
                  <td>{userData.name}</td>
                  <td>{userData.age}</td>
                  <td>
                    <div className="action-buttons">
                      <button
                        className="action-btn edit"
                        onClick={() => startEdit(userData)}
                      >
                        <FaEdit /> Edit
                      </button>
                      <button
                        className="action-btn delete"
                        onClick={() => deleteUser(userData.id)}
                      >
                        <FaTrash /> Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      </div>
    </div>
  );
}

export default UserComponent
