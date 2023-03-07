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
    <div className="flex justify-center mt-5 mb-10 lg:mb-20">
      <div
        className="text-2xl lg:text-4xl text-center p-5 mx-5 bg-verse rounded-xl shadow-lg text-white"
        ref={ref}
        style={{
          transition: 'transform 800ms, opacity 400ms',
          opacity: skip || inView ? 1 : 0,
          transform: skip || inView ? undefined : 'translateX(400px)',
        }}>
        &quot;Ale szukajcie najpierw królestwa Bożego i jego sprawiedliwości, a
        to wszystko będzie wam dodane.&quot; Mateusz 6:33
      </div>
    </div>
  );
};

export default Verse;
