/* eslint-disable */
import React, { useEffect, useState } from "react";
import { Link, NavLink, Route, useHistory } from "react-router-dom";
import { Avatar, Button, Badge } from "@windmill/react-ui";
import * as Icons from "../../../assets/icons";
import SidebarSubmenu from "./SidebarSubmenu";
import routes from "../../../routes/sidebar";
import ModalFormRequest from "../../../pages/RequestService/ModalFormRequest";
import useDataUser from "../../../hooks/useDataUser";

function Icon({ icon, ...props }) {
  const Icon = Icons[icon];
  return <Icon {...props} />;
}

function SidebarContent() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const history = useHistory();
  const { user, role, dataUser, loading } = useDataUser();
  const [disabledBtnReq, setDisabledBtnReq] = useState(false)
  const [hiddenBtnReq, setHiddenBtnReq] = useState(false)

  function openModal() {
    setIsModalOpen(true);
  }

  function closeModal() {
    setIsModalOpen(false);
  }

  useEffect(() => {
    if (loading) return;
    if (!user) return history.push("/");
  }, [user, loading, history]);

  const photoURL =
    "https://firebasestorage.googleapis.com/v0/b/simi-51185.appspot.com/o/blank-profile-picture.png?alt=media&token=edc1d1d5-df02-4922-892a-35d2c36a50d5";


  let btnRequest = null
  const priviledges = role?.priviledges?.filter(
    (e) => e.permission === "Request Service"
  );

  if (priviledges) {
    btnRequest = (
      <div className="px-6 my-6" hidden={dataUser?.role.roleName === 'End User' ? true : false}>
        <Button iconLeft={Icons.AddIcon} onClick={openModal} disabled={!priviledges[0]?.add}>
          <span>Create New Request</span>
        </Button>
        <ModalFormRequest isModalOpen={isModalOpen} closeModal={closeModal} />
      </div>
    );
  }

  return (
    <div className="py-4 text-gray-500 dark:text-gray-400">
      <Link
        className="ml-20 text-lg font-bold text-gray-800 dark:text-gray-200 max-w-20"
        to="/app/home"
      >
        SIMI
      </Link>
      <div className="pt-10">
        <div className="flex justify-center">
          <Avatar
            className="w-20 h-20 p-1 align-middle border-2 rounded-full gray-300"
            src={photoURL}
            alt=""
            aria-hidden="true"
          />
        </div>
        <div className="pt-3">
          <h2 className="text-xs font-medium text-center text-teal-500 md:text-sm">
            {dataUser?.displayName}
          </h2>
          <p className="text-xs text-center text-gray-500">{dataUser?.email}</p>
        </div>
      </div>
      <ul className="mt-6">
        {role?.priviledges &&
          routes.map((route) =>
            route.routes ? (
              <SidebarSubmenu route={route} key={route.name} />
            ) : (
              role?.priviledges
                .filter((e) => e.permission === route.name)
                .map((e) => e.view === true)[0] && ( //['false'] -> 'false'
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
                    <Icon
                      className="w-5 h-5"
                      aria-hidden="true"
                      icon={route.icon}
                    />
                    <span className="ml-4">{route.name}</span>
                    {route.name === "Assets" ? (
                      <Badge
                        type="success"
                        className="px-2 py-0.5 ml-auto tracking-wide"
                      >
                        New
                      </Badge>
                    ) : (
                      ""
                    )}
                    {route.name === "Request Service" ? (
                      <Badge
                        type="danger"
                        className="px-2 py-0.5 ml-auto tracking-wide"
                      >
                        10
                      </Badge>
                    ) : (
                      ""
                    )}
                  </NavLink>
                </li>
              )
            )
          )}
      </ul>
      {btnRequest}
    </div>
  );
}

export default SidebarContent;
