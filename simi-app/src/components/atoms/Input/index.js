import React from 'react'

function Input({ type, id, value, placeholder }) {
    let input = "form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
    let checkbox = "form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"

    return (
        <input
            type={type}
            value={value}
            class={type === "checkbox" ? checkbox : input}
            id={id}
            placeholder={placeholder}
        />
    )
}

export default Input