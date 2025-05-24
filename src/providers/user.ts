"use client";

import { useEffect } from 'react';
import { useUserStore } from '@/store/user';

const UserProvider = () => {
  const fetchUser = useUserStore((state: any) => state.fetchUser);
  const user = useUserStore((state: any) => state.user);

  useEffect(() => {
    if (!user) {
      fetchUser();
    }
  }, [user, fetchUser]);

  return null; // this provider only loads user data, no UI
};

export default UserProvider;
