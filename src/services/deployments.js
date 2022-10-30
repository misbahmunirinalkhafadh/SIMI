import { collection, addDoc, getDoc, updateDoc, deleteDoc, getDocs, doc, setDoc, where, query } from "firebase/firestore";
import { db } from "../utils/firebase";

export const deploymentsServices = {
    // Get a list of deployments from database
    async getAll() {
        const col = collection(db, 'deployments');
        const get = await getDocs(col);
        const list = get.docs.map(doc => ({
            id: doc.id,
            data: doc.data()
        }));
        return list;
    },

    // Get by Id of deployments from database
    async getById(id) {
        const col = doc(db, 'deployments', id);
        const get = await getDoc(col);
        const data = get.data();
        return data;
    },

    // Get a list of assets from database
    async getByArrayId(id) {
        const col = collection(db, 'deployments');
        const q = query(col, where('serialNumber', '==', id))
        const get = await getDocs(q);
        const list = get.docs.map(doc => ({
            id: doc.id,
            data: doc.data()
        }));
        return list;
    },

    // Add a list of deployments from database
    async add(value) {
        const col = collection(db, 'deployments');
        const create = await addDoc(col, value);
        return create;
    },

    // Update a list of deployments from database
    async update(id, value) {
        const col = collection(db, 'deployments')
        const edit = await updateDoc(doc(col, id), value);
        return edit;
    },

    // Delete a list of deployments from database
    async delete(id) {
        const col = collection(db, 'deployments')
        const remove = await deleteDoc(doc(col, id));
        return remove;
    },

    // Set a list of deployments from database
    async set(id, value) {
        const col = collection(db, 'deployments',)
        const set = await setDoc(doc(col, id), value, { merge: true });
        return set;
    }
}