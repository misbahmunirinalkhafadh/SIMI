import { useEffect, useState } from "react";
import { assetsServices } from "../services/assets";

const useDataAsset = () => {
  const [allAsset, setAllAsset] = useState([]);
  const [allITAsset, setAllITAsset] = useState([]);
  const [allNonITAsset, setAllNonITAsset] = useState([]);

  useEffect(() => {
    assetsServices.getAll()
      .then((res) => setAllAsset(res))
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    assetsServices.getAllITAsset()
      .then((res) => setAllITAsset(res))
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    assetsServices.getAllNonITAsset()
      .then((res) => setAllNonITAsset(res))
      .catch((err) => console.log(err));
  }, []);

  return { allAsset, allITAsset, allNonITAsset };
};

export default useDataAsset;
