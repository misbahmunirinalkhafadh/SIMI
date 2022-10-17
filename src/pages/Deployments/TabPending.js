import React, { useEffect, useState } from 'react'
import { Input, Select } from '@windmill/react-ui';
import { SearchIcon } from '../../assets/icons';
import TablePending from './TablePending';
import useDataDeployment from '../../hooks/useDataDeployment';

function TabPending() {
  const { allDeployment } = useDataDeployment({})
  const [category, setCategory] = useState([])
  const [filter, setFilter] = useState({ search: '', category: 'all' });

  function handleChange(e) {
    setFilter({
      ...filter,
      [e.target.name]: e.target.value
    })
  }

  useEffect(() => {
    const pending = allDeployment?.filter(e => e.data.isDeployed === false)
    const uniqueTags = [];

    pending.forEach(asd => {
      if (uniqueTags.indexOf(asd.data.category) === -1) {
        uniqueTags.push(asd.data.category)
      }
    });

    setCategory(uniqueTags)
  }, [allDeployment])

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
              name="search"
              onChange={handleChange}
            />
          </div>
          {/* Type  */}
          <div className="ml-3" >
            <Select name="category" onChange={handleChange} >
              <option value="all" >All Category</option>
              {category.map((data, i) => (
                <option value={data} key={i}>
                  {data}
                </option>
              ))}
            </Select>
          </div>
        </div>
      </div>

      <TablePending filter={filter} />
    </>
  )
}

export default TabPending