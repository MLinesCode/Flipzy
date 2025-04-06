import React, { useState, useEffect } from 'react';

const UserModal = ({ setUser, currentUser = '', onClose, isUpdating = false }) => {
  const [inputValue, setInputValue] = useState('');

  // Initialize input with current username if updating
  useEffect(() => {
    if (isUpdating && currentUser) {
      setInputValue(currentUser);
    }
  }, [isUpdating, currentUser]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Validate and store the username in localStorage
    if (inputValue.trim()) {
      localStorage.setItem('username', inputValue);
      setUser(inputValue);
      if (onClose) onClose();
    }
  };

  return (
    <div 
      className="user-modal fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
      aria-modal="true"
      role="dialog"
      aria-labelledby="modal-title"
    >
      <div className="user-modal__content bg-white p-6 rounded shadow-md w-11/12 md:w-1/3">
        <h2 
          id="modal-title"
          className="user-modal__title text-xl font-semibold mb-4"
        >
          {isUpdating ? 'Update Your Name' : 'Enter Your Name'}
        </h2>
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
            aria-required="true"
            autoFocus
          />
          <div className="flex gap-2">
            <button
              type="submit"
              className="user-modal__button bg-blue-500 text-white p-2 rounded flex-1 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
            >
              {isUpdating ? 'Update' : 'Start Game'}
            </button>
            {isUpdating && (
              <button
                type="button"
                onClick={onClose}
                className="bg-gray-300 text-gray-700 p-2 rounded flex-1 hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-400"
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserModal;