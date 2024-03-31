import React, { useState } from 'react';
import axios from 'axios';

function CreateUser() {
  const [name, setName] = useState('');
  const [userName , setUserName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    setError('');
    console.log(name)

    try {
      // Make API call to approve user
      const response = await axios.put(`http://localhost:3000/api/user/${name}/${userName}/approve`);
      console.log('User approved successfully:', response.data);
      setName("")
      setUserName("")
      // Handle success if needed
    } catch (error) {
      setError('Failed to approve user. Please try again.');
      console.error('Error approving user:', error);
      // Handle error if needed
    } finally {
      setIsLoading(false);
    }
  };

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleUserNameChange = (event) => {
    setUserName(event.target.value);
  };

  return (
    <div>
      <h2>Approve User</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Approver Name:
          <input
            type="text"
            value={name}
            onChange={handleNameChange}
            required
          />
        </label>
        <label>
          User Name:
          <input
            type="text"
            value={userName}
            onChange={handleUserNameChange}
            required
          />
        </label>
        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Loading...' : "Make Approver"}
        </button>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </form>
    </div>
  );
}

export default CreateUser;
