import { collection, getDocs, query, where } from "firebase/firestore";
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

    // Get by Id of roles from database
    async getByName(name) {
        const col = collection(db, 'sites');
        const q = query(col, where('name', '==', name))
        const get = await getDocs(q);
        const data = get.data();
        return data;
    },
}