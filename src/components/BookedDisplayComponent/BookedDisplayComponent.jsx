import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { BE_URL } from '../../info';
import LoadingComponent from '../LoadingComponent/LoadingComponent';
import { FaIndianRupeeSign } from "react-icons/fa6";
import { FaArrowRight } from "react-icons/fa6";
const BookedDisplayComponent = () => {
  const token = sessionStorage.getItem('token');
  const [loading, setLoading] = useState(false);
  const [bookedData, setBookedData] = useState([]);
  const convertTo12HourFormat = (time) => {
   const period = time >= 12 ? 'PM' : 'AM';
   const hours = time % 12 || 12;
   return `${hours} ${period}`;
   };
  async function fetchBooked() {
    setLoading(true);
    try {
      const response = await axios.get(`${BE_URL}/book`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      console.log(response.data.data);
      const bookDetails = response.data.data.reverse();
      setBookedData(bookDetails);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      // if (error.response && !error.response.status) {
      //   // Handle error appropriately
      // }
      console.log(error);
    }
  }

  useEffect(() => {
    fetchBooked();
  }, []);

  return (
    <div className="p-4 bg-gray-100 min-h-screen">
     
      {loading && <LoadingComponent />}
      <div className="space-y-4">
        {bookedData.length > 0 && bookedData.map((data, index) => (
          <div key={index} className="bg-white p-6 rounded-lg shadow-lg transition-transform transform hover:scale-105">
            <div className="flex flex-col md:flex-row md:gap-4 mb-4">
              <div className="flex-1 mb-4 md:mb-0">
                <p className="text-sm text-red-500">Travel Date & Time</p>
                <p className="text-lg font-semibold">{data.travelDate} {convertTo12HourFormat(data.travelTime)}</p>
              </div>
              <div className="flex-1 mb-4 md:mb-0">
                <p className="text-sm text-red-500">From</p>
                <p className="text-lg font-semibold">{data.from}</p>
              </div>
              <div className="flex-1 mt-5 mb-4 md:mb-0 hidden sm:block">
                {/* <p className="text-sm text-gray-500"></p> */}
                {/* <p className="text-lg font-semibold">{data.from}</p> */}
                <FaArrowRight className='text-red-500 text-lg'/>
              </div>
              <div className="flex-1">
                <p className="text-sm text-red-500">To</p>
                <p className="text-lg font-semibold">{data.to}</p>
              </div>
            </div>
            <div className="flex flex-col md:flex-row md:gap-4 mb-4">
              <div className="flex-1 mb-4 md:mb-0">
                <p className="text-sm text-red-500">Ticket Made</p>
                <p className="text-lg font-semibold">{data.bookedAt.substring(0, 15)}</p>
              </div>
              <div className="flex-1">
                <p className="text-sm text-red-500">Total Seat</p>
                <p className="text-lg font-semibold">{data.numberOfSeat}</p>
              </div>
            </div>
            <div className="mb-4">
              <p className="text-sm text-red-500">Seat Numbers</p>
              <div className="flex flex-wrap gap-2">
                {data.seatNumber.map((seat, index) => (
                  <span key={index} className="bg-gray-200 px-3 py-1 rounded-lg shadow-sm">{seat}</span>
                ))}
              </div>
            </div>
            <div>
              <p className="text-sm text-red-500">Price</p>
              <p className="text-lg font-semibold"><FaIndianRupeeSign className='inline text-red-500 text-lg'/>{data.price}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BookedDisplayComponent;
