import React, { useState, useEffect, useRef } from 'react';

const UserModal = ({ setUser, currentUser = '', onClose, isUpdating = false }) => {
  const [inputValue, setInputValue] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef(null);

  // Initialize input with current username if updating
  useEffect(() => {
    if (isUpdating && currentUser) {
      setInputValue(currentUser);
    }
    
    // Focus input after a small delay to ensure it works across browsers
    setTimeout(() => {
      if (inputRef.current) {
        inputRef.current.focus();
      }
    }, 100);
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

  // Handle escape key press to close modal when updating
  const handleKeyDown = (e) => {
    if (e.key === 'Escape' && isUpdating && onClose) {
      onClose();
    }
  };

  return (
    <div 
      className="user-modal fixed inset-0 flex items-center justify-center bg-deep-night bg-opacity-70 p-4 z-50 backdrop-blur-sm"
      style={{ backgroundColor: 'rgba(26, 32, 44, 0.7)' }}
      aria-modal="true"
      role="dialog"
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
      onKeyDown={handleKeyDown}
    >
      <div 
        className="user-modal__content relative w-11/12 max-w-md rounded-lg shadow-xl overflow-hidden"
        style={{ backgroundColor: '#F7FAFC' }}
      >
        {/* Decorative header stripe */}
        <div 
          className="user-modal__header-stripe h-2"
          style={{ 
            background: 'linear-gradient(to right, #8F67FF, #4FD1C5)',
          }}
          aria-hidden="true"
        ></div>
        
        <div className="p-6 sm:p-8">
          <h2 
            id="modal-title"
            className="user-modal__title text-2xl font-bold mb-6 text-center"
            style={{ color: '#2D3748' }}
          >
            {isUpdating ? 'Update Your Name' : 'Welcome to Flipzy!'}
          </h2>
          
          {!isUpdating && (
            <p 
              id="modal-description" 
              className="user-modal__subtitle text-center mb-6 text-slate-600"
            >
              Enter your name to start matching cards and set your high scores.
            </p>
          )}
          
          <form onSubmit={handleSubmit} className="user-modal__form">
            <div className="mb-6 relative">
              <label 
                htmlFor="username" 
                className={`user-modal__label absolute left-3 transition-all duration-200 ${
                  isFocused || inputValue ? 
                  'text-xs top-1 text-aurora-purple' : 
                  'text-base top-3 text-slate-500'
                }`}
                style={{ 
                  color: isFocused || inputValue ? '#8F67FF' : '#718096',
                }}
              >
                Your Name
              </label>
              
              <input
                type="text"
                id="username"
                ref={inputRef}
                className={`
                  user-modal__input w-full border-2 rounded-md pt-6 pb-2 px-3 
                  focus:outline-none focus:ring-2 focus:ring-opacity-50 transition-all
                `}
                style={{ 
                  borderColor: isFocused ? '#8F67FF' : '#CBD5E0',
                  backgroundColor: '#F7FAFC',
                  color: '#2D3748',
                  boxShadow: isFocused ? '0 0 0 3px rgba(143, 103, 255, 0.2)' : 'none',
                }}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                required
                aria-required="true"
                aria-invalid={inputValue.trim() === ''}
                autoComplete="name"
                maxLength="30"
                placeholder=" " // Empty placeholder to support screen readers
              />
              
              {/* Error message that's visually hidden but accessible to screen readers */}
              {inputValue.trim() === '' && (
                <div 
                  className="user-modal__error text-xs mt-1 text-error-red" 
                  style={{ color: '#E53E3E' }}
                  aria-live="polite"
                >
                  Please enter your name to continue
                </div>
              )}
            </div>
            
            <div className="flex gap-3">
              <button
                type="submit"
                className="user-modal__button-submit flex-1 py-3 px-4 rounded-md font-medium text-white transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 cursor-pointer hover:bg-opacity-90"
                style={{ 
                  backgroundColor: '#8F67FF',
                  boxShadow: '0 4px 6px rgba(143, 103, 255, 0.25)',
                }}
                aria-label={isUpdating ? 'Update name' : 'Start playing the game'}
              >
                {isUpdating ? 'Update' : 'Start Playing'}
              </button>
              
              {isUpdating && (
                <button
                  type="button"
                  onClick={onClose}
                  className="user-modal__button-cancel flex-1 py-3 px-4 rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 cursor-pointer hover:bg-gray-300"
                  style={{ 
                    backgroundColor: '#E2E8F0',
                    color: '#2D3748',
                  }}
                  aria-label="Cancel and close dialog"
                >
                  Cancel
                </button>
              )}
            </div>
          </form>
        </div>
        
        {/* Decorative element */}
        <div 
          className="user-modal__decoration absolute top-0 right-0 w-20 h-20 -mr-10 -mt-10 rounded-full opacity-10"
          style={{ 
            background: 'radial-gradient(circle, #8F67FF, #4FD1C5)',
          }}
          aria-hidden="true"
        ></div>
      </div>
    </div>
  );
};

export default UserModal;