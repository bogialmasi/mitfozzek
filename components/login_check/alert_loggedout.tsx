'use client';

import { useAuthentication } from '@/app/context/authenticationContext';
import { useEffect, useState } from 'react';
import { Alert, Button } from '@heroui/react';


export const MyLogoutAlert = () => {
  const { user, logout } = useAuthentication();
  const [showAlert, setShowAlert] = useState(false);
  
  useEffect(() => {
    const session = localStorage.getItem('session');
    if (session === 'true' && user === null) { // 'true' is string, user is logged out
      console.log("User got logged out");
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 5000); // Alert shown for 5 sec
      logout(); // Clear session and user state
    }
  }, [user, logout]);

  
  // Apply the opacity transition to fade in/out
  const alertClasses = showAlert
    ? 'opacity-100 transition-opacity duration-500'
    : 'opacity-0 transition-opacity duration-500';

  return (
    <div
      className={`fixed bottom-5 left-5 z-50 w-auto max-w-md ${alertClasses}`}
    >
      <Alert
        color="warning"
        title="Lejárt munkamenet"
        description="Jelentkezzen be újra"
        endContent={
          <Button color="warning" size="sm" variant="flat">
            <a href="/login">Bejelentkezés</a>
          </Button>
        }
        variant="faded"
      />
    </div>
  );
};