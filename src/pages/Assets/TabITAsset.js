import React, { useEffect, useState } from "react";

import { AddIcon, SearchIcon } from "../../assets/icons";
import { Input, Button, Select } from "@windmill/react-ui";
import ModalFormITAsset from "./ModalFormITAsset";
import TableITAsset from "./TableITAsset";
import { assetsServices } from "../../services/assets";

function TabITAsset({ priviledges }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [category, setCategory] = useState([]);
  const [status, setStatus] = useState([]);
  const [filter, setFilter] = useState({ search: '', archive: 'Unarchived', category: 'all', status: 'all' });

  function openModal() {
    setIsModalOpen(true);
  }

  function closeModal() {
    setIsModalOpen(false);
  }

  function handleChange(e) {
    setFilter({
      ...filter,
      [e.target.name]: e.target.value
    })
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
      <TableITAsset filter={filter} priviledges={priviledges} />
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
              name="search"
              onChange={handleChange}
            />
          </div>
          {/* Filter  */}
          <div className="ml-3">
            <Select name="archive" onChange={handleChange} >
              <option value="Unarchived">Unarchived</option>
              <option value="Archived">Archived</option>
            </Select>
          </div>
          {/* Type  */}
          <div className="ml-3">
            <Select name="category" onChange={handleChange} >
              <option value="all">All Category</option>
              {category.map((data, i) => (
                <option value={data} key={i}>
                  {data}
                </option>
              ))}
            </Select>
          </div>
          {/* Status  */}
          <div className="ml-3">
            <Select name="status" onChange={handleChange} >
              <option value="all">All Status</option>
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
      {tableITAsset}

      <ModalFormITAsset isModalOpen={isModalOpen} closeModal={closeModal} />
    </>
  );
}

export default TabITAsset;
