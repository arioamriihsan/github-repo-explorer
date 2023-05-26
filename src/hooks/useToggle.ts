import { useCallback, useState } from 'react';

/**
 * Hook helper toggling boolean state
 */
const useToggle = () => {
  const [active, setActive] = useState(false);

  // toggling `active` state
  const toggleActive = useCallback(() => {
    setActive((prevState) => !prevState);
  }, []);

  // expose state and function side-effect
  return {
    active,
    toggleActive,
    setActive,
  };
};

export default useToggle;
