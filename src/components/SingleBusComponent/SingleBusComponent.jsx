
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import { BE_URL } from '../../info';
import { MdOutlineAirlineSeatReclineExtra } from "react-icons/md";
import { PiSeatbeltFill } from "react-icons/pi";
import ErroreMessageComponent from '../ErrorMessage/ErroreMessageComponent';
import BusBookComponent from '../BusBookComponent/BusBookComponent';

const SingleBusComponent = () => {
  const LseatA = ["AL1", "AL2", "AL3", "AL4", "AL5", "AL6"];
  const LseatB = ["BL1", "BL2", "BL3", "BL4", "BL5", "BL6"];
  const UseatA = ["AU1", "AU2", "AU3", "AU4", "AU5", "AU6"];
  const UseatB = ["BU1", "BU2", "BU3", "BU4", "BU5", "BU6"];

  const [busData, setBusData] = useState({});
  const [responseData, setResponse] = useState(null);
  const [bookedSeat, setBookedSeat] = useState([]);
  const [selectDate, setSelectDate] = useState("");
  const [selectedSeats, setSelectedSeats] = useState([]);
  const { id } = useParams();
  const [bookStatus, setBookStatus] = useState(false);

  const fetchBusDataById = async () => {
    try {
      setResponse(null);
      const response = await axios.get(`${BE_URL}/bus/${id}?date=${selectDate}`);
      console.log("API Response:", response.data);
      setBusData(response.data.data.busData);
      setBookedSeat(response.data.data.bookedSeat);
    } catch (error) {
      console.log("Error fetching bus data:", error);
      if (error.response) {
        setResponse({
          success: false,
          message: error.response.data.message,
        });
      }
      setResponse({
        success: false,
        message: error.message,
      });
    }
  };

  useEffect(() => {
    if (selectDate) {
      fetchBusDataById();
    }
  }, [selectDate]);
  const seatSelectHandler = (seat) => {
    setSelectedSeats((prev) =>
      prev.includes(seat) ? prev.filter((s) => s !== seat) : [...prev, seat]
    );
    console.log(seat);
    console.log(selectedSeats)
  }

  const bookHandler = () => {
    if(selectedSeats.length>0 && selectDate){
      setBookStatus(true);
    }
    else{
      setResponse(
      {
          ...prev,
          success: false,
          message: "Select Seats and Dates.",
        }
      );
    }
    setTimeout(()=>{
      setResponse(null);
   },[3000]);

  }
  return (
    <div className="p-4">
       { responseData && !responseData.status &&
        <ErroreMessageComponent error={responseData.message}/>
      }
      {/* <BusBookComponent selectedSeat = {selectedSeats || []} busDetails = {busData} selectedDate = {selectDate}/> */}
      {
        bookStatus &&
        <BusBookComponent selectedSeat = {selectedSeats || []} busDetails = {busData} selectedDate = {selectDate}/>
      }
      {
        !bookStatus &&
        <div>
          <div className="date-selector mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Select Date</label>
            <input
              type="date"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              onChange={(e) => setSelectDate(e.target.value)}
            />
          </div>

        
          {!selectDate && (
            <div className="select-seat-message text-red-500 font-bold mb-4">
              Please select a date to choose seats.
            </div>
          )}
          {
            selectDate &&
            selectedSeats.length>0 &&
            <div className="w-full">
              <button onClick={bookHandler} className='bg-red-500 p-2 rounded-lg px-6 ml-3 text-white w-full'>Book</button>
            </div>
          }
          {
            selectDate && 
            <div className="p-4">
              <h1 className="text-2xl mb-4">Bus Seat Layout</h1>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-white p-5 border shadow-lg backdrop-filter backdrop-blur-lg rounded-lg">

                {/* Lower Section */}
                <div>
                  <h2 className="text-xl mb-2">Lower</h2>
                  
                  <div className="bg-red-500 p-2 rounded-lg mb-4">
                  <p className='text-lg text-white text-end'>LA</p>
                    {LseatA.map((data, index) => (
                      <div key={index} className="relative inline-block m-2 group">
                        {bookedSeat.includes(data) ? (
                          <PiSeatbeltFill
                            className="text-white cursor-not-allowed transition duration-300"
                            size={24}
                          />
                        ) : (
                          <MdOutlineAirlineSeatReclineExtra
                            className={`text-white hover:text-yellow-500 transition duration-300 cursor-pointer 
                          ${selectedSeats.includes(data) ? 'text-yellow-500' : ''}`}
                            size={24}

                            onClick={() => seatSelectHandler(data)}
                          />
                        )}
                        <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-full bg-gray-800 text-white text-xs rounded px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          {data}
                        </span>
                      </div>
                    ))}
                  </div>
                  <div className="bg-red-500 p-2 rounded-lg">
                  <p className='text-lg text-white text-end'>LB</p>
                    {LseatB.map((data, index) => (
                      <div key={index} className="relative inline-block m-2 group">
                        {bookedSeat.includes(data) ? (
                          <PiSeatbeltFill
                            className="text-white cursor-not-allowed transition duration-300"
                            size={24}
                          />
                        ) : (
                          <MdOutlineAirlineSeatReclineExtra
                            className={`text-white hover:text-yellow-500 transition duration-300 cursor-pointer
                          ${selectedSeats.includes(data) ? 'text-yellow-500' : ''}`}
                            size={24}
                            onClick={() => seatSelectHandler(data)}
                          />
                        )}
                        <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-full bg-gray-800 text-white text-xs rounded px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          {data}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Upper Section */}
                <div>
                  <h2 className="text-xl mb-2">Upper</h2>
                  <div className="bg-blue-500 p-2 rounded-lg mb-4">
                  <p className='text-lg text-white text-end'>UA</p>
                    {UseatA.map((data, index) => (
                      <div key={index} className="relative inline-block m-2 group">
                        {bookedSeat.includes(data) ? (
                          <PiSeatbeltFill
                            className="text-white cursor-not-allowed transition duration-300"
                            size={24}
                          />
                        ) : (
                          <MdOutlineAirlineSeatReclineExtra
                            className={`text-white hover:text-yellow-500 transition duration-300 cursor-pointer
                          ${selectedSeats.includes(data) ? 'text-yellow-500' : ''}`}
                            size={24}
                            onClick={() => seatSelectHandler(data)}
                          />
                        )}
                        <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-full bg-gray-800 text-white text-xs rounded px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          {data}
                        </span>
                      </div>
                    ))}
                  </div>
                  <div className="bg-blue-500 p-2 rounded-lg">
                  <p className='text-lg text-white text-end'>UB</p>
                    {UseatB.map((data, index) => (
                      <div key={index} className="relative inline-block m-2 group">
                        {bookedSeat.includes(data) ? (
                          <PiSeatbeltFill
                            className="text-white cursor-not-allowed transition duration-300"
                            size={24}
                          />
                        ) : (
                          <MdOutlineAirlineSeatReclineExtra
                            className={`text-white hover:text-yellow-500 transition duration-300 cursor-pointer
                          ${selectedSeats.includes(data) ? 'text-yellow-500' : ''}`}
                            size={24}
                            onClick={() => seatSelectHandler(data)}
                          />
                        )}
                        <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-full bg-gray-800 text-white text-xs rounded px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          {data}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            </div>
          }

          <div className="selected-seats mt-4">
            {selectedSeats.length > 0 && (
              <div className='rounded p-2 text-center border shadow-lg backdrop-filter backdrop-blur-lg'>
                <p className='text-xl text-white  bg-green-600 mb-2 w-full rounded p-2 text-center shadow-lg backdrop-filter backdrop-blur-lg'
                >
                  User Selected Seat
                </p>
                {
                  selectedSeats.map((data, index) => (
                    <div key={index} className="selected-seat-item text-gray-700 font-bold text-lg mb-1">

                      <p>{data}</p>
                    </div>
                  ))
                }
              </div>


            )}
          </div>
        </div>}
    </div>
  );
}

export default SingleBusComponent;
