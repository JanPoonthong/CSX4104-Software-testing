'use client'
import { useState } from 'react'
import provinces from '@/app/lib/province.json'

export default function ProvinceSelector({
  selectedProvince,
  onProvinceChange,
}) {
  const [isOpen, setIsOpen] = useState(false)

  const toggleDropDown = () => setIsOpen(!isOpen)

  const handleCheckboxChange = (event) => {
    const province = event.target.value
    onProvinceChange(province)
  }

  return (
    <div className="relative inline-block text-left">
      <button
        type="button"
        onClick={toggleDropDown}
        className="p-2 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center"
      >
        Select Provinces
        <svg
          className="w-2.5 h-2.5 ms-3"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 10 6"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="m1 1 4 4 4-4"
          />
        </svg>
      </button>
      {isOpen && (
        <div className="absolute z-10 mt-2 rounded-lg w-48 bg-white border border-gray-300 rounded-lg shadow-lg">
          <ul className="py-2 text-sm text-gray-700 max-h-60 overflow-y-auto">
            {provinces.map((province) => (
              <li
                className={`block px-4 py-2 hover:bg-gray-100`}
                key={province.id}
              >
                <div className="flex items-center">
                  <input
                    checked={selectedProvince.includes(province.name_en)}
                    id={province.id}
                    type="checkbox"
                    value={province.name_en}
                    className="w-4 h-4 accent-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                    onChange={handleCheckboxChange}
                  />
                  <label
                    htmlFor={province.id}
                    className="ms-2 text-sm font-medium text-gray-900"
                  >
                    {province.name_en}
                  </label>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}
