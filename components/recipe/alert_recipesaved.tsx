import { Alert } from "@heroui/react";
import { useEffect, useState } from "react";

interface MySavedAlertProps {
    title: string;
    description: string;
    color?: "success" | "danger" | "default" | "primary" | "secondary" | "warning"
}

export const MySavedAlert: React.FC<MySavedAlertProps> = ({ title, description, color }) => {
    const [showAlert, setShowAlert] = useState(false);

    useEffect(() => {
        setShowAlert(true);
        // Hide the alert after 2 sec
        const timer = setTimeout(() => {
            setShowAlert(false);
        }, 2000);
        return () => clearTimeout(timer); // Cleanup the timeout on unmount
    }, []);

    // Apply the opacity transition to fade in/out
    const alertClasses = showAlert
        ? 'opacity-100 transition-opacity duration-500'
        : 'opacity-0 transition-opacity duration-500';

    return (
        <div className={`fixed bottom-5 left-5 z-50 w-auto max-w-md ${alertClasses}`}>
            <div className="flex items-center justify-center w-full">
                <Alert description={description} title={title} color={color} />
            </div>
        </div>
    );
}