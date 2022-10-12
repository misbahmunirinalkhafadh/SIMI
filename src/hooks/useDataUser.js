import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { rolesServices } from "../services/roles";
import { usersServices } from "../services/users";
import { auth } from "../utils/firebase";

const useDataUser = () => {
  const [user, loading] = useAuthState(auth);
  const [dataUser, setDataUser] = useState(null);
  const [role, setRole] = useState(null);
  const [allUser, setAllUser] = useState(null);

  useEffect(() => {
    if (user) {
      const { uid } = user;

      if (uid) {
        usersServices.getById(uid).then((res) => {
          setDataUser(res);
        })
          .catch((err) => console.log(err));
      }
    }
  }, [user]);

  useEffect(() => {
    let id = dataUser?.role.id
    if (dataUser) {
      rolesServices.getById(id).then((res) => {
        setRole(res);
      });
    }
  }, [dataUser]);

  useEffect(() => {
    usersServices.getAll()
      .then((res) => setAllUser(res))
      .catch((err) => console.log(err));
  }, []);

  return { user, role, dataUser, allUser, loading };
};

export default useDataUser;
