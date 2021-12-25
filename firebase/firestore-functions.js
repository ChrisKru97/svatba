import { firestore } from "./clientApp"
import {collection,query,getDocs} from "@firebase/firestore";

const infoCollection = collection(firestore,'info');

export const getInfo = async () => {
    const querySnapshot = await getDocs(query(infoCollection));

    return querySnapshot.docs.map(item=>item.data())
}