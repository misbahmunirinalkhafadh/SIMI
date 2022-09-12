import { addDoc, collection, getDocs, updateDoc, deleteDoc,getDoc, doc, } from "firebase/firestore";
import { db } from "../utils/firebase";

export const rolesServices = {
    // Get a list of roles from database
    async getAll() {
        const col = collection(db, 'roles');
        const get = await getDocs(col);
        const list = get.docs.map(doc => ({
            id: doc.id,
            data: doc.data()
        }));
        return list;
    },

    // Get by Id of roles from database
    async getById(id) {
        const col = doc(db, 'roles', id);
        const get = await getDoc(col);
        const data = get.data();
        return data;
    },

    // Add a list of roles from database
    async add(value) {
        const col = collection(db, 'roles');
        const create = await addDoc(col, value);
        return create;
    },

    // Update a list of roles from database
    async update(id, value) {
        const col = collection(db, 'roles')
        const edit = await updateDoc(doc(col, id), value);
        return edit;
    },

    // Delete a list of roles from database
    async delete(id) {
        const col = collection(db, 'roles')
        const remove = await deleteDoc(doc(col, id));
        return remove;
    }
}

