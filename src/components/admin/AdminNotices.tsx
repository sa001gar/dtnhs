
import React from "react";

const AdminNotices = () => {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Notices Management</h2>
      <p>Here you can manage school notices and announcements.</p>
      
      {/* This component will be similar to AdminNews but specialized for notices */}
      <div className="p-8 border rounded-md text-center">
        <p className="text-muted-foreground">
          Notices management functionality will be implemented here.
        </p>
      </div>
    </div>
  );
};

export default AdminNotices;
