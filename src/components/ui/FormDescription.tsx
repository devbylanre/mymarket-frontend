import React from 'react';
import { Text } from './Text';
import { twMerge } from 'tailwind-merge';

type FormDescriptionProps = {
  children: React.ReactNode;
  className?: string;
};

export const FormDescription = ({
  children,
  className,
}: FormDescriptionProps) => {
  return (
    <Text
      as='p'
      className={twMerge('text-sm text-zinc-500', className)}
    >
      {children}
    </Text>
  );
};