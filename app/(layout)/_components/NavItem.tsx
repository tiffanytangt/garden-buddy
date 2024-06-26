import Link from "next/link";

interface NavItemProps {
    id?: number;
    text: string;
    icon: React.ComponentType;
    href: string;
    isActive?: boolean;
    mobile?: boolean;
    desktop?: boolean;
  }
  
const NavItem = ({
  icon,
  id,
  href,
  text,
  isActive,
  mobile,
  desktop,
}: NavItemProps) => {
  const IconComponent = icon as React.ComponentType<{ className: string }>;
  return (
    <li
      key={id}
      className={`
        ${!mobile ? 'hidden' : ''} ${desktop ? 'sm:flex' : 'sm:hidden'}
        ${isActive ? 'text-emerald-700 dark:text-emerald-400' : ''} 
        w-full items-center gap-1 sm:px-1 py-4 active:bg-gray-500 active:text-black
        `}
    >
      <Link href={href} className="w-full flex flex-col items-center gap-1">
        <IconComponent className="size-6" />
        <span className="text-base sm:text-xs">{text}</span>
      </Link>
    </li>
  );
};

export default NavItem;
