import axios from 'axios';
import React, { useState } from 'react';
import { BE_URL } from '../../../info';
import LoadingComponent from '../../LoadingComponent/LoadingComponent';
import ErroreMessageComponent from '../../ErrorMessage/ErroreMessageComponent'
import SuccessMessageComponent from '../../SuccessMessage/SuccessMessageComponent';
import { TiDeleteOutline } from "react-icons/ti";
const BusRegisterComponent = () => {
   const [loading,setLoading] = useState(false);
   const [responseData, setResponse] = useState(null);
   const [busDetails, setBusDetails] = useState({
      busName: '',
      busNumberPlate: "",
      busType: "",
      fare: 500,
      decreaseFare: 5,
      startTime: 12,
      totalTime: 0,
      busRoute: [],
   });

   const handleChange = (e) => {
      const { name, value } = e.target;
      setBusDetails(prevState => ({
         ...prevState,
         [name]: name === 'fare' || name === 'decreaseFare' || name === 'startTime' || name === 'totalTime' ? Number(value) : value
      }));
   };

   const handleBusRouteChange = (e, index) => {
      const { value } = e.target;
      const updatedBusRoute = [...busDetails.busRoute];
      updatedBusRoute[index] = value;
      setBusDetails(prevState => ({
         ...prevState,
         busRoute: updatedBusRoute
      }));
   };

   const addBusRoute = () => {
      setBusDetails(prevState => ({
         ...prevState,
         busRoute: [...prevState.busRoute, '']
      }));
   };
   const deleteBusRoute = (index) => {
      const updateBusRoute = [...busDetails.busRoute];
      updateBusRoute.splice(index,1);
      setBusDetails(prevState => ({
         ...prevState,
         busRoute: updateBusRoute
      }));
   };
   const handleBusTypeChange = (e) => {
      const busType = e.target.value.split(",");
      setBusDetails(prevState => ({
         ...prevState,
         busType: busType
      }));
   };

   const handleSubmit = async (e) => {
      setLoading(true);
      e.preventDefault();
      console.log(busDetails);
      const requestBusDetails = {
         ...busDetails,
         startTime: parseInt(busDetails.startTime),
         totalTime: parseInt(busDetails.totalTime)
      };
      console.log(requestBusDetails);
      try {
         const token = sessionStorage.getItem('token');
         const response = await axios.post(`${BE_URL}/bus`, requestBusDetails,{
            headers:{
               Authorization:`Bearer ${token}`,
            }
         });
         setLoading(false);
         console.log(response.data);
         setResponse({
            success:true,
            message:"Registered Successfully"
         })
      } catch (error) {
         setLoading(false);
         console.log(error);
         if(error.response){
            console.log("heloo")
            setResponse({
               success:false,
               message:error.response.data.message
            })
         }
         else{
            setResponse({
               success:false,
               message:error.message||"...Not Successfull..",
            });
         }
         
         setTimeout(()=>{
            setResponse(null);

         },3000
         )
      }
      setTimeout(()=>{
         setResponse(null);
         
      },3000
      )
   };

   return (
      <div className="p-4 max-w-lg mx-auto bg-white rounded-lg shadow-lg">
         {
            loading &&
            <LoadingComponent/>
         }
         {
            responseData &&  !responseData.success &&
            <ErroreMessageComponent error={responseData.message}/>
         }
         {responseData && responseData.success &&
            <SuccessMessageComponent success={responseData.success} message={responseData.message} />
         }
         <h1 className="text-2xl font-bold mb-4">Bus Registration</h1>
         <form onSubmit={handleSubmit}>
            <div className="mb-4">
               <label className="block text-gray-700">Bus Name</label>
               <input
                  type="text"
                  name="busName"
                  value={busDetails.busName}
                  onChange={handleChange}
                  className="mt-1 p-2 w-full border rounded"
                  required
               />
            </div>
            <div className="mb-4">
               <label className="block text-gray-700">Bus Number Plate</label>
               <input
                  type="text"
                  name="busNumberPlate"
                  value={busDetails.busNumberPlate}
                  onChange={handleChange}
                  className="mt-1 p-2 w-full border rounded"
                  required
               />
            </div>
            <div className="mb-4">
               <label className="block text-gray-700">Bus Type</label>
               <select
                  name="busType"
                  value={busDetails.busType}
                  onChange={handleBusTypeChange}
                  className="mt-1 p-2 w-full border rounded"
                  required
               >
                  <option value="">Select Type</option>
                  <option value="ac,sleeper">Ac Sleeper</option>
                  <option value="ac,semisleeper">Ac Semi-Sleeper</option>
                  <option value="nonac,sleeper">NonAc Sleeper</option>
                  <option value="nonac,semisleeper">NonAc Semi-Sleeper</option>
               </select>
            </div>
            <div className="mb-4">
               <label className="block text-gray-700">Fare</label>
               <input
                  type="number"
                  name="fare"
                  value={busDetails.fare}
                  onChange={handleChange}
                  className="mt-1 p-2 w-full border rounded"
                  required
               />
            </div>
            <div className="mb-4">
               <label className="block text-gray-700">Decrease Fare (%)</label>
               <input
                  type="number"
                  name="decreaseFare"
                  value={busDetails.decreaseFare}
                  onChange={handleChange}
                  className="mt-1 p-2 w-full border rounded"
                  required
               />
            </div>
            <div className="mb-4">
               <label className="block text-gray-700">Start Time (hours in 24h format)</label>
               <input
                  type="number"
                  name="startTime"
                  
                  onChange={handleChange}
                  className="mt-1 p-2 w-full border rounded"
                  required
                  min={1}
                  max={24}
               />
            </div>
            <div className="mb-4">
               <label className="block text-gray-700">Total Time (hours)</label>
               <input
                  type="number"
                  name="totalTime"
                  
                  onChange={handleChange}
                  className="mt-1 p-2 w-full border rounded"
                  required
                  min={0}
                  
               />
            </div>
            <div className="mb-4">
               <label className="block text-gray-700">Bus Route</label>
               {busDetails.busRoute.map((route, index) => (
                  <div key={index} className="flex mb-2">
                     <input
                        type="text"
                        value={route}
                        onChange={(e) => handleBusRouteChange(e, index)}
                        className="mt-1 p-2 w-full border rounded"
                        
                     />
                     <button 
                        onClick={()=>deleteBusRoute(index)}
                         className="bg-red-500 text-white px-4 py-2 ml-2 rounded"
                        ><TiDeleteOutline /></button>
                  </div>
               ))}
               <button
                  type="button"
                  onClick={addBusRoute}
                  className="bg-blue-500 text-white px-4 py-2 rounded mt-2"
               >
                  Add Route
               </button>
            </div>
            <button
               type="submit"
               className="bg-red-500 text-white px-4 py-2 rounded"
            >
               Submit
            </button>
         </form>
      </div>
   );
};

export default BusRegisterComponent;
