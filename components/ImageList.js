import { useState ,useCallback, useRef} from "react"
import useWindowSize from "../hooks/useWindowSize"

const ImageList = ({ list }) => {
    const {width} = useWindowSize()
    const onImageClick = useCallback((index) => () => {
        [(list.length - 1 + index) % list.length, (index+1)%list.length].forEach((sideIndex, sideArrIndex)=>{
            const elStyle = document.getElementById(`carousel-image-${sideIndex}`).style
            elStyle.setProperty("z-index", 0);
            elStyle.setProperty("opacity", 1);
            elStyle.setProperty("transform", `translateX(${sideArrIndex === 0 ? "-": ""}${width * 0.4}px) scale(0.3)`)
        });
        [(list.length - 2 + index) % list.length,(index+2)%list.length].forEach((sideIndex, sideArrIndex) => {
            const elStyle = document.getElementById(`carousel-image-${sideIndex}`).style
            elStyle.setProperty("opacity", 0);
            elStyle.setProperty("transform", `translateX(${sideArrIndex === 0 ? "-": ""}${width * 0.8}px) scale(0)`)
        })
        const mainElStyle = document.getElementById(`carousel-image-${index}`).style
        mainElStyle.setProperty("z-index", 1);
        mainElStyle.setProperty("transform", `scale(0.5)`);
    }, [list.length, width])
    
    return <div className="w-screen h-screen flex justify-center items-center">
        {list.map((path, index) => {
            const isPortrait = path.includes("portrait");
            const leftImage = list.length -1;
            const sideImages = [leftImage, 1];
            const shownImages = [...sideImages, 0];
            console.log(`translateX(${index === leftImage ? "-": ""}${sideImages.includes(index) ? width * 0.4 : 0}px) scale(${shownImages.includes(index) ? sideImages.includes(index) ? 0.3: 0.5:0})`
            )
            return <img
            id={`carousel-image-${index}`}
            key={path}
            alt={`image number ${index}`}
            src={`/images/random/${path}`} 
            className="absolute"
            onClick={onImageClick(index)}
              style={{
                  transition: "transform 600ms, opacity 600ms",
                  zIndex: index === 0 ? 1 : 0,
                  width: isPortrait ? width * 0.7 : width,
                  opacity: shownImages.includes(index) ? 1 : 0,
                  transform: `translateX(${index === leftImage ? "-": ""}${sideImages.includes(index) ? width * 0.4 : 0}px) scale(${shownImages.includes(index) ? sideImages.includes(index) ? 0.3: 0.5:0})`
               }} />
        })}
    </div>
}

export default ImageList