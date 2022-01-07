import fs from 'fs';
import urlMetadata from 'url-metadata';
import Timeout from '../components/Timeout';
import Info from '../components/Info';
import Gift from '../components/Gift';
import ImageList from '../components/ImageList';
import Profile from '../components/Profile';
import useWindowSize from '../hooks/useWindowSize';
import Verse from '../components/Verse';
import { fetchAndParseData } from '../functions';
import useGifts from '../hooks/useGifts';
import useInfo from '../hooks/useInfo';

const Home = ({ info: initialInfo, gifts: initialGifts, imageList }) => {
  const { isPortrait, isLg } = useWindowSize();
  const gifts = useGifts(initialGifts);
  const info = useInfo(initialInfo);

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
      <Verse />
      <div className="text-center">
        <h1 className="text-4xl underline mb-5">Informace</h1>
        <div className="flex flex-col items-stretch lg:flex-row lg:flex-wrap justify-center content-evenly">
          {info.map((data, index) => (
            <Info key={index} {...data} />
          ))}
        </div>
        {isPortrait || !isLg ? (
          <div className="space-y-5 mt-5">
            <h1 className="text-4xl underline">Fotky</h1>
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
        <div className="items-center flex-col flex space-y-5 pb-5 mt-10">
          <h1 className="text-4xl underline">Dary</h1>
          <h2 className="text-l">
            Pro rezervaci prosím kontaktujte&nbsp;
            <a href="mailto:hi@marianbrchan.com">Mariana</a>,&nbsp;
            případně&nbsp;
            <a href="mailto:christian.krutsche@gmail.com">nás</a>.
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
