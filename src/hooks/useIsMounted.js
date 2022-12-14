import { useRef, useEffect } from 'react';

const useIsMounted = () => {
  const isMountRef = useRef(true);
  useEffect(() => {
    isMountRef.current = false;
  }, []);
  return isMountRef.current;
};
export default useIsMounted;
