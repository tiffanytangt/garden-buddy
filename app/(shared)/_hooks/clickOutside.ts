import { RefObject, useEffect } from 'react';

export function useClickOutside(
  ref: RefObject<HTMLElement> | RefObject<HTMLElement>[],
  onClickOutside: () => void
) {
  useEffect(() => {
  const refs = ref instanceof Array ? ref : [ref];
    function handleClickOutside(event: MouseEvent) {
      const inside: boolean = !!refs.find((ref) => {
        if (ref.current && ref.current.contains(event.target as HTMLElement)) {
          return true;
        }
      });
      if (!inside) onClickOutside();
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClickOutside, ref]);
}
