import React from 'react';
import { MdOutlineAirlineSeatReclineExtra } from "react-icons/md";
import { PiSeatbeltFill } from "react-icons/pi";

const BusSeatComponent = (props) => {
   console.log(props.bookedSeats)
  const LseatA = ["AL1", "AL2", "AL3", "AL4", "AL5", "AL6"];
  const LseatB = ["BL1", "BL2", "BL3", "BL4", "BL5", "BL6"];
  const UseatA = ["AU1", "AU2", "AU3", "AU4", "AU5", "AU6"];
  const UseatB = ["BU1", "BU2", "BU3", "BU4", "BU5", "BU6"];

  return (
    <div className="p-4">
      <h1 className="text-2xl mb-4">Bus Seat Layout</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        
        {/* Lower Section */}
        <div>
          <h2 className="text-xl mb-2">Lower</h2>
          <div className="bg-red-500 p-2 rounded-lg mb-4">
            {LseatA.map((data, index) => (
              <div key={index} className="relative inline-block m-2 group">
                  {props.bookedSeats.includes(data) ? (
                    <PiSeatbeltFill
                      className="text-white cursor-not-allowed transition duration-300"
                      size={24}
                    />
                  ) : (
                    <MdOutlineAirlineSeatReclineExtra
                      className="text-white hover:text-yellow-500 transition duration-300 cursor-pointer"
                      size={24}
                    />
                  )}
                <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-full bg-gray-800 text-white text-xs rounded px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {data}
                </span>
              </div>
            ))}
          </div>
          <div className="bg-red-500 p-2 rounded-lg">
            {LseatB.map((data, index) => (
              <div key={index} className="relative inline-block m-2 group">
                <MdOutlineAirlineSeatReclineExtra
                  className="text-white hover:text-yellow-500 transition duration-300 cursor-pointer"
                  size={24}
                />
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
            {UseatA.map((data, index) => (
              <div key={index} className="relative inline-block m-2 group">
                <MdOutlineAirlineSeatReclineExtra
                  className="text-white hover:text-yellow-500 transition duration-300 cursor-pointer"
                  size={24}
                />
                <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-full bg-gray-800 text-white text-xs rounded px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {data}
                </span>
              </div>
            ))}
          </div>
          <div className="bg-blue-500 p-2 rounded-lg">
            {UseatB.map((data, index) => (
              <div key={index} className="relative inline-block m-2 group">
                <MdOutlineAirlineSeatReclineExtra
                  className="text-white hover:text-yellow-500 transition duration-300 cursor-pointer"
                  size={24}
                />
                <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-full bg-gray-800 text-white text-xs rounded px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {data}
                </span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default BusSeatComponent;
