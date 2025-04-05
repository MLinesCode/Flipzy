import React, { useState } from 'react';

const UserModal = ({ setUser }) => {
  const [inputValue, setInputValue] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Validate and store the username in localStorage
    if (inputValue.trim()) {
      localStorage.setItem('username', inputValue);
      setUser(inputValue);
    }
  };

  return (
    <div className="user-modal fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="user-modal__content bg-white p-6 rounded shadow-md w-11/12 md:w-1/3">
        <h2 className="user-modal__title text-xl font-semibold mb-4">Enter Your Name</h2>
        <form onSubmit={handleSubmit} className="user-modal__form">
          <label htmlFor="username" className="user-modal__label block mb-2">
            Name:
          </label>
          <input
            type="text"
            id="username"
            className="user-modal__input w-full border border-gray-300 p-2 rounded mb-4"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            required
          />
          <button
            type="submit"
            className="user-modal__button bg-blue-500 text-white p-2 rounded w-full hover:bg-blue-600"
          >
            Start Game
          </button>
        </form>
      </div>
    </div>
  );
};

export default UserModal;
