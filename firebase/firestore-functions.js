import { firestore } from "./clientApp"
import {collection,query,getDocs, updateDoc, doc, increment, onSnapshot} from "@firebase/firestore";

const infoCollection = collection(firestore,'info');
const giftsCollection = collection(firestore,'gifts');

export const getInfo = async () => {
    const querySnapshot = await getDocs(query(infoCollection));

    return querySnapshot.docs.map(item=>item.data())
}

export const getGifts = async () => {
    const querySnapshot = await getDocs(query(giftsCollection));

    return querySnapshot.docs.map(item=>({...item.data(), id: item.id}))
}

export const updateGift = async (id, reservedIncrement) => {
    const myDoc = doc(firestore, `gifts/${id}`)
    updateDoc(myDoc, {reserved: increment(reservedIncrement)})
}

export const onGiftUpdate = (id, cb) => onSnapshot(doc(firestore, `gifts/${id}`), item => cb(item.data()))