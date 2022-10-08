import React from "react";

import { PageTitle } from "../../components/atoms";
import useDataUser from "../../hooks/useDataUser";
import { Tabs } from "./Tabs";

function Assets() {
  const { role } = useDataUser();

  const priviledges = role?.priviledges?.filter(
    (e) => e.permission === "Assets"
  );

  return (
    <>
      <PageTitle>Assets</PageTitle>
      <Tabs color="purple" priviledges={priviledges} />
    </>
  );
}

export default Assets;
