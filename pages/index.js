import fs from 'fs';
import { marked } from 'marked';
import urlMetadata from 'url-metadata';
import Timeout from '../components/Timeout';
import { getGifts, getInfo } from '../firebase/firestore-functions';
import Info from '../components/Info';
import Gift from '../components/Gift';
import ImageList from '../components/ImageList';
import Profile from '../components/Profile';
import useWindowSize from '../hooks/useWindowSize';

const Home = ({ info, gifts, imageList }) => {
  const { width, height } = useWindowSize();
  const isPortrait = height > width;
  return (
    <>
      <div className="w-screen h-screen bg-[url('/images/bg.jpg')] bg-fixed bg-center bg-cover" />
      <div className="absolute backdrop-blur-sm font-bold backdrop-brightness-75 p-4 rounded-3xl text-white top-2/4 left-2/4 -translate-y-1/2 -translate-x-1/2 w-11/12 lg:w-6/12 lg:min-w-[35rem] text-center">
        <h3 className="text-xl">Bereme se!</h3>
        <h1 className="text-4xl lg:text-5xl mb-2">Christian &amp; Karin</h1>
        <h2 className="text-3xl mb-2">26. 2. 2022</h2>
        <Timeout />
      </div>
      <Profile />
      <div className="text-center">
        <h1 className="text-4xl underline mb-5">Informace</h1>
        <div className="flex flex-col lg:flex-row lg:flex-wrap justify-center content-evenly">
          {info.map((data, index) => (
            <Info key={index} {...data} />
          ))}
        </div>
        {isPortrait ? (
          <div>
            {imageList.map((path, index) => (
              <img
                id={`carousel-image-${index}`}
                key={path}
                className="p-5"
                alt={`image number ${index + 1}`}
                src={`/images/random/${path}`}
              />
            ))}
          </div>
        ) : (
          <ImageList list={imageList} />
        )}
        <div className="items-center flex-col flex space-y-5 pb-5 mt-10">
          <h1 className="text-4xl underline">Dary</h1>
          <h2 className="text-l">
            Rezervujte kliknutím <b>+</b>
            <br />V případě omylu nás prosím kontaktujte
          </h2>
          {gifts.map((gift, index) => (
            <Gift key={index} {...gift} />
          ))}
        </div>
      </div>
    </>
  );
};

export const getStaticProps = async () => {
  const priorityValue = {
    high: 0,
    normal: 1,
    low: 2,
  };

  const info = await getInfo();

  const gifts = (await getGifts()).sort((a, b) => {
    if (a.priority !== b.priority)
      return priorityValue[a.priority] - priorityValue[b.priority];
    return a.title.localeCompare(b.title);
  });

  const giftsWithImages = await Promise.all(
    gifts.map(async ({ url, ...gift }) => {
      const data = await urlMetadata(url).catch(() => null);
      return {
        url,
        ...data,
        ...gift,
      };
    }),
  );

  const imageList = fs.readdirSync('public/images/random');

  return {
    props: {
      imageList,
      info: info.map(({ description, ...item }) => ({
        ...item,
        description: marked(description),
      })),
      gifts: giftsWithImages,
    },
  };
};

export default Home;
