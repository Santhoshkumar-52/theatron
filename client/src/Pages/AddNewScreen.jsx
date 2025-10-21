import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import "../Styles/newscreen.css";
import { MdOutlineChair } from "react-icons/md";
import { useGlobalStore } from "../globalstore.js";
import axios from "axios";

const AddNewScreen = () => {
  const branchid = useGlobalStore((state) => state.user.branchid);
  const baseURL = useGlobalStore((state) => state.baseURL);
  const [screenName, setScreenName] = useState("Screen");
  const [seatingCapacity, setSeatingCapacity] = useState("");
  const [type, setType] = useState("3");
  const [noOfRows, setNoOfRows] = useState("1");
  const [rowChars, setRowChars] = useState("A");
  const [seatsPerRow, setSeatsPerRow] = useState("1");
  const [spaceAfterRows, setSpaceAfterRows] = useState("");
  const [spaceAfterSeats, setSpaceAfterSeats] = useState("");
  const [layout, setLayout] = useState([]); // store JSX layout
  const [save, changesave] = useState(false);

  // Auto-calculate capacity
  useEffect(() => {
    if (noOfRows && seatsPerRow) {
      setSeatingCapacity(noOfRows * seatsPerRow);
    } else {
      setSeatingCapacity("");
    }
  }, [noOfRows, seatsPerRow]);

  const generateLayout = () => {
    if (!screenName || !type || !noOfRows || !rowChars || !seatsPerRow) {
      return Swal.fire({
        icon: "error",
        title: "Missing Fields",
        text: "Please fill all required fields!",
      });
    }
    changesave(true);

    const rows = parseInt(noOfRows);
    const seats = parseInt(seatsPerRow);
    const colspaces = spaceAfterSeats
      ? spaceAfterSeats.split(",").map(Number)
      : [];
    const rowspaces = spaceAfterRows
      ? spaceAfterRows.split(",").map(Number)
      : [];

    const start = rowChars ? rowChars.charCodeAt(0) : " ";
    const tempLayout = [];

    for (let i = 1; i <= rows; i++) {
      if (rowspaces.includes(i - 1)) {
        tempLayout.push(
          <div key={`space-row-${i}`} className="h-5 w-full"></div>
        );
      }

      const rowLetter = String.fromCharCode(start + (i - 1));
      const row = [];

      for (let j = 1; j <= seats; j++) {
        if (colspaces.includes(j - 1)) {
          row.push(<div key={`space-col-${i}-${j}`} className="w-6"></div>);
        }

        const seatId = `${rowLetter}${j}`;

        row.push(
          <span className="flex flex-col items-center" key={seatId}>
            <MdOutlineChair
              title={seatId}
              className={`theatreChairs lg:mx-2 mx-1 inline-block lg:text-lg text-sm`}
            />
            <span className="lg:text-sm text-xs font-extralight">{seatId}</span>
          </span>
        );
      }

      tempLayout.push(
        <div key={`row-${i}`} className="flex justify-center mb-1">
          {row}
        </div>
      );
    }

    setLayout(tempLayout);
  };
  const saveLayout = async () => {
    const data = {
      screenName,
      seatingCapacity,
      type,
      noOfRows,
      rowChars,
      seatsPerRow,
      spaceAfterRows,
      spaceAfterSeats,
      branchid,
    };

    // Validate required fields
    for (const [key, value] of Object.entries(data)) {
      if (key == "spaceAfterRows" || key == "spaceAfterSeats") continue;
      if (value === "" || value === null || value === undefined) {
        // skip optional field(s)
        return Swal.fire({
          icon: "error",
          title: "Missing Field",
          text: `Please fill the field: ${key}`,
        });
      }
    }

    try {
      const response = await axios.post(`${baseURL}screen/new`, data);
      const res = response.data.swal;
      Swal.fire({
        icon: res.icon,
        title: res.title,
        text: res.text,
      }); // mark as saved
      if (res.icon == "success") {
        changesave(false);
      }
    } catch (err) {
      Swal.fire({
        icon: res.icon,
        title: res.title,
        text: res.text,
      });
    }
    // If everything is valid

    // Optionally trigger save action
  };

  return (
    <div
      className="mx-2 p-4"
      style={{
        boxShadow:
          "0 -4px 6px -1px rgba(0,0,0,0.1), -1px 1px 6px -1px rgba(0,0,0,0.1)",
      }}
    >
      <h2 className="screenheading text-lg font-semibold mb-2">New Screen</h2>

      {/* Inputs Section */}
      <form className="py-3">
        {/* Row 1 */}
        <div className="flex gap-4 mb-4 flex-wrap">
          <div className="flex flex-col">
            <label className="text-sm label-color font-medium">
              New Screen Name
            </label>
            <input
              type="text"
              value={screenName}
              onChange={(e) => setScreenName(e.target.value)}
              className="input-color border rounded px-3 py-2 w-80"
            />
          </div>

          <div className="flex flex-col">
            <label className="text-sm label-color font-medium">
              Seating Capacity
            </label>
            <input
              type="number"
              value={seatingCapacity}
              readOnly
              className="input-color border rounded px-3 py-2 w-30"
            />
          </div>

          <div className="flex flex-col">
            <label className="text-sm label-color font-medium">Type</label>
            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="input-color border rounded px-3 py-2 w-30"
            >
              <option value="">Select Type</option>
              <option value="1">Elite</option>
              <option value="2">Premium</option>
              <option value="3">Regular</option>
            </select>
          </div>
          {/* </div>


        <div className="flex flex-wrap gap-4 mb-4"> */}
          <div className="flex flex-col">
            <label className="text-sm label-color font-medium">
              No of Rows
            </label>
            <input
              type="number"
              value={noOfRows}
              onChange={(e) => setNoOfRows(e.target.value)}
              className="input-color border rounded px-3 py-2 w-30"
            />
          </div>

          <div className="flex flex-col">
            <label className="text-sm label-color font-medium">
              Start Row (A-Z)
            </label>
            <input
              type="text"
              value={rowChars}
              onChange={(e) => setRowChars(e.target.value)}
              className="input-color border rounded px-3 py-2 w-30"
            />
          </div>

          <div className="flex flex-col">
            <label className="text-sm label-color font-medium">
              Seats per Row
            </label>
            <input
              type="number"
              value={seatsPerRow}
              onChange={(e) => setSeatsPerRow(e.target.value)}
              className="input-color border rounded px-3 py-2 w-30"
            />
          </div>
          {/* </div>

        <div className="flex flex-wrap gap-4 mb-4"> */}
          <div className="flex flex-col">
            <label className="text-sm label-color font-medium">
              Space After Rows
            </label>
            <input
              type="text"
              placeholder="e.g. 4,8"
              value={spaceAfterRows}
              onChange={(e) => setSpaceAfterRows(e.target.value)}
              className="input-color border rounded px-3 py-2 w-30"
            />
          </div>

          <div className="flex flex-col">
            <label className="text-sm label-color font-medium">
              Space After Seats
            </label>
            <input
              type="text"
              placeholder="e.g. 5,10"
              value={spaceAfterSeats}
              onChange={(e) => setSpaceAfterSeats(e.target.value)}
              className="input-color border rounded px-3 py-2 w-30"
            />
          </div>
        </div>
        <button
          type="button"
          className="mx-2 cursor-pointer btn-color mt-4 px-6 py-2 rounded font-semibold"
          onClick={generateLayout}
        >
          Generate Layout
        </button>

        {save ? (
          <button
            type="button"
            data-btn="save"
            className="mx-2 cursor-pointer mt-4 px-6 py-2 rounded font-semibold"
            onClick={saveLayout}
          >
            Save
          </button>
        ) : (
          ""
        )}
      </form>

      <hr />

      {/* Layout Display */}
      <section className="py-5 flex flex-col items-center">
        <div className="theatrelayout lg:p-4 rounded bg-gray-100 flex flex-col items-center overflow-auto w-80 lg:w-190 h-full">
          {layout.length > 0 ? layout : <p>No layout generated yet.</p>}
        </div>
        {layout.length > 0 ? (
          <div className="text-center text-sm mt-3 theatreScreen">
            <span>All eyes on screen here</span>
            <div className="border w-100 curved-border bg-gray-400 h-2 rounded-b-2xl"></div>
          </div>
        ) : (
          ""
        )}
      </section>
    </div>
  );
};

export default AddNewScreen;
