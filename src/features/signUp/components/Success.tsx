import React from 'react';
import { Text } from '../../../components/Text';

export const Success = () => {
  return (
    <div className='space-y-2'>
      <Text
        as='h5'
        size='2xl'
        weight={600}
      >
        Account registration successful
      </Text>
      <Text
        as='p'
        size='sm'
      >
        An email was sent to your email along with an account activation link.
        Click on the link to verify your account
      </Text>
    </div>
  );
};
