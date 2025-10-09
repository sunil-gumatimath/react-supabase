import React from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';

const UserTable = ({ users, startEdit, deleteUser }) => {
  return (
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
  );
};

export default UserTable;
