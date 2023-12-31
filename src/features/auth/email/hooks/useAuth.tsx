import { useState } from 'react';
import { Status, Callback } from '../../../../hooks/types';
import { useUserContext } from '../../../../hooks/useUserContext';
import { User } from '../../../../contexts/user.types';

export const useAuth = () => {
  const { dispatch } = useUserContext()!;
  const [status, setStatus] = useState<Status<User>>({
    state: null,
    isLoading: null,
    error: null,
    payload: null,
  });

  const signIn = async <T extends { email: string }>(
    data: T,
    callback?: Callback
  ) => {
    try {
      setStatus({
        state: null,
        isLoading: true,
        error: null,
        payload: null,
      });

      const response = await fetch(
        'https://mymarket-tan.vercel.app/user/auth',
        {
          method: 'POST',
          headers: {
            'content-type': 'application/json',
          },
          body: JSON.stringify(data),
        }
      );

      const json = await response.json();

      if (!response.ok) {
        return setStatus({
          state: 'error',
          isLoading: false,
          error: {
            code: json.code,
            message: json.message,
          },
        });
      }

      dispatch({ type: 'SIGN_IN', payload: json.data });

      setStatus({
        state: 'success',
        isLoading: false,
        payload: {
          code: json.code,
          message: json.message,
          data: json.data,
        },
      });

      return callback && callback(json);
    } catch (error: any) {
      console.error(error.message);
    }
  };

  return { status, signIn };
};
