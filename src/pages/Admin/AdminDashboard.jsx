import React from "react";
import UsersTable from "./UsersTable";
import DocumentsTable from "./DocumentsTable";

export default function AdminDashboard() {
    return (
        <div>
            <h1>Admin Dashboard</h1>
            <UsersTable />
            <DocumentsTable />
            {/* Thêm các bảng quản lý khác nếu cần */}
        </div>
    );
}
