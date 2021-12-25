import Image from "next/image"
import Timeout from "../components/Timeout";
import useWindowSize from '../hooks/useWindowSize'

const Home = ()=> {
  const {width, height} = useWindowSize();
  return (
    <>
      <Image src="/images/bg.jpg" width={width} height={height} layout="fixed" objectFit="cover" priority objectPosition="right top"/>
      <div className="absolute backdrop-blur-sm font-bold backdrop-brightness-75 p-4 rounded-3xl text-white top-2/4 left-2/4 -translate-y-1/2 -translate-x-1/2 w-6/12 min-w-[40rem] text-center">
      <h3 className="text-xl">Save the date!</h3>
      <h1 className="text-5xl mb-2">Christian &amp; Karin</h1>
      <h2 className="text-3xl">26. 2. 2022</h2>
      <Timeout />
      </div>
      <div className="flex text-3xl h-screen items-center">
        <h1 className="flex-1 text-right">Christian Krutsche</h1>
      <span className="flex-1 justify-center flex min-w-[550px]">
        <Image src="/images/together.jpg" width={500} height={500} className="rounded-full"/>
        </span>
      <h1 className="flex-1">Karin Siwá</h1>
      </div>
      <div className="h-screen text-3xl text-center">
        <h1>Informace</h1>
      </div>
      <div className="h-screen">
        <h1>Kdy &amp; kde</h1>
      </div>
    </>
  )
}

export default Home