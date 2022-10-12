import React from 'react'
import Select from 'react-select'
import { Controller } from "react-hook-form";


export default function ActionSelect({ control, listData}) {
    return (
        <>
            <Select
                className="mt-1"
                placeholder="Type here..."
                name="asset"
                isClearable
            // control={control}
            // options={listData}
            // getOptionLabel={(option) => `${option.label}: ${option.type}`}
            />
        </>
    )
}
