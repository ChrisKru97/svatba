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
      className="lg:max-w-sm m-5 items-center flex flex-col space-y-3 bg-stone-200 shadow-xl p-5 rounded-xl"
      key={title}>
      <img src={iconUrl} width={50} height={50} alt={`icon ${title}`} />
      <h3 className="text-lg underline">{title}</h3>
      <div
        className="text-sm"
        dangerouslySetInnerHTML={{ __html: description }}
      />
    </div>
  );
};

export default Info;
