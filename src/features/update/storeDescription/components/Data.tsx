import React from 'react';
import { Text } from '../../../../components/Text';

export const Data = ({ description }: { description: string }) => {
  return (
    <Text
      as='p'
      size='sm'
      className='first-letter:uppercase'
    >
      {description}
    </Text>
  );
};
