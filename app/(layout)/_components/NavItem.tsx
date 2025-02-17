import Link from 'next/link';
import { twMerge } from 'tailwind-merge';

interface NavItemProps {
  id?: number;
  text: string;
  icon: React.ComponentType;
  href: string;
  isActive?: boolean;
  mobile?: boolean;
  desktop?: boolean;
  className?: string;
}

const NavItem = ({
  icon,
  id,
  href,
  text,
  isActive,
  mobile,
  desktop,
  className,
}: NavItemProps) => {
  const IconComponent = icon as React.ComponentType<{ className: string }>;
  return (
    <li
      key={id}
      className={twMerge([
        'w-1/4 sm:w-full items-center gap-1 sm:px-1 pt-4 pb-2 sm:py-4 px-6 ',
        !mobile ? 'hidden' : '',
        desktop ? 'sm:flex' : 'sm:hidden',
        isActive
          ? 'sm:text-emerald-700 sm:dark:text-emerald-400 sm: dark:bg-white/5'
          : '',
        className,
      ])}
    >
      <Link
        href={href}
        className={twMerge([
          'w-full flex flex-col items-center gap-1 border-b-[3px] sm:border-b-0',
          isActive
            ? 'border-b-white/50 sm:dark:border-b-emerald-400 sm:border-b-emerald-700 sm:border-none'
            : 'border-b-transparent',
        ])}
      >
        <IconComponent className="size-6" />
        <span className="text-base sm:text-xs">{text}</span>
      </Link>
    </li>
  );
};

export default NavItem;
