import React, { useEffect } from 'react';

/**
 * Notification component that shows a transient toast-style banner.
 *
 * The notification auto-dismisses after `duration` milliseconds by calling
 * `onClose`. Three visual variants are supported: `success` (green),
 * `error` (red), and `info` (blue).
 *
 * @param {Object}   props            - Component props.
 * @param {string}   props.message    - Text content to display inside the notification.
 * @param {'success'|'error'|'info'} [props.type='success'] - Visual style variant.
 * @param {Function} props.onClose    - Callback invoked when the notification should be hidden.
 * @param {number}   [props.duration=3000] - Time in milliseconds before auto-dismissal.
 * @returns {JSX.Element}
 */
const Notification = ({ message, type = 'success', onClose, duration = 3000 }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const typeClasses = {
    success: "notification--success bg-green-100 border border-green-500 text-green-800",
    error: "notification--error bg-red-100 border border-red-500 text-red-800",
    info: "notification--info bg-blue-100 border border-blue-500 text-blue-800"
  };

  return (
    <div className={`notification fixed top-4 right-4 p-3 rounded-md shadow-md transition-all duration-300 transform translate-y-0 opacity-100 ${typeClasses[type]}`} role="alert">
      <div className="notification__content flex items-center">
        {type === 'success' && (
          <svg xmlns="http://www.w3.org/2000/svg" className="notification__icon h-5 w-5 mr-2 text-green-500" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
        )}
        <p className="notification__message">{message}</p>
      </div>
    </div>
  );
};

export default Notification;