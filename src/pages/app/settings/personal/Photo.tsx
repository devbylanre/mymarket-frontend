import React from 'react';

// components
import { Text } from '../../../../components/ui/Text';
import { SettingsSection } from '../../../../components/templates/settings/SettingsSection';
import { PhotoContainer } from '../../../../features/update/photo/PhotoContainer';

export const Photo = () => {
  return (
    <SettingsSection>
      <div className='space-y-1'>
        <Text
          as='h6'
          size='sm'
          weight={500}
        >
          Upload Photo
        </Text>
        <Text
          as='p'
          size='sm'
          accent='medium'
        >
          Upload a photo this helps improves your store credibility. min 5MB
        </Text>
      </div>

      <PhotoContainer />
    </SettingsSection>
  );
};
