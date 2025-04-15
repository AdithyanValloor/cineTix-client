import React, { useEffect, useState } from 'react';
import { axiosInstance } from '../../config/axiosInstance';

function NotificationsManagement() {
  const [notifications, setNotifications] = useState([]);
  const [form, setForm] = useState({
    title: '',
    message: '',
    audience: 'all',
    deliveryMethods: ['in-app'],
  });
  const [loading, setLoading] = useState(false);

  const fetchNotifications = async () => {
    try {
      const { data } = await axiosInstance.get('/notifications/get', { withCredentials: true });
      setNotifications(data.notifications);
    } catch (err) {
      console.error(err);
    }
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await axiosInstance.post('/notifications/create', form, { withCredentials: true });
      setForm({ title: '', message: '', audience: 'all', deliveryMethods: ['in-app'] });
      fetchNotifications();
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axiosInstance.delete(`/notifications/${id}`, { withCredentials: true });
      fetchNotifications();
    } catch (err) {
      console.error(err);
    }
  };

  const handleToggle = async (id) => {
    try {
      await axiosInstance.patch(`/notifications/${id}/toggle`, {}, { withCredentials: true });
      fetchNotifications();
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  return (
    <div className="space-y-6">
      <div className="bg-base-200 p-6 rounded-xl shadow">
        <h1 className="text-2xl font-bold">Notification Management</h1>
        <p className="text-base-content/70 mt-1">Create and manage system notifications.</p>
      </div>

      {/* Form */}
      <div className="bg-base-100 p-6 rounded-xl shadow space-y-4">
        <form onSubmit={handleCreate} className="space-y-4">
          <input
            type="text"
            placeholder="Title"
            className="input input-bordered w-full"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            required
          />
          <textarea
            placeholder="Message"
            className="textarea textarea-bordered w-full"
            value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
            required
          ></textarea>

          <div className="flex gap-4 flex-wrap">
            <select
              className="select select-bordered"
              value={form.audience}
              onChange={(e) => setForm({ ...form, audience: e.target.value })}
            >
              <option value="all">All</option>
              <option value="users">Users</option>
              <option value="exhibitors">Exhibitors</option>
              <option value="admins">Admins</option>
            </select>

            <label className="label cursor-pointer flex gap-2">
              <input
                type="checkbox"
                className="checkbox"
                checked={form.deliveryMethods.includes('in-app')}
                onChange={(e) =>
                  setForm((prev) => ({
                    ...prev,
                    deliveryMethods: e.target.checked
                      ? [...prev.deliveryMethods, 'in-app']
                      : prev.deliveryMethods.filter((m) => m !== 'in-app'),
                  }))
                }
              />
              <span>In-App</span>
            </label>

            <label className="label cursor-pointer flex gap-2">
              <input
                type="checkbox"
                className="checkbox"
                checked={form.deliveryMethods.includes('email')}
                onChange={(e) =>
                  setForm((prev) => ({
                    ...prev,
                    deliveryMethods: e.target.checked
                      ? [...prev.deliveryMethods, 'email']
                      : prev.deliveryMethods.filter((m) => m !== 'email'),
                  }))
                }
              />
              <span>Email</span>
            </label>
          </div>

          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? 'Creating...' : 'Create Notification'}
          </button>
        </form>
      </div>

      {/* Notifications List */}
      <div className="bg-base-100 p-4 rounded-xl shadow overflow-x-auto">
        <table className="table table-zebra w-full">
          <thead>
            <tr>
              <th>#</th>
              <th>Title</th>
              <th>Message</th>
              <th>Audience</th>
              <th>Status</th>
              <th>Methods</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {notifications.length > 0 ? (
              notifications.map((n, i) => (
                <tr key={n._id}>
                  <td>{i + 1}</td>
                  <td>{n.title}</td>
                  <td>{n.message}</td>
                  <td>{n.audience}</td>
                  {n.isActive ? <td className='text-green-500'>Active</td> : <td className='text-red-500'>Inctive</td>}
                  
                  <td>{n.deliveryMethods.join(', ')}</td>
                  <td className="flex flex-wrap gap-2">
                    <button className="btn btn-sm btn-warning" onClick={() => handleToggle(n._id)}>
                      {n.isActive ? 'Deactivate' : 'Activate'}
                    </button>
                    <button className="btn btn-sm btn-error" onClick={() => handleDelete(n._id)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="text-center">No notifications found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default NotificationsManagement;
