import React, { HTMLAttributes, forwardRef, useContext } from 'react';
import { Field } from 'formik';
import { twMerge } from 'tailwind-merge';
import { Text } from './Text';
import { FormContext } from './Form';

interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  disabled?: boolean;
}

export const Textarea = forwardRef<HTMLDivElement, TextareaProps>(
  (props: TextareaProps, ref) => {
    const { disabled, className, ...rest } = props;

    const {
      field: { name },
      helper,
    } = useContext(FormContext)!;

    return (
      <Field
        ref={ref}
        as='textarea'
        name={name}
        className={twMerge(
          'outline-none p-2 rounded-md text-sm flex-1 bg-white placeholder:text-zinc-500 placeholder:font-normal text-zinc-800 font-medium',
          disabled && 'cursor-not-allowed bg-zinc-50 bg-opacity-80',
          className
        )}
        onFocus={() => helper.setTouched(true)}
        onBlur={() => helper.setTouched(false)}
        disabled={disabled}
        {...rest}
      />
    );
  }
);

interface TextareaLimitProps extends HTMLAttributes<HTMLParagraphElement> {
  limit?: number;
}

export const TextareaLimit = ({
  className,
  limit,
  ...rest
}: TextareaLimitProps) => {
  const {
    field: { value },
  } = useContext(FormContext)!;

  return (
    <Text
      as='p'
      size='sm'
      className={twMerge('text-zinc-500', className)}
    >
      {limit && limit >= value?.length && limit - value?.length} remaining
    </Text>
  );
};
