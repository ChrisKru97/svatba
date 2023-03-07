import fs from 'fs';
import urlMetadata from 'url-metadata';
import dynamic from 'next/dynamic';
import Info from '../components/Info';
import ImageList from '../components/ImageList';
import Profile from '../components/Profile';
import useWindowSize from '../hooks/useWindowSize';
import Verse from '../components/Verse';
import { fetchAndParseData } from '../functions';
import useInfo from '../hooks/useInfo';
import Colors from '../components/Colors';
const Timeout = dynamic(() => import('../components/Timeout'), { ssr: false });

const Home = ({ info: initialInfo, imageList }) => {
  const { isPortrait, isLg } = useWindowSize();
  // const gifts = useGifts(initialGifts);
  const info = useInfo(initialInfo);

  return (
    <>
      <div className="w-screen h-screen bg-[url('/images/bg.jpg')] bg-fixed bg-right-bottom bg-cover" />
      <div className="absolute backdrop-blur-sm font-bold backdrop-brightness-75 p-4 rounded-3xl text-white top-2/4 left-2/4 -translate-y-1/2 -translate-x-1/2 w-11/12 lg:w-6/12 lg:min-w-[35rem] text-center">
        <h3 className="text-xl">Bedzie wiesieli!</h3>
        <h1 className="text-4xl lg:text-5xl mb-2">Adam &amp; Asia</h1>
        <h2 className="text-3xl mb-2">5. 7. 2023</h2>
        <Timeout />
      </div>
      <Profile />
      <Verse />
      <div className="text-center">
        <h1 className="text-4xl underline mb-5">Informacje</h1>
        <div className="flex flex-col items-stretch lg:flex-row lg:flex-wrap justify-center content-evenly lg:mb-20">
          {info.map((data, index) => (
            <Info key={index} {...data} />
          ))}
        </div>
        {isPortrait || !isLg ? (
          <div className="space-y-5 mt-5">
            <h1 className="text-4xl underline">Zdjęcia</h1>
            {imageList.map((path, index) => (
              <img
                id={`carousel-image-${index}`}
                key={path}
                className="px-5"
                alt={`image number ${index + 1}`}
                src={`/images/random/${path}`}
              />
            ))}
          </div>
        ) : (
          <ImageList list={imageList} />
        )}
        <Colors />
        {/* <div className="items-center flex-col flex space-y-5 pb-5 mt-10">
          <h1 className="text-4xl underline">Dary</h1>
          <h2 className="text-l">
            Pro rezervaci prosím kontaktujte&nbsp;
            <a href="mailto:christian.krutsche@gmail.com">Christiana</a>.
          </h2>
          {gifts.map((gift, index) => (
            <Gift key={index} {...gift} />
          ))}
        </div> */}
      </div>
    </>
  );
};

export const getStaticProps = async () => {
  const assignImage = async (gift) => {
    const data = await urlMetadata(gift.url).catch(() => null);
    if (!data) return gift;
    return {
      image: data.image,
      ...gift,
    };
  };

  const { info, gifts } = await fetchAndParseData();

  return {
    props: {
      info,
      gifts: await Promise.all(gifts.map(assignImage)),
      imageList: fs.readdirSync('public/images/random'),
    },
  };
};

export default Home;
