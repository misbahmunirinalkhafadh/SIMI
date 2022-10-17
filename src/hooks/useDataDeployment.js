import { useEffect, useState } from "react";
import { deploymentsServices } from "../services/deployments";

const useDataDeployment = () => {
  const [allDeployment, setAllDeployment] = useState([]);

  useEffect(() => {
    deploymentsServices.getAll()
      .then((res) => setAllDeployment(res))
      .catch((err) => console.log(err));
  }, []);

  return { allDeployment };
};

export default useDataDeployment;
