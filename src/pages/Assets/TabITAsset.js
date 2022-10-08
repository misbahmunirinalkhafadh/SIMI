import React, { useEffect, useState } from "react";

import { AddIcon, SearchIcon } from "../../assets/icons";
import { Input, Button, Select } from "@windmill/react-ui";
import ModalFormITAsset from "./ModalFormITAsset";
import TableITAsset from "./TableITAsset";
import { assetsServices } from "../../services/assets";

function TabITAsset({ priviledges }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selected, setSelected] = useState("");
  const [category, setCategory] = useState([]);
  const [status, setStatus] = useState([]);

  function openModal() {
    setIsModalOpen(true);
  }

  function closeModal() {
    setIsModalOpen(false);
  }

  function onSelect(event) {
    setSelected(event.target.value);
  }

  useEffect(() => {
    try {
      assetsServices.getAllITAsset().then((data) => {
        const uniqueTags = [];
        const uniqueStatus = [];
        data.forEach((asd) => {
          if (uniqueTags.indexOf(asd.data.category) === -1) {
            uniqueTags.push(asd.data.category);
          }
        });
        data.forEach((sts) => {
          if (uniqueStatus.indexOf(sts.data.status) === -1) {
            uniqueStatus.push(sts.data.status);
          }
        });
        setCategory(uniqueTags);
        setStatus(uniqueStatus);
      });
    } catch (error) {
      console.log(error);
    }
  }, []);

  let addButton = null;
  let tableITAsset = null; // bisa diganti loader

  if (priviledges) {
    addButton = (
      <Button
        iconLeft={AddIcon}
        onClick={openModal}
        disabled={!priviledges[0]?.add}
      >
        <span>Add New</span>
      </Button>
    );

    tableITAsset = (
      <TableITAsset selected={selected} priviledges={priviledges} />
    );
  }

  return (
    <>
      {/* Action  */}
      <div className="flex justify-between mx-4 mb-4">
        <div className="flex justify-start">
          {/* Search */}
          <div className="relative w-64 focus-within:text-purple-500">
            <div className="absolute inset-y-0 flex items-center pl-2">
              <SearchIcon
                className="w-4 h-4 text-purple-600"
                aria-hidden="true"
              />
            </div>
            <Input
              className="pl-8 text-gray-700"
              placeholder="Search for data"
              aria-label="Search"
            />
          </div>
          {/* Filter  */}
          <div className="ml-3">
            <Select onChange={onSelect}>
              <option value="Unarchived">Unarchived</option>
              <option value="Archived">Archived</option>
            </Select>
          </div>
          {/* Type  */}
          <div className="ml-3">
            <Select>
              <option value="">All Category</option>
              {category.map((data, i) => (
                <option value={data} key={i}>
                  {data}
                </option>
              ))}
            </Select>
          </div>
          {/* Status  */}
          <div className="ml-3">
            <Select>
              <option value="">All Status</option>
              {status.map((data, i) => (
                <option value={data} key={i}>
                  {data}
                </option>
              ))}
            </Select>
          </div>
        </div>
        {/* Button Add */}
        {addButton}
      </div>

      {/* Table Data */}
      {/* <TableITAsset selected={selected} /> */}
      {tableITAsset}

      <ModalFormITAsset isModalOpen={isModalOpen} closeModal={closeModal} />
    </>
  );
}

export default TabITAsset;
