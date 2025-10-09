import React, { useEffect, useState } from 'react';
import { supabase } from '../createClient.js';
import UserForm from './UserForm';
import UserTable from './UserTable';

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
      <UserForm
        user={user}
        editingId={editingId}
        loading={loading}
        handleChange={handleChange}
        handleSubmit={editingId ? updateUser : createUser}
        cancelEdit={cancelEdit}
      />
      {error && (
        <div className="error-message">
          ⚠️ {error}
        </div>
      )}
      <UserTable users={users} startEdit={startEdit} deleteUser={deleteUser} />
    </div>
  );
}

export default UserComponent
