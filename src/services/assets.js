import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, query, updateDoc, where } from "firebase/firestore";
import { db } from "../utils/firebase";

export const assetsServices = {
    // Get a reference to the cities collection
    // async getITAssetUnarchive() {
    //     const col = collection(db, 'assets');
    //     const q1 = query(col, where('category', '==', 'Laptop'))
    //     const q2 = query(col, where('archived', '==', false))
    //     const snapshot = await getDocs(q1, q2);
    //     const list = snapshot.docs.map(doc => doc.data());
    //     return list;
    // },
    // async getITAssetArchive() {
    //     const col = collection(db, 'assets');
    //     const q1 = query(col, where('category', '==', 'Laptop'))
    //     const q2 = query(col, where('archived', '==', true))
    //     const snapshot = await getDocs(q1, q2);
    //     const list = snapshot.docs.map(doc => doc.data());
    //     return list;
    // },

    // async getNonITAsset() {
    //     const col = collection(db, 'assets');
    //     const q = query(col, where('category', '==', 'Printer'))
    //     const snapshot = await getDocs(q);
    //     const list = snapshot.docs.map(doc => doc.data());
    //     return list;
    // },

    // Get a list of assets from database
    async getAllITAsset() {
        const col = collection(db, 'assets');
        const q = query(col, where('category', 'in', ['Laptop', 'Desktop']))
        const get = await getDocs(q);
        const list = get.docs.map(doc => ({
            id: doc.id,
            data: doc.data()
        }));
        return list;
    },

    // Get a list of assets from database
    async getAllNonITAsset() {
        const col = collection(db, 'assets');
        const q = query(col, where('category', 'in', ['Projector', 'Printer']))
        const get = await getDocs(q);
        const list = get.docs.map(doc => ({
            id: doc.id,
            data: doc.data()
        }));
        return list;
    },

    // Get by Id of roles from database
    async getById(id) {
        const col = doc(db, 'assets', id);
        const get = await getDoc(col);
        const data = get.data();
        return data;
    },

    // Add a list of assets from database
    async add(value) {
        const col = collection(db, 'assets');
        const create = await addDoc(col, value);
        return create;
    },

    // Update a list of assets from database
    async update(id, value) {
        const col = collection(db, 'assets')
        const edit = await updateDoc(doc(col, id), value);
        return edit;
    },

    // Delete a list of assets from database
    async delete(id) {
        const col = collection(db, 'assets')
        const remove = await deleteDoc(doc(col, id));
        return remove;
    }
}