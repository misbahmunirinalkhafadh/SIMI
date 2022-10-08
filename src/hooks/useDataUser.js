import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { rolesServices } from "../services/roles";
import { usersServices } from "../services/users";
import { auth } from "../utils/firebase";

const useDataUser = () => {
  const [user, loading] = useAuthState(auth);
  const [dataUser, setDataUser] = useState(null);
  const [role, setRole] = useState(null);

  // useEffect(() => {
  //     const id = user?.uid;
  //     if (id) {
  //       try {
  //         usersServices.getById(id).then((data) => {
  //           setDataUser(data);
  //         });
  //       } catch (error) {
  //         console.log(error);
  //       }
  //     }
  //   }, [user]);

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

  // useEffect need to be added

  useEffect(() => {
    let id = dataUser?.role.id
    if (dataUser) {
      rolesServices.getById(id).then((res) => {
        setRole(res);
        // console.log(res);
        // console.log(dataUser?.role);
      });
    }
  }, [dataUser]);

  return { user, role, dataUser, loading };
};

export default useDataUser;
