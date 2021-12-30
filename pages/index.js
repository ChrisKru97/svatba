import Image from "next/image"
import Timeout from "../components/Timeout";
import { getGifts, getInfo } from '../firebase/firestore-functions'
import { marked } from "marked";
import Info from "../components/Info";
import useWindowSize from '../hooks/useWindowSize'
import Gift from "../components/Gift";
import urlMetadata from 'url-metadata'

const Home = ({ info, gifts }) => {
  const { width, height } = useWindowSize()
  return (
    <>
      {/* <Image src="/images/bg.jpg" layout="responsive"
        width={width} height={height * 0.9}
        objectFit="cover" priority alt="background image" /> */}
      <div className="w-screen h-screen">
        <Image src="/images/bg.jpg" layout="fill" objectFit="cover" priority objectPosition="center" alt="background image" />
      </div>
      <div className="absolute backdrop-blur-sm font-bold backdrop-brightness-75 p-4 rounded-3xl text-white top-2/4 left-2/4 -translate-y-1/2 -translate-x-1/2 w-11/12 lg:w-6/12 lg:min-w-[35rem] text-center">
        <h3 className="text-xl">Bereme se!</h3>
        <h1 className="text-4xl lg:text-5xl mb-2">Christian &amp; Karin</h1>
        <h2 className="text-3xl mb-2">26. 2. 2022</h2>
        <Timeout />
      </div>
      <div className="flex text-xl lg:text-4xl lg:h-screen items-center">
        <h1 className="flex-1 text-right">Christian Krutsche</h1>
        <div className="flex-1 m-5">
          <Image src="/images/together.jpg" width={width / 3} height={width / 3} className="rounded-full" image alt="together image" />
        </div>
        <h1 className="flex-1">Karin Siwá</h1>
      </div>
      <div className="text-center">
        <h1 className="text-4xl underline">Informace</h1>
        <div className="flex flex-col lg:flex-wrap lg:max-h-screen content-evenly">
          {info.map((info, index) => <Info key={index} {...info} />)}
        </div>
        <div className="items-center flex-col flex space-y-5 pb-5">
          <h1 className="text-4xl underline">Dary</h1>
          <h2 className="text-l">Rezervujte kliknutím <b>+</b><br />V případě omylu nás prosím kontaktujte</h2>
          {gifts.map((gift, index) => <Gift key={index} {...gift} />)}
        </div>
      </div>
    </>
  )
}

export const getStaticProps = async () => {
  const priorityValue = {
    "high": 0,
    "normal": 1,
    "low": 2
  }
  const info = await getInfo()
  const gifts = (await getGifts()).sort((a, b) => {
    if (a.priority !== b.priority)
      return priorityValue[a.priority] - priorityValue[b.priority];
    return a.title.localeCompare(b.title);
  })
  const giftsWithImages = await Promise.all(gifts.map(async ({ url, ...gift }) => {
    const data = await urlMetadata(url).catch(() => null)
    return {
      url,
      ...data,
      ...gift,
    }
  }))

  return {
    props: {
      info: info.map(({ description, ...item }) => ({ ...item, description: marked(description) })),
      gifts: giftsWithImages
    }
  }
}

export default Home
