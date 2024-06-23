import axios from 'axios';
import React, { useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { BE_URL } from '../../info';
import ErroreMessageComponent from '../ErrorMessage/ErroreMessageComponent';
import SuccessMessageComponent from '../SuccessMessage/SuccessMessageComponent';

const BusBookComponent = ({ selectedSeat, busDetails, selectedDate }) => {
   const { id } = useParams();
   const location = useLocation();
   const queryParams = new URLSearchParams(location.search);

   const fromQuery = queryParams.get('from');
   const toQuery = queryParams.get('to');

   const initializePassengers = (seatCount) => {
      return Array.from({ length: seatCount }, () => ({ name: '', age: '', gender: '' }));
   };
   const [responseData, setResponse] = useState(null);
   const [passengerList, setPassengerList] = useState(initializePassengers(selectedSeat.length));

   const convertTo12HourFormat = (time) => {
      const period = time >= 12 ? 'PM' : 'AM';
      const hours = time % 12 || 12;
      return `${hours} ${period}`;
   };
   const [ticketDetails, setTicketDetails] = useState({
      from: fromQuery || '',
      to: toQuery || '',
      travelTime: busDetails.startTime || '',
      numberOfSeat: selectedSeat.length,
      seatNumber: selectedSeat,
      travelDate: selectedDate || '',
   });



   const handlePassengerChange = (index, field, value) => {
      const updatedPassengers = passengerList.map((passenger, idx) =>
         idx === index ? { ...passenger, [field]: value } : passenger
      );
      setPassengerList(updatedPassengers);
   };
   const bookingDetails = {
      bookingDetails: {
         busId: id,
         passengerDetails: {
            passengerList,
            busId: id,
         },
         ticketDetails: {
            ...ticketDetails,
            busId: id,
         },
      },
   };
   const bookSubmitHandler = async(event) => {
      event.preventDefault()
      console.log(bookingDetails);
      
      try {
         const token = sessionStorage.getItem('token');
         const response = await axios.post(`${BE_URL}/book`,bookingDetails,{
            headers:{
               Authorization:`Bearer ${token}`
            }
         })
         console.log(response.data);
         setResponse(response.data);
      }
      catch (error) {
         console.log(error);
         if(error.response){
            setResponse((prev) => ({
               ...prev,
               message:error.response.data.message,
               success:false
            }))
         }
         setTimeout(()=>{
            setResponse(null);
         },[3000]);
      }
   }
   return (
      <div className="container mx-auto p-4">
         {responseData && responseData.success && (
        <SuccessMessageComponent success={responseData.success} message={responseData.message} />
      )}
         { responseData && !responseData.success &&
            <ErroreMessageComponent error={responseData.message}/>
         }
         <h1 className="text-2xl font-bold mb-4">Bus Booking Details</h1>
         <form onSubmit={bookSubmitHandler} >
            <div className="border border-gray-200 p-4 rounded mb-4">
               <h2 className="text-xl font-bold mb-2">Passenger Details</h2>
               {passengerList.map((passenger, index) => (
                  <div key={index} className="mb-4">
                     <input
                        type="text"
                        placeholder="Name"
                        value={passenger.name}
                        onChange={(e) => handlePassengerChange(index, 'name', e.target.value)}
                        className="border border-gray-300 p-2 rounded mr-2"
                        required
                     />
                     <input
                        type="number"
                        placeholder="Age"
                        value={passenger.age}
                        onChange={(e) => handlePassengerChange(index, 'age', e.target.value)}
                        className="border border-gray-300 p-2 rounded mr-2"
                        required
                     />
                     <select
                        value={passenger.gender}
                        onChange={(e) => handlePassengerChange(index, 'gender', e.target.value)}
                        className="border border-gray-300 p-2 rounded"
                        required
                     >
                        <option value="">Select Gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                     </select>
                  </div>
               ))}
            </div>
            <div className="border border-gray-200 p-4 rounded">
               <h2 className="text-xl font-bold mb-2">Ticket Details</h2>
               <div className="mb-4">
                  <div className="font-bold mb-1">From</div>
                  <p>{ticketDetails.from}</p>
               </div>
               <div className="mb-4">
                  <div className="font-bold mb-1">To</div>
                  <p>{ticketDetails.to}</p>
               </div>
               <div className="mb-4">
                  <div className="font-bold mb-1">Bus Time</div>
                  <p>{convertTo12HourFormat(busDetails.startTime)}</p>
               </div>
               <div className="mb-4">
                  <div className="font-bold mb-1">Date</div>
                  <p>{ticketDetails.travelDate}</p>
               </div>
               <div className="mb-4">
                  <div className="font-bold mb-1">Number of Seats</div>
                  <p>{ticketDetails.numberOfSeat}</p>
               </div>
               <div className="mb-4">
                  <div className="font-bold mb-1">Seat Numbers</div>
                  <p>{ticketDetails.seatNumber.join(', ')}</p>
               </div>
            </div>
            <div className='w-full'>
               <button className='bg-red-500 p-2 rounded-lg px-6 ml-3 text-white w-full' type='submit'>Book</button>
            </div>
         </form>
      </div>
   );
};

export default BusBookComponent;
