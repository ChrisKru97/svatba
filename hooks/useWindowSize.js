import { useState, useEffect } from 'react';

const useWindowSize = () => {
  const [windowSize, setWindowSize] = useState({
    width: 0,
    height: 0,
    isPortrait: false,
    isLg: false,
  });

  const hasWindow = typeof window !== 'undefined';

  useEffect(() => {
    if (hasWindow) {
      const handleResize = () => {
        const isPortrait = window.innerHeight > window.innerWidth;
        setWindowSize({
          width: window.innerWidth,
          height: window.innerHeight,
          isLg: (isPortrait ? window.innerWidth : window.innerHeight) >= 1024,
          isPortrait,
        });
      };

      window.addEventListener('resize', handleResize);

      handleResize();

      return () => window.removeEventListener('resize', handleResize);
    }
  }, [hasWindow]);

  return windowSize;
};

export default useWindowSize;
