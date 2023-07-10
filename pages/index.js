import dynamic from 'next/dynamic';
import Image from 'next/image';
import Info from '../components/Info';
import ImageList from '../components/ImageList';
import Profile from '../components/Profile';
import useWindowSize from '../hooks/useWindowSize';
import Verse from '../components/Verse';
import Gift from '../components/Gift';
import { fetchAndParseData } from '../functions';
import useInfo from '../hooks/useInfo';
import useGifts from '../hooks/useGifts';
import Colors from '../components/Colors';
import p1 from '../public/images/random/1.jpg';
import p2 from '../public/images/random/2.jpg';
import p3 from '../public/images/random/3.jpg';
import p4 from '../public/images/random/4.jpg';
import p5 from '../public/images/random/5.jpg';
import p6 from '../public/images/random/6.jpg';
import p7 from '../public/images/random/7.jpg';
import p8 from '../public/images/random/8.jpg';
import p9 from '../public/images/random/9.jpg';
import background from '../public/images/bg.jpg';
const Timeout = dynamic(() => import('../components/Timeout'), { ssr: false });

const tripUrl =
  'https://www.google.com/maps/dir/Na+Nivách+1,+Český+Těš%C3%ADn/Dom+Restauracyjny+Pod+Kasztanami,+Kasztanowa+1,+43-370+Bystra,+Polsko/@49.7472299,18.7092605,11z/data=!4m15!4m14!1m5!1m1!1s0x47140404e2cf31cb:0x65af2c86c7a77c9d!2m2!1d18.6264481!2d49.7418478!1m5!1m1!1s0x47169e2b6c7dd681:0x1d8532dd6d30720!2m2!1d19.072632!2d49.764246!3e0!5i1?entry=ttu';
const placeUrl = 'https://goo.gl/maps/W6cbFuzn5mZ8LvKu8';

const Home = ({ info: initialInfo, gifts: initialGifts }) => {
  const { isPortrait, isLg } = useWindowSize();
  const gifts = useGifts(initialGifts);
  const info = useInfo(initialInfo);

  return (
    <>
      {/* <div className="w-screen h-screen bg-[url('/images/bg.jpg')] bg-fixed bg-right-bottom bg-cover" /> */}
      <Image
        alt="background"
        className="w-screen h-screen object-cover"
        src={background}
        sizes="1920px, 1080px, 640px"
        priority
      />
      <div className="absolute backdrop-blur-sm font-bold backdrop-brightness-75 p-4 rounded-3xl text-white top-3/4 left-1/2 -translate-y-1/2 -translate-x-1/2 w-11/12 lg:w-6/12 lg:min-w-[35rem] text-center">
        <h3 className="text-xl">Bedzie wiesieli!</h3>
        <h1 className="text-4xl lg:text-5xl mb-2">Adam &amp; Asia</h1>
        <h2 className="text-3xl mb-2">5. 7. 2023</h2>
        <Timeout />
      </div>
      <Profile />
      <Verse language="pl" />
      <Verse language="cs" />
      <div className="text-center">
        {/* <h1 className="text-4xl underline mb-5">Informacje</h1> */}
        <div className="flex flex-col items-stretch lg:flex-row lg:flex-wrap gap-4 justify-center content-evenly lg:mb-[200px] p-5">
          {info.map((data, index) => (
            <Info key={index} {...data} />
          ))}
        </div>
        {isPortrait || !isLg ? (
          <div className="space-y-5 mt-5">
            <h1 className="text-4xl underline">Zdjęcia</h1>
            {[p1, p2, p3, p4, p5, p6, p7, p8, p9].map((path, index) => (
              <Image
                id={`carousel-image-${index}`}
                key={index}
                className="px-5"
                alt={`image number ${index + 1}`}
                src={path}
                sizes="1920px, 1080px, 640px"
              />
            ))}
          </div>
        ) : (
          <ImageList />
        )}
        <div className="flex justify-center mt-5 lg:mt-[200px]">
          <Info
            title="Trasa na wesele"
            description={`
          <a 
            class="mb-2"
            style="display: block;"
            href="${placeUrl}">
            Kasztanowa 1, 43-370 Bystra, Polska
          </a>
          <a 
            href="${tripUrl}">
            <img
              class="rounded-md"
              src="/images/route.png"
              alt="Trasa na wesele - obrazek"
            />
          </a>
          `}
          />
        </div>
        <Colors />
        <div className="items-center flex-col flex space-y-5 pb-5 mt-10">
          <h1 className="text-4xl underline">Dary</h1>
          <h2 className="text-l text-left">
            <p className="-ml-6">
              Jeśli zechcecie nas czymś obdarować, to ze względu na nasz wyjazd,
              większą radość niż bukiet sprawi nam koperta lub jakaś przekąska
              (czekolada, orzeszki, kawa, herbata, ...)
            </p>
            <br />
            <span className="-ml-6">Dla rezerwacji prosimy kontaktować:</span>
            <ul className="list-disc">
              <li>
                Christiana K.{' '}
                <a href="mailto:christian.krutsche@gmail.com">
                  christian.krutsche@gmail.com
                </a>
              </li>
            </ul>
            lub starostów
            <ul className="list-disc">
              <li>
                Michała G. <a href="tel:+420737106758">+420 737 106 758</a>
              </li>
              <li>
                Marka P. <a href="tel:+420604294041">+420 604 294 041</a>
              </li>
            </ul>
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
  const { info, gifts } = await fetchAndParseData();

  return {
    props: {
      info,
      gifts: await Promise.all(gifts),
    },
  };
};

export default Home;
