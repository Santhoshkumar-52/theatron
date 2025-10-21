import React from "react";
import "../Styles/dashboard.css";
//icons
import { IoTicket } from "react-icons/io5";
import { PiMoneyWavyFill } from "react-icons/pi";
import { FaPeopleGroup } from "react-icons/fa6";
import { ImVideoCamera } from "react-icons/im";
import PaymentModeChart from "../Charts/Dashboard/PaymentModeChart";
import BookingsTrendChart from "../Charts/Dashboard/BookingsTrendChart";
import TopMoviesChart from "../Charts/Dashboard/TopMoviesChart";
import SeatOccupancyChart from "../Charts/Dashboard/SeatOccupancyChart";


const Dasboard = () => {
  return (
    <div
      className="mx-2 p-2"
      style={{
        boxShadow:
          "0 -4px 6px -1px rgba(0,0,0,0.1), -1px 1px 6px -1px rgba(0,0,0,0.1)",
      }}
    >
      <h2 className="screenheading">Dashboard</h2>
      <div className="dashboardCards grid lg:grid-cols-4 md:grid-cols-2 py-5">
        <section
          data-dashboardcard="1"
          className="border mx-1 my-2 rounded-2xl flex p-2 items-center justify-between text-lg font-bold shadow-lg h-15"
        >
          <h5 className="w-55">Total Bookings Today</h5>

          <span className="totalBookings text-center items-center flex">
            <IoTicket className="inline mx-2" />
            20
          </span>
        </section>
        <section
          data-dashboardcard="2"
          className="border mx-1 my-2 rounded-2xl flex p-2 items-center justify-between text-lg font-bold shadow-lg h-15"
        >
          <h5 className="w-50">Total Revenue Today</h5>

          <span className="totalRevwenue text-center items-center flex">
            <PiMoneyWavyFill className="inline mx-2" />₹<span>18,450</span>
          </span>
        </section>
        <section
          data-dashboardcard="3"
          className="border mx-1 my-2 rounded-2xl flex p-2 items-center justify-between text-lg font-bold shadow-lg h-15"
        >
          <h5 className="w-30">Current Show</h5>

          <span className="currentShow text-center items-center flex w-auto">
            <ImVideoCamera className="inline mx-2" />
            The Dark Knight
          </span>
        </section>
        <section
          data-dashboardcard="4"
          className="border mx-1 my-2 rounded-2xl flex p-2 items-center justify-between text-lg font-bold shadow-lg h-15"
        >
          <h5 className="w-55">Staff Attendance Today</h5>

          <span className="totalStaff text-center items-center flex">
            <FaPeopleGroup className="inline mx-2" />
            <span>17</span>
            /20
          </span>
        </section>
        <section
          data-dashboardcard="5"
          className="border mx-1 my-2 rounded-2xl flex p-2 items-center justify-between text-lg font-bold shadow-lg h-15"
        >
          <h5 className="w-50">Total Revenue Today</h5>

          <span className="totalRevwenue text-center items-center flex">
            <PiMoneyWavyFill className="inline mx-2" />₹<span>18,450</span>
          </span>
        </section>
        <section
          data-dashboardcard="6"
          className="border mx-1 my-2 rounded-2xl flex p-2 items-center justify-between text-lg font-bold shadow-lg h-15"
        >
          <h5 className="w-50">Total Revenue Today</h5>

          <span className="totalRevwenue text-center items-center flex">
            <PiMoneyWavyFill className="inline mx-2" />₹<span>18,450</span>
          </span>
        </section>
        <section
          data-dashboardcard="7"
          className="border mx-1 my-2 rounded-2xl flex p-2 items-center justify-between text-lg font-bold shadow-lg h-15"
        >
          <h5 className="w-50">Total Revenue Today</h5>

          <span className="totalRevwenue text-center items-center flex">
            <PiMoneyWavyFill className="inline mx-2" />₹<span>18,450</span>
          </span>
        </section>
        <section
          data-dashboardcard="8"
          className="border mx-1 my-2 rounded-2xl flex p-2 items-center justify-between text-lg font-bold shadow-lg h-15"
        >
          <h5 className="w-50">Total Revenue Today</h5>

          <span className="totalRevwenue text-center items-center flex">
            <PiMoneyWavyFill className="inline mx-2" />₹<span>18,450</span>
          </span>
        </section>
      </div>
      <div className="dashboardCharts grid lg:grid-cols-2 grid-cols-1 grid-rows-2">
        <PaymentModeChart />
        <BookingsTrendChart />
        <TopMoviesChart />
        <SeatOccupancyChart />
      </div>
    </div>
  );
};

export default Dasboard;
