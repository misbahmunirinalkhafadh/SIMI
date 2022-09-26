import React, { useEffect, useState } from 'react'
import { useAuthState } from "react-firebase-hooks/auth";
import { Link, NavLink, Route, useHistory } from 'react-router-dom'
import { Avatar, Button } from '@windmill/react-ui'
import * as Icons from '../../../assets/icons'
import SidebarSubmenu from './SidebarSubmenu'
import routes from '../../../routes/sidebar'
import ModalFormRequest from '../../../pages/RequestService/ModalFormRequest'
import { collection, getDocs, query, where } from 'firebase/firestore';
import { auth, db } from '../../../utils/firebase';
import { usersServices } from '../../../services/users';


function Icon({ icon, ...props }) {
  const Icon = Icons[icon]
  return <Icon {...props} />
}

// const userData = {
//   avatar:
//     "https://robohash.org/dictavoluptatessimilique.jpg?size=50x50&set=set1",
//   name: "Lissi Meir",
//   job: "Geologist III"
// }

function SidebarContent() {
  const [user, loading] = useAuthState(auth);
  const [isModalOpen, setIsModalOpen] = useState(false)
  // const [dataUser, setDataUser] = useState([])
  const history = useHistory()

  function openModal() {
    setIsModalOpen(true)
  }

  function closeModal() {
    setIsModalOpen(false)
  }

  // const fetchUserName = async () => {
  //   try {
  //     const q = query(collection(db, "users"), where("uid", "==", user?.uid));
  //     // const doc = await getDocs(q);
  //     // const data = doc.docs[0].data();
  //     // setDataUser(data);
  //   } catch (err) {
  //     console.error(err);
  //     alert("An error occured while fetching user data");
  //   }
  // };

  useEffect(() => {
    if (loading) return;
    if (!user) return history.push("/");
    // fetchUserName();
  }, [user, loading, history]);

  useEffect(() => {
    const email = user?.email
    try {
      usersServices.getByEmail(email).then(data => {
        console.log(data)
      })
    } catch (error) {
      console.log(error)
    }
  }, [])

  const photoURL = "https://firebasestorage.googleapis.com/v0/b/simi-51185.appspot.com/o/blank-profile-picture.png?alt=media&token=edc1d1d5-df02-4922-892a-35d2c36a50d5"

  return (
    <div className="py-4 text-gray-500 dark:text-gray-400">
      <Link className="ml-20 text-lg font-bold text-gray-800 dark:text-gray-200 max-w-20" to="/app/home">
        SIMI
      </Link>
      <div className='pt-10'>
        <div className='flex justify-center'>
          <Avatar
            className="w-20 h-20 p-1 align-middle border-2 rounded-full gray-300"
            src={photoURL}
            alt=""
            aria-hidden="true"
          />
        </div>
        <div className='pt-3'>
          {/* <h2
            className="text-xs font-medium text-center text-teal-500 md:text-sm"
          >
            {user?.email}
          </h2> */}
          <p className="text-xs text-center text-gray-500">{user?.email}</p>
        </div>
      </div>
      <ul className="mt-6">
        {routes.map((route) =>
          route.routes ? (
            <SidebarSubmenu route={route} key={route.name} />
          ) : (
            <li className="relative px-6 py-3" key={route.name}>
              <NavLink
                exact
                to={route.path}
                className="inline-flex items-center w-full text-sm font-semibold transition-colors duration-150 hover:text-gray-800 dark:hover:text-gray-200"
                activeClassName="text-gray-800 dark:text-gray-100"
              >
                <Route path={route.path} exact={route.exact}>
                  <span
                    className="absolute inset-y-0 left-0 w-1 bg-purple-600 rounded-tr-lg rounded-br-lg"
                    aria-hidden="true"
                  ></span>
                </Route>
                <Icon className="w-5 h-5" aria-hidden="true" icon={route.icon} />
                <span className="ml-4">{route.name}</span>
                {route.name === 'Request Service' ? <span className="px-2 py-0.5 ml-auto text-xs font-medium tracking-wide text-red-500 bg-red-50 rounded-full">10</span> : ''}
              </NavLink>
            </li>
          )
        )}
      </ul>
      <div className="px-6 my-6">
        <Button iconLeft={Icons.AddIcon} onClick={openModal} >
          <span>Create New Request</span>
        </Button>
        <ModalFormRequest isModalOpen={isModalOpen} closeModal={closeModal} />
      </div>
    </div>
  )
}

export default SidebarContent