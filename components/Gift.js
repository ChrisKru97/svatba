import Image from 'next/image';
import { useEffect, useState } from 'react';
import { onGiftUpdate, updateGift } from '../firebase/firestore-functions';

const Gift = (props) => {
  const [gift, setGift] = useState(props);
  const { max, reserved = 0, title, url, image, id } = gift;

  useEffect(() => {
    const unsub = onGiftUpdate(id, ({ reserved: nextReserved }) => {
      if (nextReserved !== reserved)
        setGift({ ...gift, reserved: nextReserved });
    });
    return () => {
      unsub();
    };
  }, [gift, id, reserved]);

  return (
    <div
      className="flex flex-col space-y-5 lg:space-y-0 lg:flex-row items-center lg:space-x-5 bg-stone-100 p-5 rounded-xl cursor-pointer"
      onClick={() => {
        window.location.href = url;
      }}>
      <h2 className="underline text-blue-600">{title}</h2>
      {max && (
        <span>
          {reserved} / {max}
        </span>
      )}
      {image && <img src={image} width={100} alt={`image ${title}`} />}
      {max && reserved < max && (
        <div>
          <Image
            src="/images/plus.svg"
            height={28}
            width={28}
            alt="add"
            onClick={(e) => {
              e.stopPropagation();
              if (reserved >= max) return;
              updateGift(id, 1);
            }}
          />
        </div>
      )}
    </div>
  );
};

export default Gift;
