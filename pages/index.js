import Image from "next/image"
import Timeout from "../components/Timeout";
import {getInfo} from '../firebase/firestore-functions'
import { marked } from "marked";

const Home = ({docs})=> {
  return (
    <>
      <div className="w-screen h-screen">
      <Image src="/images/bg.jpg" layout="fill" objectFit="cover" priority objectPosition="right top" alt="background image"/>
      </div>
      <div className="absolute backdrop-blur-sm font-bold backdrop-brightness-75 p-4 rounded-3xl text-white top-2/4 left-2/4 -translate-y-1/2 -translate-x-1/2 w-6/12 min-w-[40rem] text-center">
      <h3 className="text-xl">Save the date!</h3>
      <h1 className="text-5xl mb-2">Christian &amp; Karin</h1>
      <h2 className="text-3xl">26. 2. 2022</h2>
      <Timeout />
      </div>
      <div className="flex text-3xl h-screen items-center">
        <h1 className="flex-1 text-right">Christian Krutsche</h1>
      <span className="flex-1 justify-center flex min-w-[550px]">
        <Image src="/images/together.jpg" width={500} height={500} className="rounded-full" image alt="together image"/>
        </span>
      <h1 className="flex-1">Karin Siwá</h1>
      </div>
      <div className="text-center">
        <h1 className="text-3xl ">Informace</h1>
        <div className="flex flex-col flex-wrap h-screen content-evenly">
        {docs.map(({title, iconUrl, description} = {}) => <div className="max-w-md m-5 border-b border-black" key={title} >
          <img src={iconUrl} width={50} height={50} alt={`icon ${title}`}/>
          <h3 className="text-lg">{title}</h3>
          <div className="text-sm" dangerouslySetInnerHTML={{__html: description}} />
        </div>)}
      </div>
      </div>
    </>
  )
}

export const getStaticProps = async () => {
  const docs = await getInfo()

  return {
    props: {
      docs: docs.map(({description, ...item})=> ({...item, description: marked(description)})),
    }
  }
}

export default Home