import React, { useState, useEffect } from 'react';
import auth from '@react-native-firebase/auth';

export const formatCurrency = (val) => {
  if (val == '') {
    return val;
  }
  return '₦ ' + val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

export const user = () => {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  const onAuthStateChanged = (user) => {
    setUser(user);
    if (initializing) setInitializing(false);
  };

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, []);
  return user;
};
