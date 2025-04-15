import React, { useEffect, useState } from 'react';
import ManageUsers from '../../components/Admin/ManageUsers';

function UserManagementPage() {
  return (
    <div className="space-y-6">
      <ManageUsers userRole={'user'}/>
    </div>
  );
}

export default UserManagementPage;
