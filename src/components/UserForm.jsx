import React from 'react';
import { FaSave, FaPlus, FaTimes } from 'react-icons/fa';

const UserForm = ({ user, editingId, loading, handleChange, handleSubmit, cancelEdit }) => {
  return (
    <section className="form-section">
      <h2 className="form-title">
        {editingId ? 'Edit User' : 'Add New User'}
      </h2>
      <form onSubmit={handleSubmit}>
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
    </section>
  );
};

export default UserForm;
