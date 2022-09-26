import React from 'react'
import { Input, Select } from '@windmill/react-ui';
import { SearchIcon } from '../../assets/icons';
import TablePending from './TablePending';

function TabPending() {
  return (
    <>
      {/* Action  */}
      <div className='flex justify-between mx-4 mb-4'>
        <div className='flex justify-start'>
          {/* Search */}
          <div className="relative w-64 focus-within:text-purple-500">
            <div className="absolute inset-y-0 flex items-center pl-2">
              <SearchIcon className="w-4 h-4 text-purple-600" aria-hidden="true" />
            </div>
            <Input
              className="pl-8 text-gray-700"
              placeholder="Search for data"
              aria-label="Search"
            />
          </div>
          {/* Filter  */}
          <div className="ml-3">
            <Select >
              <option value="Unarchived" >Unarchived</option>
              <option value="Archived" >Archived</option>
              <option value="Draft" >Draft</option>
            </Select>
          </div>
          {/* Type  */}
          <div className="ml-3" >
            <Select>
              <option value="" >All Category</option>
              <option value="Laptop" >Laptop</option>
              <option value="Desktop" >Desktop</option>
              <option value="Scanner" >Printer</option>
            </Select>
          </div>
        </div>
      </div>

      <TablePending />
    </>
  )
}

export default TabPending