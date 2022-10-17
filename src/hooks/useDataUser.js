import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { rolesServices } from "../services/roles";
import { usersServices } from "../services/users";
import { auth } from "../utils/firebase";

const useDataUser = () => {
  const [user, loading] = useAuthState(auth);
  const [dataUser, setDataUser] = useState({});
  const [role, setRole] = useState({});
  const [allUser, setAllUser] = useState([]);

  useEffect(() => {
    if (user) {
      const { uid } = user;

      if (uid) {
        usersServices.getById(uid).then((res) => {
          rolesServices.getById(res.role.id).then((res) => {
            setRole(res);
          });
          setDataUser(res);
        })
          .catch((err) => console.log(err));
      }
    }
  }, [user]);

  useEffect(() => {
    usersServices.getAll()
      .then((res) => setAllUser(res))
      .catch((err) => console.log(err));
  }, []);

  return { user, role, dataUser, allUser, loading };
};

export default useDataUser;
