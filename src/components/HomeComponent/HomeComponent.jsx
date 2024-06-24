import React, { useEffect, useState } from 'react'
import { BsBusFront } from "react-icons/bs";
import { IoLocation } from "react-icons/io5";
import BusCompoent from '../BusComponent/BusCompoent';
import axios from 'axios';
import { BE_URL } from '../../info';
import ErroreMessageComponent from "../ErrorMessage/ErroreMessageComponent"
import { TbExchange } from "react-icons/tb";
const HomeComponent = () => {

  const [responseData, setResponse] = useState(null);
  const [busData, setBusData] = useState([]);
  const [location, setLocation] = useState({
    fromLocation: "",
    toLocation: ""
  });
  const [totalBusRoute, setTotalBusRoute] = useState([]);
  const [filteredBusRouteFromLocation, setFilteredBusRouteFromLocation] = useState([]);
  const [filteredBusRouteToLocation, setFilteredBusRouteToLocation] = useState([]);
  const [message, setMessage] = useState("");

  async function fetchBusData() {
    try {
      const response = await axios.get(`${BE_URL}/bus`);
      console.log(response.data);
      console.log(response.data.totalRoute);
      setTotalBusRoute(response.data.totalRoute);
    }

    catch (error) {
      console.log(error);
    }

  }
  useEffect(() => {
    fetchBusData();
  }, [])

  const handleLocation = (e) => {

    const { name, value } = e.target;
    setLocation((prev) => ({ ...prev, [name]: value }));

    if (name === "fromLocation") {
      setFilteredBusRouteFromLocation(
        totalBusRoute.filter(data => data.toLowerCase().includes(value.toLowerCase())
        ))
    }
    if (name === "toLocation") {
      setFilteredBusRouteToLocation(totalBusRoute.filter(
        data => data.toLowerCase().includes(value.toLowerCase())
      ))
    }
    setResponse(null);

  }
  const handleSelect = (name, value) => {
    setLocation((prev) => ({ ...prev, [name]: value }));
    if (name === "fromLocation") {
      setFilteredBusRouteFromLocation([]);
    }
    else if (name === "toLocation") {
      setFilteredBusRouteToLocation([]);
    }
  }
  const swapHandler = () => {
    if(location.fromLocation || location.toLocation){
      let newVar = location.fromLocation;
      setLocation({
        fromLocation:location.toLocation,
        toLocation:newVar,
      })
    }
  }

  const searchHandler = async () => {
    console.log(location);


    try {
      if (!location.fromLocation || !location.toLocation) {
        setResponse({
          
          success: false,
          message: "Provide from and destiny location",
        });
        setBusData([]);
        setMessage("");

      }
      else {
        const response = await axios.get(`${BE_URL}/bus?fromLocation=${location.fromLocation}&toLocation=${location.toLocation}`)
        console.log(response.data);
        setBusData(response.data.data);
        setMessage(response.data.message);
      }


    }
    catch (error) {
      console.log(error);
      if (error.response && error.response.status === 404) {
        setResponse(
          {
            success: false,
            message: error.response.data.message,
          }
        )
      }
      else {
        setResponse({
          success: false,
          message: error.message

        })
      }
      setTimeout(() => {
        setResponse(null);
      }, [3000]);


    }
  }

  return (

    <div className="max-w-full mx-auto p-4 pt-6 pb-8 mb-4 bg-white rounded">
      <div className="flex flex-wrap -mx-3 mb-6 items-end">
        <div className="w-full md:w-1/4 px-3 mb-6 md:mb-0">
          <label
            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            htmlFor="from-station"
          >
            From Station<BsBusFront className="ml-2 text-red-600 text-xl inline mb-1" />
          </label>
          <input
            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white"
            id="from-station"
            type="text"
            placeholder="Enter from station"
            name='fromLocation'
            onChange={handleLocation}
            value={location.fromLocation}
          />
          {filteredBusRouteFromLocation.length > 0 && location.fromLocation.length > 0 && (
            <div className='absolute bg-white border border-gray-200 rounded max-h-40 overflow-y-auto w-full mt-1'>
              {filteredBusRouteFromLocation.map((route, index) => (
                <p
                  key={index}
                  className='p-2 hover:bg-gray-200 cursor-pointer'
                  onClick={() => handleSelect('fromLocation', route)}
                >
                  {route}
                </p>
              ))}
            </div>
          )}
        </div>
        <div >
          <p onClick={swapHandler} className='text-lg text-red-500  w-full cursor-pointer sm:mb-4'><TbExchange className=''/></p>
        </div>
        <div className="w-full md:w-1/4 px-3 mb-6 md:mb-0">
          <label
            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            htmlFor="to-station"
          >
            To Station<IoLocation className="ml-2 text-red-600 text-xl inline mb-1 " />
          </label>
          <input
            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white"
            id="to-station"
            type="text"
            placeholder="Enter to station"
            name="toLocation"
            onChange={handleLocation}
            value={location.toLocation}
          />
          {filteredBusRouteToLocation.length > 0 && location.toLocation.length > 0 && (
            <div className='absolute bg-white border border-gray-200 rounded max-h-40 overflow-y-auto w-full mt-1'>
              {filteredBusRouteToLocation.map((route, index) => (
                <p
                  key={index}
                  className='p-2 hover:bg-gray-200 cursor-pointer'
                  onClick={() => handleSelect('toLocation', route)}
                >
                  {route}
                </p>
              ))}
            </div>
          )}
        </div>
        {/* <div className="w-full md:w-1/4 px-3 mb-6 md:mb-0">
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
        </div> */}
        <div className="w-full md:w-1/4 px-3 flex items-center">
          <button
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded w-full"
            onClick={searchHandler}
          >
            Search
          </button>
        </div>
      </div>

      {responseData && !responseData.success &&

        <ErroreMessageComponent error={responseData.message} />



      }

      <BusCompoent busDetails={busData} message={message} from={location.fromLocation} to={location.toLocation} />
    </div>


  );

}

export default HomeComponent
