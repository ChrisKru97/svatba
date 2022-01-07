import { marked } from 'marked';
import { getInfo, getGifts } from '../firebase/firestore-functions';

const priorityValue = {
  high: 0,
  normal: 1,
  low: 2,
};

export const sortGifts = (a, b) => {
  if (a.priority !== b.priority)
    return priorityValue[a.priority] - priorityValue[b.priority];
  return a.title.localeCompare(b.title);
};

export const parseMd = ({ description, ...item }) => ({
  ...item,
  description: marked(description),
});

export const fetchAndParseData = async () => {
  const info = (await getInfo()).map(parseMd);
  const gifts = (await Promise.all(await getGifts())).sort(sortGifts);

  return {
    info,
    gifts,
  };
};
