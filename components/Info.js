import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';

const Info = ({ title, description, iconUrl }) => {
  const [bounced, setBounced] = useState(false);
  const { ref, inView } = useInView({
    delay: 500,
    triggerOnce: true,
    fallbackInView: true,
  });

  useEffect(() => {
    if (inView) {
      setTimeout(() => setBounced(true), 800);
    } else {
      setBounced(false);
    }
  }, [inView]);

  return (
    <div
      ref={ref}
      style={{
        transition: 'transform 800ms',
        transform: inView && !bounced ? 'scale(1.1)' : undefined,
      }}
      className="lg:w-[50vw] items-center flex flex-col space-y-3 bg-stone-200 shadow-xl p-5 rounded-xl"
      key={title}>
      {!!iconUrl && (
        <img src={iconUrl} width={50} height={50} alt={`icon ${title}`} />
      )}
      {!!title && <h3 className="text-3xl lg:text-4xl underline">{title}</h3>}
      <div
        className="text-2xl lg:text-3xl"
        dangerouslySetInnerHTML={{ __html: description }}
      />
    </div>
  );
};

export default Info;
