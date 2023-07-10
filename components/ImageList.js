import { useCallback, useEffect, useRef } from 'react';
import Image from 'next/image';
import useWindowSize from '../hooks/useWindowSize';
import p1 from '../public/images/random/1.jpg';
import p2 from '../public/images/random/2.jpg';
import p3 from '../public/images/random/3.jpg';
import p4 from '../public/images/random/4.jpg';
import p5 from '../public/images/random/5.jpg';
import p6 from '../public/images/random/6.jpg';
import p7 from '../public/images/random/7.jpg';
import p8 from '../public/images/random/8.jpg';
import p9 from '../public/images/random/9.jpg';

const portraitImages = [1, 3, 5];

const indexAt = (index) => {
  const imageCount = 9;
  if (index < 0) return (imageCount + index) % imageCount;
  return index % imageCount;
};

const ImageList = () => {
  const { width } = useWindowSize();
  const selectedImage = useRef(0);

  const onImageClick = useCallback(
    (index) => {
      selectedImage.current = index;
      [indexAt(index - 1), indexAt(index + 1)].forEach(
        (sideIndex, sideArrIndex) => {
          const elStyle = document.getElementById(
            `carousel-image-${sideIndex}`,
          ).style;
          elStyle.setProperty('z-index', 0);
          elStyle.setProperty('opacity', 1);
          elStyle.setProperty(
            'transform',
            `translateX(${sideArrIndex === 0 ? '-' : ''}${
              width * 0.4
            }px) scale(0.3)`,
          );
        },
      );
      [indexAt(index - 2), indexAt(index + 2)].forEach(
        (sideIndex, sideArrIndex) => {
          const elStyle = document.getElementById(
            `carousel-image-${sideIndex}`,
          ).style;
          elStyle.setProperty('opacity', 0);
          elStyle.setProperty(
            'transform',
            `translateX(${sideArrIndex === 0 ? '-' : ''}${
              width * 0.8
            }px) scale(0)`,
          );
        },
      );
      const mainElStyle = document.getElementById(
        `carousel-image-${index}`,
      ).style;
      mainElStyle.setProperty('z-index', 1);
      mainElStyle.setProperty('transform', 'scale(0.5)');
    },
    [indexAt, width],
  );

  useEffect(() => {
    const intervalId = setInterval(() => {
      onImageClick(indexAt(selectedImage.current + 1));
    }, 3000);

    return () => {
      clearInterval(intervalId);
    };
  }, [indexAt, onImageClick]);

  return (
    <div className="w-screen h-screen overflow-x-hidden flex justify-center items-center">
      {[p1, p2, p3, p4, p5, p6, p7, p8, p9].map((image, index, { length }) => {
        const isPortrait = portraitImages.includes(index);
        const leftImage = length - 1;
        const sideImages = [leftImage, 1];
        const shownImages = [...sideImages, 0];
        return (
          <Image
            sizes="1920px, 1080px, 640px"
            id={`carousel-image-${index}`}
            key={index}
            alt={`image number ${index + 1}`}
            src={image}
            className="absolute cursor-pointer"
            onClick={() => onImageClick(index)}
            style={{
              transition: 'transform 600ms, opacity 600ms',
              zIndex: index === 0 ? 1 : 0,
              width: isPortrait ? width * 0.7 : width,
              opacity: shownImages.includes(index) ? 1 : 0,
              transform: `translateX(${index === leftImage ? '-' : ''}${
                sideImages.includes(index) ? width * 0.4 : 0
              }px) scale(${
                shownImages.includes(index)
                  ? sideImages.includes(index)
                    ? 0.3
                    : 0.5
                  : 0
              })`,
            }}
          />
        );
      })}
    </div>
  );
};

export default ImageList;
