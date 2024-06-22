import React, { useEffect, useState } from 'react'
import { BsBusFront } from "react-icons/bs";
import { IoLocation } from "react-icons/io5";
import BusCompoent from '../BusComponent/BusCompoent';
import axios from 'axios';
import { BE_URL } from '../../info';
import ErroreMessageComponent from "../ErrorMessage/ErroreMessageComponent"
const HomeComponent = () => {

  const [responseData, setResponse] = useState(null);
  const [busData ,setBusData] = useState([]);
  const [location,setLocation] = useState({
    fromLocation:"",
    toLocation:""
  });
  const [message,setMessage] = useState("");

  async function fetchBusData(from,to){
    try{
      const response = await axios.get(`${BE_URL}/bus`);
      console.log(response.data.data);
    }
    
    catch(error){
      console.log(error);
    }

  }
  useEffect( () => {
    fetchBusData("chennai","end1");
  },[])

  const handleLocation = (e) => {
    // console.log(e.target.name);
    setLocation((prev) => ({...prev , [e.target.name]:e.target.value}));
    setResponse(null);
    // console.log(e.target.value);
  }
  const searchHandler = async() => {
    // console.log(location);
    
    if(!location.fromLocation || !location.toLocation ){
      setResponse((prev)=>({
        ...prev,
        success: false,
        message: "Provide from and destiny location",
      }));
     
    }
    try{
      const response = await axios.get(`${BE_URL}/bus?fromLocation=${location.fromLocation.toLowerCase()}&toLocation=${location.toLocation.toLowerCase()}`)
      console.log(response.data);
      setBusData(response.data.data);
      setMessage(response.data.message);
      
    }
    catch(error){
      console.log(error.response);
      if(error.response.status === 404){
        setResponse(
          {
            success:false,
            message:error.response.data.message,
          }
        )
      }
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
            From Station<BsBusFront className="ml-2 text-red-600 text-xl inline mb-1"/>
          </label>
          <input
            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white"
            id="from-station"
            type="text"
            placeholder="Enter from station"
            name='fromLocation'
            onChange={handleLocation}
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
            name="toLocation"
            onChange={handleLocation}
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
            onClick={searchHandler}
          >
            Search
          </button>
        </div>
      </div>
      {/* <div className="flex flex-wrap -mx-3">
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
      </div> */}
      { responseData && !responseData.status &&
        <ErroreMessageComponent error={responseData.message}/>
      }
      {/* { 
        busData.length>0 &&
        <BusCompoent busDetails = {busData}/>
      } */}
      <BusCompoent busDetails = {busData} message={message}/>
    </div>

  );

}

export default HomeComponent