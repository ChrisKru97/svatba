import { useEffect, useState } from "react"
import { onGiftUpdate, updateGift } from "../firebase/firestore-functions"

const Gift = (props) => {
    const [gift, setGift] = useState(props)
    const {max = 1, reserved = 0, title, url, image, id} = gift

    useEffect(() => {
        const unsub = onGiftUpdate(id, ({reserved: nextReserved}) => {
            if(nextReserved !== reserved) setGift({...gift, reserved: nextReserved})
        })
        return () => {
            unsub()
        }
    }, [gift, id, reserved])

    return <div className="flex items-center space-x-5 bg-stone-100 p-5 rounded-xl cursor-pointer" onClick={() =>{
        window.location.href = url
    }}>
        <h2>{title}</h2>
        <span>{reserved} / {max}</span>
        {image && <img src={image} width={100} alt={`image ${title}`}/>}
        <img onClick={(e) => {
            e.stopPropagation()
            if(reserved <= 0) return
            updateGift(id, -1)
        }} src="https://img.icons8.com/external-dreamstale-lineal-dreamstale/32/000000/external-minus-ui-dreamstale-lineal-dreamstale-2.png"
            width={30} height={30} alt="remove" />
        <img onClick={(e) => {
            e.stopPropagation()
            if(reserved >= max) return
            updateGift(id, 1)
        }} src="https://img.icons8.com/material-outlined/48/000000/plus--v1.png"
                  width={30} height={30} alt="add" />
</div>
}

export default Gift