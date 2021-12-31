import Image from "next/image"
import { useEffect, useState } from "react"
import useWindowSize from "../hooks/useWindowSize"

const Profile = () => {
    const { width, height } = useWindowSize()
    const [scrolled, setScrolled] = useState(0);

    useEffect(() => {
        const handler = (e) => {
            // 0 (scrolled nothing, text top)
            // 1 (scrolled in the middle, text middle)
            // 2 (scrolled at bottom, text bottom)
            const scrollRatio = (window.scrollY) / height;
            setScrolled(scrollRatio);
        };
        document.addEventListener('scroll', handler);
        
        return () => {
            document.removeEventListener('scroll', handler);
        }
    }, [height, setScrolled]);

    const translateY = (scrolled - 1) * 0.95 * height / 2;
    const translateX = Math.max(80 * (1 - scrolled), 0);
    const scale = Math.max(1 + 1 - scrolled, 1);
    const opacity = Math.min(2 - scrolled, 1);

    return <div className="flex text-xl lg:text-4xl lg:h-screen items-center">
    <h1 className="flex-1 text-right" style={{
opacity,
transform: `translateY(${translateY}px) translateX(${-translateX}%) scale(${scale})`
    }}>Christian Krutsche</h1>
    <div className="flex-1 m-5">
      <Image src="/images/together.jpg" width={width / 3} height={width / 3} className="rounded-full" image alt="together image" />
    </div>
    <h1 className="flex-1" style={{
         opacity,
         transform: `translateY(${translateY}px) translateX(${translateX}%) scale(${scale})`
         }}>Karin Siwá</h1>
  </div>
}

export default Profile