'use client'
import React, { useEffect, useState } from "react";
import { Input, Spinner, Switch, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from "@heroui/react";
import { ActivityUser } from "@/types";
import { MyDangerAlert } from "../alert/alert_danger";
import { MySuccessAlert } from "../alert/alert_success";


interface MyAdminUsersTableProps {
    users: ActivityUser[];
}

export const MyAdminUsersTable: React.FC<MyAdminUsersTableProps> = ({ users }) => {
    const [loading, setLoading] = useState<boolean>(false);
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [error, setError] = useState<string>('');
    const [isChanging, setIsChanging] = useState<boolean>(false);
    const [allUsers, setAllUsers] = useState<ActivityUser[]>(users || []);

    const [successAlertVisible, setSuccessAlertVisible] = useState(false);
    const [successAlertContent, setSuccessAlertContent] = useState({ title: "", description: "" });

    const [dangerAlertVisible, setDangerAlertVisible] = useState(false);
    const [dangerAlertContent, setDangerAlertContent] = useState({ title: "", description: "" });

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

    const handleActivityChange = async (user: ActivityUser) => {
        console.log('handleActivityChange called', user);  // Debugging line

        setIsChanging(true);

        // update for activity toggle
        const updatedStatus = user.inactive === 0 ? 1 : 0;

        const updatedUsers = allUsers.map(item =>
            item.userId === user.userId ? { ...item, inactive: updatedStatus } : item
        );
        setAllUsers(updatedUsers);

        try {
            const res = await fetch(`/api/admin/users?id=${user.userId}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
            });

            const data = await res.json();

            if (!res.ok) {
                setError(data.message);
            } else {
                setSuccessAlertContent({
                    title: 'Sikeres módosítás',
                    description: 'Az aktivitás módosítása mentve.',
                });
                setSuccessAlertVisible(true);
            }
        } catch (error) {
            setDangerAlertContent({
                title: 'Sikertelen módosítás',
                description: 'Az aktivitás módosítása sikertelen. Próbálja újra.',
            });
            setDangerAlertVisible(true);
        } finally {
            setIsChanging(false);
        }
    };

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
                                    <Switch
                                        isSelected={user.inactive === 0}
                                        onValueChange={() => {
                                            console.log('switch clicked for user', user);
                                            handleActivityChange(user);
                                        }}
                                    >
                                        {isChanging ? (
                                            <Spinner size="sm" />
                                        ) : (
                                            <p>{user.inactive === 0 ? "Aktív" : "Inaktív"}</p>
                                        )}
                                    </Switch>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                {successAlertVisible && (
                    <MySuccessAlert
                        title={successAlertContent.title}
                        description={successAlertContent.description}
                    />
                )}
                {dangerAlertVisible && (
                    <MyDangerAlert
                        title={dangerAlertContent.title}
                        description={dangerAlertContent.description}
                    />
                )}
            </div>
        </section>
    );
};
