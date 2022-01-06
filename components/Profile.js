import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import useWindowSize from '../hooks/useWindowSize';

const Profile = () => {
  const { ref, inView } = useInView({
    delay: 500,
    triggerOnce: true,
    fallbackInView: true,
  });
  const { width, height, isPortrait, isLg } = useWindowSize();
  const [scrolled, setScrolled] = useState(0);
  const notAnimated = isPortrait || !isLg;

  useEffect(() => {
    if (notAnimated) return;
    const handler = () => {
      // 0 (scrolled nothing, text top)
      // 1 (scrolled in the middle, text middle)
      // 2 (scrolled at bottom, text bottom)
      const scrollRatio = window.scrollY / height;
      setScrolled(scrollRatio);
    };
    document.addEventListener('scroll', handler);

    return () => {
      document.removeEventListener('scroll', handler);
    };
  }, [height, setScrolled, notAnimated]);

  const translateY = ((scrolled - 1) * 0.95 * height) / 2;
  const translateX = Math.max(80 * (1 - scrolled), 0);
  const scale = Math.max(1 + 1 - scrolled, 1);
  const opacity = Math.min(2 - scrolled, 1);

  return (
    <div className="flex text-xl lg:text-4xl lg:h-screen items-center">
      <h1
        className="flex-1 text-right"
        style={{
          opacity,
          transform: notAnimated
            ? undefined
            : `translateY(${translateY}px) translateX(${-translateX}%) scale(${scale})`,
        }}>
        Christian Krutsche
      </h1>
      <div className="flex-1 m-5 rounded-full overflow-hidden">
        <img
          ref={ref}
          style={{
            transition: 'filter 1500ms',
            filter: inView ? undefined : 'grayScale() blur(5px)',
          }}
          className="rounded-full"
          src="/images/together.jpg"
          width={width / 3}
          alt="together image"
        />
      </div>
      <h1
        className="flex-1"
        style={{
          opacity,
          transform: notAnimated
            ? undefined
            : `translateY(${translateY}px) translateX(${translateX}%) scale(${scale})`,
        }}>
        Karin Siwá
      </h1>
    </div>
  );
};

export default Profile;
