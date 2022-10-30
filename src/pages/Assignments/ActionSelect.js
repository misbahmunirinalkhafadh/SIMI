import React from 'react'
import Select from 'react-select'
import { Controller } from "react-hook-form";

export default function ActionSelect({ control, name, options, optionLabel, defaultValue, disabled, ...props }) {
    return (
        <>
            <Controller
                name={name}
                control={control}
                render={({ field: { onChange, onBlur, ref } }) => (
                    <Select
                        className="mt-1"
                        placeholder="Type here..."
                        isClearable
                        isDisabled={disabled}
                        options={options}
                        onChange={onChange}
                        onBlur={onBlur}
                        defaultValue={defaultValue}
                        getOptionLabel={(option) => `${option.label}${optionLabel ? `: ${option.brand} ${option.model}` : ''}`}
                        {...props}
                    />
                )}
            />
        </>
    )
}
