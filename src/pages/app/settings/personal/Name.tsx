import React from 'react';
import { SettingsSection } from '../shared/SettingsSection';
import { Text } from '../../../../components/Text';
import { NameContainer } from '../../../../features/update/name/NameContainer';

export const Name = () => {
  return (
    <SettingsSection>
      <div className='space-y-1'>
        <Text
          as='h6'
          size='sm'
          weight={500}
        >
          Legal Names
        </Text>
        <Text
          as='p'
          size='sm'
        >
          Change your respective names shown on your profile
        </Text>
      </div>
      <NameContainer />
    </SettingsSection>
  );
};
