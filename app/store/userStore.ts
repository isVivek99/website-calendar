/* eslint-disable import/prefer-default-export */
import { create } from 'zustand';

type User = {
  firstname: string;
  lastname: string;
  bio: string;
  username: string;
  timezone: string;
  onboarding: boolean;
};

type updateUserKey = 'firstname' | 'lastname' | 'bio' | 'username' | 'timezone';

type UserState = {
  user: User;
  updateUser: (data: Record<updateUserKey, string>) => void;
};

export const userStore = create<UserState>()((set) => ({
  user: {
    firstname: '',
    lastname: '',
    bio: '',
    username: '',
    timezone: '',
    onboarding: false,
  },
  updateUser: (data: Record<updateUserKey, string>) =>
    set((state) => ({ user: { ...state.user, ...data } })),
}));
