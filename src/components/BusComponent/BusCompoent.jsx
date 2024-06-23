import React from 'react'
import { BsBusFront } from "react-icons/bs";
import { TbLicense } from "react-icons/tb";
import { MdAirlineSeatIndividualSuite } from "react-icons/md";
import { Link } from 'react-router-dom';
import { FcRating } from "react-icons/fc";
import { HiOutlineCurrencyRupee } from "react-icons/hi";
import { IoIosTimer } from "react-icons/io";

const BusCompoent = ({busDetails,from,to}) => {
   // console.log("Bus component:",busDetails);
   const busDataDetails = [
      {
          "_id": "6675a835ca928ec7fbe2b303",
          "busName": "bus4",
          "busNumberPlate": "TN Bus04",
          "busType": [
              "nonac",
              "sleeper"
          ],
          "image": [
              "image1",
              "image2"
          ],
          "fare": 700,
          "decreaseFare": 12,
          "rating": 3,
          "minutesBetweenEachRoute": [
              0.5,
              0.3,
              2,
              1,
              2,
              2,
              0.2
          ],
          "startTime": 1,
          "endTime": 6,
          "totalTime": 5,
          "busRoute": [
              "start1",
              "start2",
              "start3",
              "mid1",
              "mid2",
              "end1",
              "end2",
              "end3"
          ],
          "createdAt": "2024-06-21T16:20:05.099Z",
          "updatedAt": "2024-06-21T16:20:05.099Z",
          "__v": 0
      },
      {
          "_id": "6675a83cca928ec7fbe2b306",
          "busName": "bus4",
          "busNumberPlate": "TN Bus04",
          "busType": [
              "nonac",
              "sleeper"
          ],
          "image": [
              "image1",
              "image2"
          ],
          "fare": 700,
          "decreaseFare": 12,
          "rating": 3,
          "minutesBetweenEachRoute": [
              0.5,
              0.3,
              2,
              1,
              2,
              2,
              0.2
          ],
          "startTime": 8,
          "endTime": 13,
          "totalTime": 5,
          "busRoute": [
              "start1",
              "start2",
              "start3",
              "mid1",
              "mid2",
              "end1",
              "end2",
              "end3"
          ],
          "createdAt": "2024-06-21T16:20:12.096Z",
          "updatedAt": "2024-06-21T16:20:12.096Z",
          "__v": 0
      },
      {
          "_id": "6675a85fca928ec7fbe2b30b",
          "busName": "bus4",
          "busNumberPlate": "TN Bus04",
          "busType": [
              "nonac",
              "sleeper"
          ],
          "image": [
              "image1",
              "image2"
          ],
          "fare": 700,
          "decreaseFare": 12,
          "rating": 3,
          "minutesBetweenEachRoute": [
              0.5,
              0.3,
              2,
              1,
              2,
              2,
              0.2
          ],
          "startTime": 15,
          "endTime": 20,
          "totalTime": 5,
          "busRoute": [
              "start1",
              "start2",
              "start3",
              "mid1",
              "mid2",
              "end1",
              "end2",
              "end3"
          ],
          "createdAt": "2024-06-21T16:20:47.496Z",
          "updatedAt": "2024-06-21T16:20:47.496Z",
          "__v": 0
      },
      {
          "_id": "6675a86aca928ec7fbe2b30f",
          "busName": "bus4",
          "busNumberPlate": "TN Bus04",
          "busType": [
              "nonac",
              "sleeper"
          ],
          "image": [
              "image1",
              "image2"
          ],
          "fare": 700,
          "decreaseFare": 12,
          "rating": 3,
          "minutesBetweenEachRoute": [
              0.5,
              0.3,
              2,
              1,
              2,
              2,
              0.2
          ],
          "startTime": 20,
          "endTime": 1,
          "totalTime": 5,
          "busRoute": [
              "start1",
              "start2",
              "start3",
              "mid1",
              "mid2",
              "end1",
              "end2",
              "end3"
          ],
          "createdAt": "2024-06-21T16:20:58.591Z",
          "updatedAt": "2024-06-21T16:20:58.591Z",
          "__v": 0
      }
  ]
 
  const convertTo12HourFormat = (time) => {
   const period = time >= 12 ? 'PM' : 'AM';
   const hours = time % 12 || 12;
   return `${hours} ${period}`;
 };

 return (
   <div className='p-5'>
     {busDetails.length > 0 && (
       <div className='flex flex-col gap-5 mt-10'>
         {busDetails.map((data, index) => (
           <div key={index} className='bg-white p-5 rounded-lg shadow-lg backdrop-filter backdrop-blur-lg'>
             <div className='flex flex-col md:flex-row justify-between items-center'>
               <div className='text-center md:text-left'>
                 <h1 className='text-xl font-bold'>{data.busName}<BsBusFront className="ml-2 text-red-600 text-xl inline mb-1" /></h1>
                 <p className='text-gray-700'>{data.busNumberPlate}<TbLicense className="ml-2 text-red-600 text-xl inline mb-1" /></p>
               </div>
               <div className='flex gap-2'>
                 {data.busType.map((type, typeIndex) => (
                   <span key={typeIndex} className='px-2 py-1 bg-gray-200 rounded-lg text-sm'><MdAirlineSeatIndividualSuite className="mr-2 text-red-600 text-xl inline mb-1" />{type}</span>
                 ))}
               </div>
             </div>
             <div className='mt-3'>
               <div className='mt-3'>
                 <p className='text-lg font-semibold'>Fare: <HiOutlineCurrencyRupee className='inline mb-1 ml-2 text-xl text-red-600' />{data.fare}</p>
                 <p className='text-sm text-gray-600'><FcRating className='inline text-xl mb-1 mr-2' />Rating: {data.rating}/5</p>
               </div>
             </div>
             <div className='mt-3'>
               <h2 className='text-lg font-semibold'>Time Details <IoIosTimer className='ml-2 text-red-600 text-xl inline mb-1' /> </h2>
               <p className='text-sm text-gray-600'>Start Time: {convertTo12HourFormat(data.startTime)}</p>
               <p className='text-sm text-gray-600'>End Time: {convertTo12HourFormat(data.endTime)}</p>
               <p className='text-sm text-gray-600'>Total Time: {data.totalTime} hrs</p>
             </div>
             <div className='mt-5 text-right'>
              <span className='mr-2'>All Day available</span>
               <Link className='bg-red-600 text-white p-2 rounded' to={`/bus/${data._id}?from=${from}&to=${to}`}>View Details</Link>
             </div>
           </div>
         ))}
       </div>
     )}
   </div>
 );
};


export default BusCompoent