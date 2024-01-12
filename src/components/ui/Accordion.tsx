import React, {
  createContext,
  useContext,
  useState,
  HTMLAttributes,
  forwardRef,
} from 'react';
import { twMerge } from 'tailwind-merge';

interface AccordionContextProps {
  multiple: boolean;
  items: string[];
  helper: {
    isActive: (value: string) => boolean;
    toggle: (item: string) => void;
  };
}

const AccordionContext = createContext<AccordionContextProps | null>(null);

interface AccordionProps extends HTMLAttributes<HTMLDivElement> {
  multiple?: boolean;
  defaultValue?: string;
}

export const Accordion = forwardRef<HTMLDivElement, AccordionProps>(
  (props, ref) => {
    const { multiple = false, className, defaultValue, ...rest } = props;
    const [items, setItems] = useState<string[]>([defaultValue || '']);

    const helper = {
      isActive: (value: string) => items.includes(value),
      toggle: (value: string) => {
        const itemExists = items.includes(value);
        if (multiple) {
          if (itemExists) {
            const filter = items.filter((item) => item !== value);
            return setItems(filter);
          }

          return setItems((prevItems) => [...prevItems, value]);
        }

        if (itemExists) {
          return setItems((prevItem) => prevItem);
        }

        return setItems([value]);
      },
    };

    return (
      <AccordionContext.Provider value={{ multiple, items, helper }}>
        <div
          ref={ref}
          className={twMerge('w-full', className)}
          {...rest}
        />
      </AccordionContext.Provider>
    );
  }
);

interface AccordionItemProps extends HTMLAttributes<HTMLDivElement> {
  value: string;
}

export const AccordionItem = forwardRef<HTMLDivElement, AccordionItemProps>(
  (props, ref) => {
    const { value, className, ...rest } = props;

    return (
      <div
        ref={ref}
        className={twMerge('space-y-0.5', className)}
        data-value={value}
        {...rest}
      />
    );
  }
);

interface AccordionTriggerProps
  extends Omit<HTMLAttributes<HTMLDivElement>, 'children'> {
  value: string;
  children: React.ReactNode | ((isActive: boolean) => React.ReactNode);
}

export const AccordionTrigger = forwardRef<
  HTMLDivElement,
  AccordionTriggerProps
>((props, ref) => {
  const { value, className, children, ...rest } = props;
  const {
    helper: { toggle, isActive },
  } = useContext(AccordionContext)!;

  return (
    <div
      ref={ref}
      className={twMerge('cursor-pointer w-full', className)}
      onClick={() => toggle(value)}
      {...rest}
    >
      {typeof children === 'function' ? children(isActive(value)) : children}
    </div>
  );
});

interface AccordionContentProps extends HTMLAttributes<HTMLDivElement> {
  value: string;
}

export const AccordionContent = forwardRef<
  HTMLDivElement,
  AccordionContentProps
>((props, ref) => {
  const { value, className, ...rest } = props;
  const {
    helper: { isActive },
  } = useContext(AccordionContext)!;

  return (
    <div
      ref={ref}
      className={twMerge(
        'w-full transition-all duration-300 ease-in-out',
        isActive(value)
          ? 'translate-y-0 visible h-fit'
          : 'translate-y-2 invisible h-0',
        className
      )}
      {...rest}
    />
  );
});
