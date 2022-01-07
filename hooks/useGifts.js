import { useEffect, useRef, useState } from 'react';
import { getGifts } from '../firebase/firestore-functions';
import { sortGifts } from '../functions';

const useGifts = (initialValue) => {
  const [gifts, setGifts] = useState(initialValue);
  const fetchedFromServer = useRef(false);

  useEffect(() => {
    if (fetchedFromServer.current) return;
    getGifts().then((nextGifts) => {
      fetchedFromServer.current = true;
      setGifts(
        nextGifts
          .map((gift) => ({
            image: gifts.find((item) => item.id === gift.id)?.image,
            ...gift,
          }))
          .sort(sortGifts),
      );
    });
  }, [gifts]);

  return gifts;
};

export default useGifts;
