import { RefObject, useEffect } from 'react';

/**
 * A React hook that detects clicks outside of a set of referenced elements.
 *
 * @param ignoreRefs - A single `RefObject<HTMLElement>` or an array of `RefObject<HTMLElement>` that should be ignored when detecting clicks outside.
 * @param onClickOutside - A callback function that is called when a click occurs outside of the referenced elements.
 * @returns Void
 */
export function useClickOutside(
  ignoreRefs: RefObject<HTMLElement> | RefObject<HTMLElement>[],
  onClickOutside: () => void
) {
  useEffect(() => {
    const refs = ignoreRefs instanceof Array ? ignoreRefs : [ignoreRefs];
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
  }, [onClickOutside, ignoreRefs]);
}
