import React from 'react';
import { Outlet, NavLink } from 'react-router-dom';
import { twMerge } from 'tailwind-merge';
import { Text } from '../components/ui/Text';
import {
  LuTextCursor,
  LuMousePointerClick,
  LuLassoSelect,
  LuTextCursorInput,
  LuTextQuote,
  LuPictureInPicture2,
  LuPictureInPicture,
  LuToggleLeft,
  LuCheckSquare,
  LuUngroup,
} from 'react-icons/lu';

export const ThemeLayout = () => {
  return (
    <div className='flex flex-row min-h-screen'>
      {/* sidebar */}
      <div className='bg-zinc-100 md:min-h-screen bottom-0 md:top-0 fixed w-full md:w-2/6 xl:w-1/6'>
        <Sidebar />
      </div>
      {/* content */}
      <div className='ml-0 md:ml-[33.33%] xl:ml-[16.66%] w-full flex flex-col gap-y-8'>
        <Header />
        {/* outlet */}
        <div className='px-4 md:px-8 lg:px-12'>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

type MenuItem = {
  name: string;
  url: string;
  icon: React.ReactNode;
};

const menuItems: MenuItem[] = [
  {
    name: 'Typography',
    url: 'typography',
    icon: <LuTextCursor />,
  },
  {
    name: 'Button',
    url: 'button',
    icon: <LuMousePointerClick />,
  },
  {
    name: 'Badge',
    url: 'badge',
    icon: <LuLassoSelect />,
  },
  {
    name: 'Input',
    url: 'input',
    icon: <LuTextCursorInput />,
  },
  {
    name: 'Textarea',
    url: 'textarea',
    icon: <LuTextQuote />,
  },
  {
    name: 'Select',
    url: 'select',
    icon: <LuPictureInPicture2 />,
  },
  {
    name: 'Toggle',
    url: 'toggle',
    icon: <LuToggleLeft />,
  },
  {
    name: 'Checkbox',
    url: 'checkbox',
    icon: <LuCheckSquare />,
  },
  {
    name: 'Toast',
    url: 'toast',
    icon: <LuPictureInPicture />,
  },
  {
    name: 'Alert',
    url: 'alert',
    icon: <LuUngroup />,
  },
];

const Sidebar = () => {
  return (
    <div className='flex flex-col gap-y-1 p-5'>
      {menuItems.map((item) => (
        <NavLink
          key={item.name}
          to={item.url}
          className={({ isActive }) =>
            twMerge(
              'inline-flex px-2 h-8 gap-x-3 items-center cursor-pointer hover:bg-white transition-all duration-200 ease-in-out rounded-lg',
              isActive && 'bg-white shadow-sm'
            )
          }
        >
          <span>{item.icon}</span>
          <Text
            as='label'
            size='sm'
          >
            {item.name}
          </Text>
        </NavLink>
      ))}
    </div>
  );
};

const Header = () => {
  return (
    <div className='inline-flex justify-between items-center h-12 px-12 border-b border-b-zinc-200 w-full'>
      <div>
        <Text
          as='h5'
          weight={500}
          size='md'
        >
          Mymarket Theme
          <Text
            as='span'
            size='xs'
            className='ml-1'
          >
            v1.0.0
          </Text>
        </Text>
      </div>

      <div></div>
    </div>
  );
};
