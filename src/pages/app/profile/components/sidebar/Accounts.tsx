import React from 'react';
import { Text } from '../../../../../components/ui/Text';
import { Separator } from '../../../../../components/ui/Separator';
import {
  RiFacebookBoxFill,
  RiGoogleFill,
  RiLink,
  RiTwitterXFill,
  RiWhatsappFill,
} from 'react-icons/ri';
import { Card, CardContent } from '../../../../../components/ui/Card';
import { TbSquareRoundedPlus } from 'react-icons/tb';

interface AccountsProps {
  accounts: Record<string, string>[];
}

const Icon = ({ platform }: { platform: string }) => {
  const helper = {
    render: (platform: string) => {
      switch (platform) {
        case 'google':
          return <RiGoogleFill />;
        case 'whatsApp':
          return <RiWhatsappFill />;
        case 'facebook':
          return <RiFacebookBoxFill />;
        case 'twitter':
          return <RiTwitterXFill />;
        case 'others':
          return <RiLink />;
        default:
          return <RiLink />;
      }
    },
  };

  return <>{helper.render(platform)}</>;
};

const EmptyState = () => {
  return (
    <Card className='p-0 ring-0'>
      <CardContent className='flex flex-col items-center gap-y-3'>
        <TbSquareRoundedPlus className='w-8 h-8 stroke-zinc-400' />

        <div className='space-y-1 text-center'>
          <Text
            as='h6'
            weight={500}
          >
            No social account added yet
          </Text>
          <Text
            as='p'
            size='sm'
          >
            No social account link was found in our library.
          </Text>
        </div>
      </CardContent>
    </Card>
  );
};

export const Accounts = ({ accounts }: AccountsProps) => {
  return (
    <>
      <Separator className='my-5' />

      <div className='space-y-3'>
        <Text
          as='h6'
          size='sm'
          weight={500}
        >
          Social accounts
        </Text>

        {accounts && accounts.length > 0 ? (
          accounts.map((account, i) => (
            <div
              key={i}
              className='flex items-center gap-x-2 text-zinc-500'
            >
              <Icon platform={account.platform} />
              <Text
                as='p'
                size='sm'
              >
                {account.url}
              </Text>
            </div>
          ))
        ) : (
          <EmptyState />
        )}
      </div>
    </>
  );
};
