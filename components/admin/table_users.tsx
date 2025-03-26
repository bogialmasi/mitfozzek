'use client'
import React, { useEffect, useState } from "react";
import { Button, Chip, Input, Spinner, Switch, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from "@heroui/react";
import { ActivityUser } from "@/types";


interface MyAdminUsersTableProps {
    users: ActivityUser[];
}

export const MyAdminUsersTable: React.FC<MyAdminUsersTableProps> = ({ users }) => {
    const [loading, setLoading] = useState<boolean>(false);
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [error, setError] = useState<string>('');
    const [allUsers, setAllUsers] = useState<ActivityUser[]>(users || []);

    const filteredUsers = allUsers.filter((user) =>
        user.username.toLowerCase().includes(searchQuery.trim().toLowerCase())
    );

    useEffect(() => {
        setLoading(true);
        const fetchUsers = async () => {
            try {
                const res = await fetch(`/api/admin/users`);
                const data = await res.json();
                if (res.ok) {
                    setAllUsers(data.users);
                } else {
                    setError(data.message);
                }
            } catch (error) {
                setError("Failed to fetch users.");
            } finally {
                setLoading(false);
            }
        };
        fetchUsers();
    }, []);


    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <p>Betöltés...</p>
                <Spinner />
            </div>
        );
    }

    return (
        <section className="flex justify-center w-full py-8">
            <div className="w-full mx-auto px-4 py-6 rounded-lg">
                <Input
                    className="form-control input max-w-md py-2"
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Keresés..."
                    variant="bordered"
                />
                <Table aria-label="Felhasználók listája">
                    <TableHeader>
                        <TableColumn>Felhasználónév</TableColumn>
                        <TableColumn>Email cím</TableColumn>
                        <TableColumn>Aktivitás státusza</TableColumn>
                    </TableHeader>
                    <TableBody items={filteredUsers}>
                        {filteredUsers.map((user, index) => (
                            <TableRow key={index}>
                                <TableCell>{user.username}</TableCell>
                                <TableCell>{user.email}</TableCell>
                                <TableCell>
                                    <div>
                                        {user.inactive === 0 ?
                                            <Chip variant="flat" color="success" radius="full">Aktív</Chip> :
                                            <Chip variant="flat" color="danger" radius="full">Inaktív</Chip>}
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </section >
    );
};
