import React from 'react'
import { BsBusFront } from "react-icons/bs";
import { IoLocation } from "react-icons/io5";
const HomeComponent = () => {

  return (
    <div className="max-w-full mx-auto p-4 pt-6 pb-8 mb-4 bg-white rounded">
      <div className="flex flex-wrap -mx-3 mb-6 items-end">
        <div className="w-full md:w-1/4 px-3 mb-6 md:mb-0">
          <label
            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            htmlFor="from-station"
          >
            From Station<BsBusFront className="ml-2 text-red-600 text-xl inline mb-1"/>
          </label>
          <input
            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white"
            id="from-station"
            type="text"
            placeholder="Enter from station"
          />
        </div>
        <div className="w-full md:w-1/4 px-3 mb-6 md:mb-0">
          <label
            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            htmlFor="to-station"
          >
            To Station<IoLocation className="ml-2 text-red-600 text-xl inline mb-1 "/>
          </label>
          <input
            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white"
            id="to-station"
            type="text"
            placeholder="Enter to station"
          />
        </div>
        <div className="w-full md:w-1/4 px-3 mb-6 md:mb-0">
          <label
            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            htmlFor="date"
          >
            Date
          </label>
          <input
            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white"
            id="date"
            type="date"
          />
        </div>
        <div className="w-full md:w-1/4 px-3 flex items-center">
          <button
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded w-full"
          >
            Search
          </button>
        </div>
      </div>
      <div className="flex flex-wrap -mx-3">
        <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
          <button
            className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded w-full"
          >
            Today
          </button>
        </div>
        <div className="w-full md:w-1/2 px-3">
          <button
            className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded w-full"
          >
            Tomorrow
          </button>
        </div>
      </div>
    </div>

  );

}

export default HomeComponent