'use client'
import React, { useEffect, useState } from "react";
import { MyAdminUsersTable } from "@/components/admin/table_users";
import { ActivityUser } from "@/types";
import { Spinner } from "@heroui/react";
import { title } from "@/components/primitives";

export default function AdminUsersPage() {
    const [users, setUsers] = useState<ActivityUser[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>("");

    const fetchUsers = async () => {
        try {
            const res = await fetch('/api/admin/users', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
            });

            if (!res.ok) {
                setError('Failed to fetch users');
            }

            const data = await res.json();
            setUsers(data.users);
        } catch (err) {
            setError('Fetching users failed');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    if (loading) return (
        <div>
            <div className="flex justify-center items-center h-screen">
                <p>Betöltés...</p>
                <Spinner />
            </div>
        </div>);

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div>
            <div className="inline-block text-center justify-center">
                <h1 className={title()}>Felhasználók kezelése</h1>
            </div>
            <MyAdminUsersTable users={users} />
        </div>
    );
};
