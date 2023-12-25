import { VariantProps, cva } from 'class-variance-authority';
import React, {
  createContext,
  HTMLAttributes,
  useContext,
  useState,
} from 'react';
import { twMerge } from 'tailwind-merge';
import { cn } from '../../utils/util';

const alertVariant = cva(
  'w-full sm:max-w-[320px] p-2 flex rounded-lg flex-wrap',
  {
    variants: {
      variant: {
        success: 'bg-green-50',
        danger: 'bg-red-50',
        warning: 'bg-amber-50',
        ghost: 'bg-white',
      },
    },
    defaultVariants: {
      variant: 'ghost',
    },
  }
);

interface AlertContextProps {
  isVisible: boolean;
  onDismiss: () => void;
  variant: string | null | undefined;
}

const AlertContext = createContext<AlertContextProps | undefined>(undefined);

interface IAlert
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof alertVariant> {
  className?: string;
}

export const Alert = (props: IAlert) => {
  const { variant, className, ...rest } = props;

  const [isVisible, setIsVisible] = useState<boolean>(true);

  return (
    <AlertContext.Provider
      value={{
        variant,
        isVisible,
        onDismiss: () => setIsVisible(false),
      }}
    >
      {isVisible ? (
        <div
          className={cn(alertVariant({ variant, className }))}
          {...rest}
        />
      ) : null}
    </AlertContext.Provider>
  );
};

interface IAlertIcon extends HTMLAttributes<HTMLDivElement> {}

export const AlertIcon = (props: IAlertIcon) => {
  const { variant } = useContext(AlertContext)!;
  const { className, ...rest } = props;

  return (
    <div
      className={cn({ variant, className })}
      {...rest}
    />
  );
};

interface AlertDismissProps extends HTMLAttributes<HTMLDivElement> {}

export const AlertDismiss = ({ className, ...rest }: AlertDismissProps) => {
  const { onDismiss } = useContext(AlertContext)!;

  return (
    <div
      className={twMerge('cursor-pointer', className)}
      onClick={onDismiss}
      {...rest}
    />
  );
};
