import React from 'react';
import ManageUsers from '../../components/Admin/ManageUsers';

function ExhibitorManagementPage() {
  
    return (
      <div className="space-y-6">
        <ManageUsers userRole={'exhibitor'}/>
      </div>
    );
}

export default ExhibitorManagementPage;
