import { Dispatch } from 'react';

export interface UserStore {
  name: string;
  description: string;
  followers: string[];
  location: {
    state: string;
    city: string;
    address: string;
  };
}
export interface User {
  _id: string;
  isSeller: boolean;
  email: string;
  firstName: string;
  lastName: string;
  bio: string;
  mobile: { country: string; code: number; number: number };
  billing: {
    country: string;
    state: string;
    city: string;
    address: string;
  };
  otp: {
    code: number;
    expiresAt: number;
  };
  accounts: { platform: string; url: string }[];
  token: {
    id: string;
    exp: number;
  };
  photo: {
    url: string;
    name: string;
  };
  store: UserStore;
}

export interface Action<T> {
  type: 'SIGN_IN' | 'SIGN_OUT' | 'UPDATE';
  payload: T;
}

export interface State {
  user: User | null;
}
export interface Context<T> {
  user: User | null;
  dispatch: Dispatch<T>;
}
