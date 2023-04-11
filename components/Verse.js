import { useInView } from 'react-intersection-observer';
import useWindowSize from '../hooks/useWindowSize';

const Verse = () => {
  const { isLg, isPortrait } = useWindowSize();
  const skip = isPortrait || !isLg;
  const { ref, inView } = useInView({
    delay: 200,
    triggerOnce: true,
    fallbackInView: true,
    skip,
  });

  return (
    <div className="flex justify-center px-5 mt-5 mb-10">
      <div
        className="text-2xl lg:text-4xl lg:w-[50vw] text-center p-5 bg-verse rounded-xl shadow-lg text-white"
        ref={ref}
        style={{
          transition: 'transform 800ms, opacity 400ms',
          opacity: skip || inView ? 1 : 0,
          transform: skip || inView ? undefined : 'translateX(400px)',
        }}>
        &quot;Ale szukajcie najpierw Królestwa Bożego i sprawiedliwości jego, a
        wszystko inne będzie wam dodane.&quot; Mateusz 6:33
      </div>
    </div>
  );
};

export default Verse;
