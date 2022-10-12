import { collection, getDocs } from "firebase/firestore";
import { db } from "../utils/firebase";

export const sitesServices = {
    // Get a list of sites from database
    async getAll() {
        const col = collection(db, 'sites');
        const get = await getDocs(col);
        const list = get.docs.map(doc => ({
            id: doc.id,
            data: doc.data()
        }));
        return list;
    },

}