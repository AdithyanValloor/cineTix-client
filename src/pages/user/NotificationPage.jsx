import React, { useEffect, useState } from 'react';
import { axiosInstance } from '../../config/axiosInstance';

function NotificationPage() {
  const [notifications, setNotifications] = useState([]);

  // Fetch user-specific notifications
  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const res = await axiosInstance.get('/user-notification/get', {
          withCredentials: true,
        });

        setNotifications(res.data.notifications);
      } catch (err) {
        console.error('Error fetching notifications:', err);
      }
    };

    fetchNotifications();
  }, []);

  // Mark notification as read (POST)
  const markAsRead = async (id) => {
    try {
      await axiosInstance.post('/user-notification/mark-read', { id }, {
        withCredentials: true,
      });

      setNotifications((prev) =>
        prev.map((n) => (n._id === id ? { ...n, isRead: true } : n))
      );
    } catch (err) {
      console.error('Error marking as read:', err);
    }
  };

  // Soft delete for the user (DELETE)
  const deleteNotification = async (id) => {
    try {
      await axiosInstance.delete('/user-notification/delete', {
        data: { id },
        withCredentials: true,
      });

      setNotifications(notifications.filter((n) => n._id !== id));
    } catch (err) {
      console.error('Error deleting notification:', err);
    }
  };

  return (
    <div className="max-w-4xl min-h-screen mx-auto pt-36 md:pt-24 px-4 sm:px-6 py-10">
      <h1 className="text-2xl font-bold mb-6 text-center sm:text-left">Notifications</h1>
  
      <div className="space-y-6">
        {notifications.length === 0 ? (
          <p className="text-gray-500 text-center sm:text-left">No notifications yet!</p>
        ) : (
          notifications.map((notification) => (
            <div
              key={notification._id}
              className={`p-4 rounded-lg shadow-md ${
                notification.isRead ? 'bg-base-200' : 'bg-white'
              } transition-all hover:shadow-lg`}
            >
              {/* Top Section: Title + New Tag */}
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2">
                <div>
                  <h3 className="text-lg font-semibold">{notification.title}</h3>
                  <p className="text-sm text-gray-600">{notification.message}</p>
                </div>
  
                {!notification.isRead && (
                  <span className="self-start sm:self-center text-xs py-1 px-3 rounded-full bg-yellow-500 text-white">
                    New
                  </span>
                )}
              </div>

              {/* Buttons */}
              <div className="mt-4 flex flex-col sm:flex-row justify-end gap-3">
                <button
                  onClick={() => markAsRead(notification._id)}
                  disabled={notification.isRead}
                  className={`px-4 py-2 rounded-md text-white ${
                    notification.isRead
                      ? 'bg-gray-400 cursor-not-allowed'
                      : 'bg-blue-500 hover:bg-blue-600'
                  }`}
                >
                  {notification.isRead ? 'Read' : 'Mark as Read'}
                </button>
  
                <button
                  onClick={() => deleteNotification(notification._id)}
                  className="px-4 py-2 rounded-md text-white bg-red-500 hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
  
}

export default NotificationPage;
