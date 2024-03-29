import React from 'react';
import { SettingsSection } from '../shared/SettingsSection';
import { Text } from '../../../../components/Text';
import { BillingContainer } from '../../../../features/update/billing/BillingContainer';

export const Billing = () => {
  return (
    <SettingsSection>
      <div className='space-y-1'>
        <Text
          as='h6'
          size='sm'
          weight={500}
        >
          Billing
        </Text>
        <Text
          as='p'
          size='sm'
        >
          Provide an address you would always like to trade with sellers
        </Text>
      </div>
      <BillingContainer />
    </SettingsSection>
  );
};
