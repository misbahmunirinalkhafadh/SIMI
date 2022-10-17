import { useEffect, useState } from "react";

import { sitesServices } from "../services/sites";

const useDataSite = () => {
  const [allSite, setAllSite] = useState([]);

  useEffect(() => {
    sitesServices.getAll()
      .then((res) => setAllSite(res))
      .catch((err) => console.log(err));
  }, []);

  return { allSite };
};

export default useDataSite;
