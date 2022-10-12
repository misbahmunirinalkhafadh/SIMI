import { useEffect, useState } from "react";

import { sitesServices } from "../services/sites";

const useDataSite = () => {
  const [dataSite, setDataSite] = useState([]);

  useEffect(() => {
    sitesServices.getAll()
      .then((res) => setDataSite(res))
      .catch((err) => console.log(err));
  }, []);

  return { dataSite };
};

export default useDataSite;
