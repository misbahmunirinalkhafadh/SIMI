import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, query, updateDoc, where } from "firebase/firestore";
import { db } from "../utils/firebase";

export const usersServices = {
    // Get a list of users from database
    async getAll() {
        const col = collection(db, 'users');
        const get = await getDocs(col);
        const list = get.docs.map(doc => ({
            id: doc.id,
            data: doc.data()
        }));
        return list;
    },

    // Get by Id of roles from database
    async getById(id) {
        const col = doc(db, 'users', id);
        const get = await getDoc(col);
        const data = get.data();
        return data;
    },

    // Get by email of roles from database
    async getByEmail(email) {
        const col = doc(db, 'users');
        const q = query(col, where('email', '==', email))
        const get = await getDocs(q);
        const list = get.docs.map(doc => ({
            id: doc.id,
            data: doc.data()
        }));
        return list;
    },

    // Create a list of users from database
    async add(value) {
        const col = collection(db, 'users');
        const create = await addDoc(col, value);
        return create;
    },

    // Update a list of users from database
    async update(id, value) {
        const col = collection(db, 'users')
        const edit = await updateDoc(doc(col, id), value);
        return edit;
    },

    // Delete a list of users from database
    async delete(id) {
        const col = collection(db, 'users')
        const remove = await deleteDoc(doc(col, id));
        return remove;
    },
}

