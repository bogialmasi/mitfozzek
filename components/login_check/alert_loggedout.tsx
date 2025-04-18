'use client';
import { useAuthentication } from '@/app/context/authenticationContext';
import { useEffect, useState } from 'react';
import { Alert, Button } from '@heroui/react';
import { siteConfig } from '@/config/site';
import * as cookie from 'cookie';

export const MyLogoutAlert = () => {
  const { user, logout } = useAuthentication();
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    const parsedCookies = cookie.parse(document.cookie || '');
    const token = parsedCookies.token;

    // If there's no token and user is logged out, show the alert
    if (!token && user === null) {
      console.log('User got logged out');
      console.log(cookie)
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 5000); // Alert shown for 5 sec
      logout(); // Logout the user by clearing the cookie and user state
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
            <a href={siteConfig.links.login}>Bejelentkezés</a>
          </Button>
        }
        variant="faded"
      />
    </div>
  );
};
