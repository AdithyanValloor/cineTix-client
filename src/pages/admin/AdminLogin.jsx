import React from 'react';
import AdminLogin from '../../components/Admin/AdminLogin'; 
import AdminHeader from '../../components/Admin/AdminHeader'; 

function AdminLoginPage() {
  return (
    <div className="flex justify-center items-center min-h-screen p-4">
      <div className="bg-blue-300 absolute top-0 left-0">
        <AdminHeader />
      </div>
      <div className="p-4 bg-base-200 rounded-2xl shadow-lg w-full max-w-md">
        <AdminLogin /> 
      </div>
    </div>
  );
}

export default AdminLoginPage;
