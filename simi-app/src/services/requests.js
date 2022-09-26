import { addDoc, collection, getDocs, updateDoc, deleteDoc, getDoc, doc, } from "firebase/firestore";
import { db } from "../utils/firebase";

export const requestsServices = {
    // Get a list of requests from database
    async getAll() {
        const col = collection(db, 'requests');
        const get = await getDocs(col);
        const list = get.docs.map(doc => ({
            id: doc.id,
            data: doc.data()
        }));
        return list;
    },

    // Get by Id of requests from database
    async getById(id) {
        const col = doc(db, 'requests', id);
        const get = await getDoc(col);
        const data = get.data();
        return data;
    },

    // Add a list of requests from database
    async add(value) {
        const col = collection(db, 'requests');
        const create = await addDoc(col, value);
        return create;
    },

    // Update a list of requests from database
    async update(id, value) {
        const col = collection(db, 'requests')
        const edit = await updateDoc(doc(col, id), value);
        return edit;
    },

    // Delete a list of requests from database
    async delete(id) {
        const col = collection(db, 'requests')
        const remove = await deleteDoc(doc(col, id));
        return remove;
    }
}