import Image from "next/image"
import Timeout from "../components/Timeout";
import {getGifts, getInfo} from '../firebase/firestore-functions'
import { marked } from "marked";
import Info from "../components/Info";
import useWindowSize from '../hooks/useWindowSize'
import Gift from "../components/Gift";
import urlMetadata from 'url-metadata'

const Home = ({info, gifts})=> {
  const {width} = useWindowSize()
  return (
    <>
      <div className="w-screen h-screen">
      <Image src="/images/bg.jpg" layout="fill" objectFit="cover" priority objectPosition="right top" alt="background image"/>
      </div>
      <div className="absolute backdrop-blur-sm font-bold backdrop-brightness-75 p-4 rounded-3xl text-white top-2/4 left-2/4 -translate-y-1/2 -translate-x-1/2 w-6/12 min-w-[35rem] text-center">
      <h3 className="text-xl">Save the date!</h3>
      <h1 className="text-5xl mb-2">Christian &amp; Karin</h1>
      <h2 className="text-3xl">26. 2. 2022</h2>
      <Timeout />
      </div>
      <div className="flex text-3xl h-screen items-center">
        <h1 className="flex-1 text-right">Christian Krutsche</h1>
      <div className="flex-1 m-5">
        <Image src="/images/together.jpg" width={width/3} height={width/3} className="rounded-full" image alt="together image"/>
        </div>
      <h1 className="flex-1">Karin Siwá</h1>
      </div>
      <div className="text-center">
        <h1 className="text-3xl">Informace</h1>
        <div className="flex flex-col flex-wrap h-screen content-evenly">
        {info.map((info, index) => <Info key={index} {...info} />)}
      </div>
      <div className="items-center flex-col flex space-y-5">
        <h1 className="text-3xl">Dary</h1>
        {gifts.map((gift,index) => <Gift key={index} {...gift} />)}
      </div>
      </div>
    </>
  )
}

export const getStaticProps = async () => {
  const info = await getInfo()
  const gifts = await getGifts()
  const giftsWithImages = await Promise.all(gifts.map(async ({url, ...gift}) => {
    const data = await urlMetadata(url).catch(()=>null)
    return {
      ...gift,
      url,
      ...data
    }
  }))

  return {
    props: {
      info: info.map(({description, ...item})=> ({...item, description: marked(description)})),
      gifts: giftsWithImages
    }
  }
}

export default Home