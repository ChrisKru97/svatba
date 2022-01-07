import { useEffect, useRef, useState } from 'react';
import { getInfo } from '../firebase/firestore-functions';
import { parseMd } from '../functions';

const useInfo = (initialValue) => {
  const [info, setInfo] = useState(initialValue);
  const fetchedFromServer = useRef(false);

  useEffect(() => {
    if (fetchedFromServer.current) return;
    getInfo().then((nextInfo) => {
      fetchedFromServer.current = true;
      setInfo(nextInfo.map(parseMd));
    });
  }, [info]);

  return info;
};

export default useInfo;
