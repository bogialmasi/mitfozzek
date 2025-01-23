'use client';

import { useAuthentication } from '@/app/context/authenticationContext';
import { useEffect, useState } from 'react';
import { MyAlert } from './logout_alert';

export const MyAlertHandler = () => {
  const { user } = useAuthentication();
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    if (!user) {
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 5000); // Hide after 5 seconds
    }
  }, [user]);

  // Apply the opacity transition to fade in/out
  const alertClasses = showAlert
    ? 'opacity-100 transition-opacity duration-500'
    : 'opacity-0 transition-opacity duration-500';

  return (
    <div
      className={`fixed bottom-5 left-5 z-50 w-auto max-w-md ${alertClasses}`}
    >
      <MyAlert />
    </div>
  );
};